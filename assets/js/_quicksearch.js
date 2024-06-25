let validDate = window.localStorage.getItem("quickSearchDataValidDate");
let staffSearchData =
  validDate == 20240625
    ? JSON.parse(window.localStorage.getItem("quickSearchData"))
    : null;
let filteredJson =
  validDate == 20240625
    ? JSON.parse(window.localStorage.getItem("filteredJson"))
    : null;
let filteredText =
  validDate == 20240625
    ? JSON.parse(window.localStorage.getItem("filteredText"))
    : null;

const getQuickSearchUsers = async () => {
  if (staffSearchData == null) {
    allData = await fetchQuickSearch();
    staffSearchData = allData.filter((a) => a.status == "A");
    window.localStorage.setItem(
      "quickSearchData",
      JSON.stringify(staffSearchData)
    );
    window.localStorage.setItem("quickSearchDataValidDate", 20240625);
  }
};

const createQuickSearchBox = (data) => {
  return new Promise((resolve) => {
    let row = "";
    data.forEach(function (item) {
      row +=
        '<a href="../../staffdetail.htm?staff=' +
        item.pernr +
        '" target="_blank" class="d-flex text-gray-900 text-hover-primary align-items-center mb-5">';
      if (item.photo_url != "") {
        row += '  <div class="symbol symbol-40px me-4">';
        row +=
          '    <img onerror="if(this.src!=`../../assets/media/svg/avatars/blank.svg`)this.src=`../../assets/media/svg/avatars/blank.svg`;" src="' +
          item.photo_url +
          '" alt="';
        row += item.firstname + " " + item.lastname + '" class="w-100" />';
        row += "  </div>";
      } else {
        let colorClass = "danger";
        switch (item.identity.charAt(0)) {
          case "1":
            colorClass = "success";
            break;
          case "2":
            colorClass = "primary";
            break;
          case "3":
            colorClass = "dark";
            break;
          case "4":
            colorClass = "info";
            break;
          case "5":
            colorClass = "warning";
            break;
          case "6":
            colorClass = "danger";
            break;
          default:
            colorClass = "danger";
        }
        row +=
          '  <div class="symbol symbol-circle symbol-40px overflow-hidden me-3">';
        row +=
          '    <div class="symbol-label fs-3 bg-light-' +
          colorClass +
          " text-" +
          colorClass +
          '">' +
          item.firstname.charAt(0) +
          "</div>";
        row += "  </div>";
      }
      row +=
        '    <div class="d-flex flex-column justify-content-between fw-semibold w-100">';
      row += '    <div class="row">';
      row += '    <div class="col-sm-6">';
      row +=
        '        <div class="fs-6 fw-semibold">' +
        item.firstname +
        " " +
        item.lastname +
        "</div>";
      row +=
        '        <div class="fs-7 fw-semibold text-muted">' +
        item.title +
        "</div>";
      row +=
        '        <div class="fs-7 fw-semibold text-danger">' +
        item.pernr +
        "</div>";
      row += "    </div>";
      row += '    <div class="col-sm-6" style="text-align:right;">';
      row += '        <div class="fs-6 fw-semibold">' + item.cell + "</div>";
      row +=
        '        <div class="fs-7 fw-semibold text-muted">' +
        item.mail +
        "</div>";
      row += "    </div>";
      row += "    </div>";
      row += "    </div>";
      row += "</a>";
    });
    resolve(row);
  });
};
const makeQuickSearch = () => {
  $("#quickSearchInput").keyup(async function () {
    if ($("#quickSearchInput").val().length > 2) {
      let searchedWords = $("#quickSearchInput").val().split(" ");
      filteredJson = staffSearchData;
      searchedWords.forEach(function (item) {
        filteredJson = filteredJson.filter(
          (v) =>
            Object.keys(v).filter((key) =>
              v[key]
                .toString()
                .toLowerCase()
                .includes(item.toString().toLowerCase())
            ).length > 0
        );
      });

      const quickSearchItems = await createQuickSearchBox(filteredJson);
      window.localStorage.setItem("filteredJson", JSON.stringify(filteredJson));
      window.localStorage.setItem(
        "filteredText",
        JSON.stringify({ filteredText: $("#quickSearchInput").val() })
      );

      $("#quicksearchCardBody").html(quickSearchItems);
    } else {
      $("#quicksearchCardBody").html("");
    }
  });
};

const fillLastSearch = () => {
  $("#kt_drawer_chat_toggle").on("click", async function () {
    if (filteredJson != null) {
      $("#quickSearchInput").val(filteredText.filteredText);
      const quickSearchItems = await createQuickSearchBox(filteredJson);
      $("#quicksearchCardBody").html(quickSearchItems);
    } else {
      $("#quicksearchCardBody").html("");
    }
  });
};

const fetchQuickSearch = (formData) => {
  return new Promise((resolve) => {
    fetch("../../data/staffSearchData.json", {
      type: "GET",
      dataType: "json",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((myObj) => {
        resolve(myObj);
      });
  });
};
getQuickSearchUsers();
makeQuickSearch();
fillLastSearch();
