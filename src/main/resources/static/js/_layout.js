$(document).ready(function(){
    // 메뉴바
    drawMenu();
    // 현재 메뉴
    getNowPath();
})

$(document).on('click', '.navbar .dropdown > a', function(e) {
    if (document.querySelector('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
});

// 메뉴바 그리기ßß
function drawMenu() {
    // 메뉴목록
    var menu = getMenu();

    // #navbar에 담아줄 내용
    var html = '<ul>';

    for (let i = 0; i < menu.length; i++) {
        if (menu[i].lev == '1') {
            html += '<li class="dropdown"><a href="#"><span>' + menu[i].menuName + '</span> <i class="bi bi-chevron-down"></i></a>';
            html += '<ul>';
        } else {
            html += '<li><a href="' + menu[i].menuPath + '">' + menu[i].menuName + '</a></li>';
            if (i != menu.length - 1) {
                if (menu[i+1].lev == '1') {
                    html += '</ul>';
                    html += '</li>';
                }
            }
        }

        if (i == menu.length - 1) {
            html += '</ul>';
            html += '</li>';
        }
    }

    html += '</ul>';

    $('#navbar').prepend(html);
}

// 현재 주소 가져오기
function getNowPath() {
    // 현재 주소
    var loc = window.location.href;

    // 메뉴목록
    var menu = getMenu();

    // 보여줄 경로
    var path = [];
    var pageNm = '';

    // 현재 경로 찾기 (메뉴명)
    for (let i = 0; i < menu.length; i++) {
        var menuLoc = menu[i].menuPath;
        if (typeof menuLoc != 'undefined') {
            if (loc.indexOf(menuLoc) > -1) {
                for (let k = i; k < menu.length; k--) {
                    if (menu[k].lev == '1') {
                        path.push(menu[k].menuName);
                        break;
                    }
                }
                path.push(menu[i].menuName);
                pageNm = menu[i].menuName;
            }
        }
    }

    // #showPath에 담아줄 내용
    var html = '<ol>';
    for (let i = 0; i < path.length; i++) {
        html += '<li>' + path[i] + '</li>';
    }
    html += '</ol>';
    html += '<h2>' + pageNm + '</h2>';

    $('#showPath').prepend(html);
}

// 메뉴 목록 가져오기
function getMenu() {
    var map = {'url' : '/menu/getMenu'
                , 'data':{'userAuth' : '999'}};

    var data = ajaxPost(map);

    return data;
 }
