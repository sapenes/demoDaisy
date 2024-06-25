let obj = [];

const getNavbar = async () => {
  let obj = await fetchMenuData();
  let navbarObj = recurseMenu(obj.filter((a) => a.location == "navbar"));
  let toolbarObj = recurseMenu(obj.filter((a) => a.location == "toolbar"));

  $("#kt_header_menu").html(drawNavbar(navbarObj));
  $("#toolbarDiv").html(menuType4(toolbarObj));


  /* Anasayfadaki kolay linkler */
  let homepageObj = recurseMenu(obj.filter((a) => a.location == "homepage"));

  if ($("#linksDiv").length) {
    $("#linksDiv").html(menuType5(homepageObj));
  }

  function menuType5(obj) {
    let str = "";
    obj.forEach(function (item) {
      str += '<a href="' + item.slug + '" class="btn btn-color-white bg-white bg-opacity-15 bg-hover-opacity-25 fw-semibold">' + item.title + '</a>';
    });
    return str;
  }
    /* Anasayfadaki kolay linkler */
};

const recurseMenu = (obj, parentid = "00000000") => {
  let menu = [];
  obj.forEach((item) => {
    if (item.parentkey === parentid) {
      let children = recurseMenu(obj, item.menukey);
      if (children.length) {
        item.children = children;
      }
      menu.push(item);
    }
  });
  return menu;
};

const drawNavbar = (obj) => {
  let mitems = "";
  obj.forEach(function(item){
      if(item.type != "0"){
          mitems += '      <!--begin:Menu item-->';
          mitems += `      <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" class="menu-item menu-lg-down-accordion me-0 me-lg-2">`;
          mitems += '        <!--begin:Menu link-->';
          mitems += '        <span class="menu-link py-3">';
          mitems += '          <span class="menu-title">'+item.title+'</span>';
          mitems += '          <span class="menu-arrow d-lg-none"></span>';
          mitems += '        </span>';
          mitems += '        <!--end:Menu link-->';
          mitems += '        <!--begin:Menu sub-->';

          switch(item.type) {
            case "1":
              mitems += '      <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown p-0 w-100 w-lg-'+item.width+'px">' + menuType1(item?.children, item.col) + '</div>'; break;
            case "2":
              mitems += '      <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown p-0">' + menuType2(item?.children, item.col) + '</div>'; break;
            case "3":
              mitems += '      <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown px-lg-2 py-lg-4 w-lg-'+item.width+'px">' + menuType3(item?.children) + '</div>'; break;
          }

          mitems += '        <!--end:Menu sub-->';
          mitems += '      </div>';
          mitems += '      <!--end:Menu item-->';
      }else{
          mitems += '      <!--end:Menu item-->';
          mitems += '      <!--begin:Menu item-->';
          mitems += '      <div class="menu-item">';
          mitems += '        <a class="menu-link py-3" href="'+item.slug+'">';
          mitems += '          <span class="menu-title">'+item.title+'</span>';
          mitems += '        </a>';
          mitems += '      </div>';
          mitems += '      <!--end:Menu item-->';
      }

  });

  return mitems;
}


const menuType1 = (obj, col) => {
  let mtype1 = "";
  if(obj != undefined){
      mtype1 += '<!--begin:Dashboards menu-->';
      mtype1 += '<div class="menu-state-bg menu-extended overflow-hidden overflow-lg-visible" data-kt-menu-dismiss="true">';
      mtype1 += '  <!--begin:Row-->';
      mtype1 += '  <div class="row">';
      mtype1 += '    <!--begin:Col-->';
      mtype1 += '    <div class="col-lg-12 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6">';
      mtype1 += '      <!--begin:Row-->';
      mtype1 += '      <div class="row">';

      obj.forEach(function(item){
          mtype1 += '<!--begin:Col-->';
          mtype1 += '<div class="col-lg-'+col+' mb-3">';
          mtype1 += '  <!--begin:Menu item-->';
          mtype1 += '  <div class="menu-item p-0 m-0">';
          mtype1 += '    <!--begin:Menu link-->';
          mtype1 += '    <a href="pages'+item.slug+'" class="menu-link">';
          mtype1 += '      <span class="menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3">';
          mtype1 +=           item.icon;
          mtype1 += '      </span>';
          mtype1 += '      <span class="d-flex flex-column">';
          mtype1 += '        <span class="fs-6 fw-bold text-gray-800">'+item.title+'</span>';
          mtype1 += '        <span class="fs-7 fw-semibold text-muted">'+item.subtitle+'</span>';
          mtype1 += '      </span>';
          mtype1 += '    </a>';
          mtype1 += '    <!--end:Menu link-->';
          mtype1 += '  </div>';
          mtype1 += '  <!--end:Menu item-->';
          mtype1 += '</div>';
          mtype1 += '<!--end:Col-->';
      });

      mtype1 += '      </div>';
      mtype1 += '      <!--end:Row-->';
      mtype1 += '    </div>';
      mtype1 += '    <!--end:Col-->';
      mtype1 += '  </div>';
      mtype1 += '  <!--end:Row-->';
      mtype1 += '</div>';
      mtype1 += '<!--end:Dashboards menu-->';
      return mtype1;
  }
}




const menuType2 = (obj, col) => {
  let mtype2 = "";
  if(obj != undefined){
      mtype2 += '<!--begin:Pages menu-->';
      mtype2 += '<div class="menu-active-bg px-4 px-lg-0">';
      mtype2 += '  <!--begin:Tabs nav-->';
      mtype2 += '  <div class="d-flex w-100 overflow-auto">';
      mtype2 += '    <ul class="nav nav-stretch nav-line-tabs fw-bold fs-6 p-0 p-lg-10 flex-nowrap flex-grow-1">';
      obj.forEach(function(item, i){
          mtype2 += '  <!--begin:Nav item-->';
          mtype2 += '  <li class="nav-item mx-lg-1" role="presentation">';
          mtype2 += '    <a class="nav-link py-3 py-lg-6 '+(i==0?"active":"")+' text-active-primary" href="#" data-bs-toggle="tab" data-bs-target="#kt_app_header_menu_pages_'+item.menukey+'">'+item.title+'</a>';
          mtype2 += '  </li>';
          mtype2 += '  <!--end:Nav item-->';
      });
      mtype2 += '    </ul>';
      mtype2 += '  </div>';
      mtype2 += '  <!--end:Tabs nav-->';
      mtype2 += '  <!--begin:Tab content-->';
      mtype2 += '  <div class="tab-content py-4 py-lg-8 px-lg-7">';
      obj.forEach(function(item, i){
          mtype2 += ' <!--begin:Tab pane-->';
          mtype2 += ' <div class="tab-pane '+(i==0?"active":"")+' w-lg-1000px" id="kt_app_header_menu_pages_'+item.menukey+'">';
          mtype2 += '   <!--begin:Row-->';
          mtype2 += '   <div class="row">';
          mtype2 += '     <!--begin:Col-->';
          mtype2 += '     <div class="col-lg-8">';
          mtype2 += '       <!--begin:Row-->';
          mtype2 += '       <div class="row">';
          if(item.children != undefined){
              item.children.forEach(function(secondItem){
                  mtype2 += ' <!--begin:Col-->';
                  mtype2 += ' <div class="col-lg-'+col+' mb-6 mb-lg-0">';
                  mtype2 += '   <!--begin:Menu heading-->';
                  mtype2 += '   <h4 class="fs-6 fs-lg-4 fw-bold mb-3 ms-4">'+secondItem.title+'</h4>';
                  mtype2 += '   <!--end:Menu heading-->';
                  if(secondItem.children != undefined){
                      secondItem.children.forEach(function(thirdItem){
                          mtype2 += ' <!--begin:Menu item-->';
                          mtype2 += ' <div class="menu-item p-0 m-0">';
                          mtype2 += '   <!--begin:Menu link-->';
                          mtype2 += '   <a href="'+thirdItem.slug+'" class="menu-link">';
                          mtype2 += '     <span class="menu-title">'+thirdItem.title+'</span>';
                          mtype2 += '   </a>';
                          mtype2 += '   <!--end:Menu link-->';
                          mtype2 += ' </div>';
                          mtype2 += ' <!--end:Menu item-->';
                      });
                  }
                  mtype2 += ' </div>';
                  mtype2 += ' <!--end:Col-->';
              });
          }
          mtype2 += '       </div>';
          mtype2 += '       <!--end:Row-->';
          mtype2 += '     </div>';
          mtype2 += '     <!--end:Col-->';
          mtype2 += '     <!--begin:Col-->';
          mtype2 += '     <div class="col-lg-4">';
          mtype2 += '       <img src="'+item.img+'" class="rounded mw-100" alt="" />';
          mtype2 += '     </div>';
          mtype2 += '     <!--end:Col-->';
          mtype2 += '   </div>';
          mtype2 += '   <!--end:Row-->';
          mtype2 += ' </div>';
          mtype2 += ' <!--end:Tab pane-->';
      });
      mtype2 += '  </div>';
      mtype2 += '  <!--end:Tab content-->';
      mtype2 += '</div>';
      mtype2 += '<!--end:Pages menu-->';
  }
  return mtype2;
}

const menuType3 = (obj) => {
  let mtype3 = "";
  if(obj != undefined){
      obj.forEach(function(item){
          mtype3 += '<!--begin:Menu item-->';
          if(item.children != undefined){
            mtype3 += `<div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" class="menu-item menu-lg-down-accordion">`;
          }else{
            mtype3 += '<div class="menu-item">';
          }

          mtype3 += '  <!--begin:Menu link-->';
          mtype3 += '  <'+(item.children != undefined?"span":"a")+' class="menu-link py-3" '+(item.children != undefined?"":'href="'+item.slug+'"')+'>';
          mtype3 += '    <span class="menu-icon">';
          mtype3 +=         item.icon;
          mtype3 += '    </span>';
          mtype3 += '    <span class="menu-title">'+item.title+'</span>';
          if(item.children != undefined){
            mtype3 +=   '<span class="menu-arrow"></span>';
          }
          mtype3 += '  </'+(item.children != undefined?"span":"a")+'>';
          mtype3 += '  <!--end:Menu link-->';

          if(item.children != undefined){
            mtype3 += '<div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg px-lg-2 py-lg-4 w-lg-225px">';
            mtype3 += menuType3(item?.children);
            mtype3 += '</div>';
          }

          mtype3 += '</div>';
          mtype3 += '<!--end:Menu item-->';

      });

  }
  return mtype3;
}

const menuType4 = (obj) => {
    let mtype4 = "";
    obj.forEach(function(item){
        if(item?.children == undefined){
            mtype4 += '<!--begin::Menu item-->';
            mtype4 += '<div class="menu-item px-5">';
            mtype4 += '  <a href="'+item.slug+'" class="menu-link px-5">'+item.title+'</a>';
            mtype4 += '</div>';
            mtype4 += '<!--end::Menu item-->';
        }else{
            mtype4 += '<!--begin::Menu item-->';
            mtype4 += `<div class="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">`;
            mtype4 += '  <a href="#" class="menu-link px-5">';
            mtype4 += '    <span class="menu-title">'+item.title+'</span>';
            mtype4 += '    <span class="menu-arrow"></span>';
            mtype4 += '  </a>';

            mtype4 += '  <!--begin::Menu sub-->';
            mtype4 += '  <div class="menu-sub menu-sub-dropdown w-225px py-4">';
            mtype4 += menuType4(item?.children);
            mtype4 += '  </div>';
            mtype4 += '  <!--end::Menu sub-->';

            mtype4 += '</div>';
            mtype4 += '<!--end::Menu item-->';
        }
    });
    return mtype4;
}


const fetchMenuData = (formData) => {
  return new Promise((resolve) => {
    $.ajax({
      data: formData,
      processData: false,
      contentType: false,
      async: false,
      type: "GET",
      dataType: "json",
      url: "../../data/menu.json",
      success: (data) => {
        resolve(data);
      },
    });
  });
};

getNavbar();
