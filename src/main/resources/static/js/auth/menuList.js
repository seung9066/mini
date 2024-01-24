$(document).ready(function(){
    sggGridRun(1, grid1.frmId);

    addEvent();
});

var grid1 =
{
    // 그리드를 그려줄 폼태그 아이디
    frmId : 'frm'
    // 그리드 데이터(미리 값을 담아주거나 ajax통신을 통해 받아온 데이터)
    , data : []
    // ajax url
    , ajaxUrl : '/auth/menuList'
    // ajax GET, POST
    , ajaxType : 'POST'
    // 테이블 컬럼 {컬럼명, 한글명}
    , th : {lev1 : '상위메뉴아이디', lev2 : '하위메뉴아이디', menuName : '메뉴명', menuNo : '메뉴번호', menuPath : '경로', userAuth : '권한', delYn : '삭제여부'}
    // 그리드 row 수 값이 없으면 모두 다 출력
    , row : 20
    // ajax 버튼용 총 게시글 수 url
    , ajaxBtnUrl : ''
    // 총 게시글 수
    , totalCnt : 0
    // 버튼 수
    , btn : 10
    // tr onclick function명
    , tonC : 'replaceMenu'
    // tr onclick 색상 true, false
    , tonCColor : 'false'
    // tr onclick시 데이터 담아줄 배열
    , trData : {}
    // callback function 없으면 ''
    , callback : ''
    // table css
    , tbCss : {'width' : '100%;', 'text-align' : 'center'}
    // th css 하나의 {}만 입력시 모든 th에 적용, grid.th.lengh 만큼 적으면 각각 적용
    , thCss: [{width : '15%'}, {width : '15%'}, {width : '15%'}, {width : '10%'}, {width : '25%'}, {width : '10%'}, {width : '10%'}]
    // 첫컬럼 타입 (checkbox, radio, ''이면 아무것도 없는거)
    , tdType : ''
    // 첫컬럼에 따른 row 데이터 담을 배열
    , tdTypeData: []
}

sggGridList.push(grid1);

// 이벤트
function addEvent() {
    var map = [{id :'btnSave'
                , event : 'click'
                , eventDtl : 'doSave'}
              , {id :'btnMenu'
                , event : 'click'
                , eventDtl : 'doMenu'}
              , {id :'btnUpMenu'
                , event : 'click'
                , eventDtl : 'doUpMenu'}
              , {id : 'btnCancel'
                , event : 'click'
                , eventDtl : 'doCancel'}]

    sggEvent(map);
}

// 변경을 위한 tr 아이디
var trId = '';
// 디비에 넣을 name(컬럼) 순서
var colNm = ['menuId', 'menuId', 'menuName', 'menuNo', 'menuPath', 'userAuth', 'delYn'];
// 수정 전 값
var beforVal = [];

// 메뉴 수정
function replaceMenu(tr) {
    var tds = tr.querySelectorAll('td');

    if (trId != '' && trId != tr.id) {
        document.getElementById(trId).click();
        alert('저장 또는 취소 후 진행해주세요.');
        return false;
    } else {
        trId = tr.id;
        // text > input
        chgToInput(tds);
    }
}

// 인풋 태그로 바꿔주기
function chgToInput(tds) {
    // 이미 수정중인지 체크
    var cnt = 0;
    tds.forEach(function(td) {
        var html = td.innerHTML;
        if (html.indexOf('<input') > -1) {
            cnt++;
        }
    });

    // 수정중이 아니면 input으로 바꿔주기
    if (cnt == 0) {
        tds.forEach(function(td, idx) {
            var txt = td.innerText;
            beforVal.push(txt);
            if (txt != '') {
                if (idx <= 1) {
                    td.innerHTML = '<input type="text" class="form-control" value="' + txt + '" name="' + colNm[idx] + '" readonly required="Y">';
                }
                if (idx > 1 && idx != tds.length - 1) {
                    if (colNm[idx] == 'menuNo') {
                        td.innerHTML = '<input type="number" class="form-control" value="' + txt + '" name="' + colNm[idx] + '" required="Y">';
                    } else {
                        td.innerHTML = '<input type="text" class="form-control" value="' + txt + '" name="' + colNm[idx] + '" required="Y">';
                    }
                }
                if (idx == tds.length - 1){
                    td.innerHTML = makeDelYn(txt);
                }
            } else {
                if (idx == 0) {
                    // 하위메뉴일 시 상위메뉴 아이디 가져오기
                    var id = td.parentNode.id
                    id = id.replace(grid1.frmId + '_', '');

                    var trs = document.getElementById(grid1.frmId + '_tbody').querySelectorAll('tr');
                    trs.forEach(function(tr, idx) {
                        if (idx < id) {
                            var upId = tr.querySelector('td').innerText;
                            if (upId) {
                                txt = upId
                            }
                        }
                    });

                    td.innerHTML = makeSelect(txt);
                } else {
                    td.innerHTML = '';
                }
            }
        });
    }
}

// 상위 메뉴 selectBox 그려주기
function makeSelect(val) {
    var tbodyEle = document.getElementById(grid1.frmId + '_tbody');
    var trs = tbodyEle.querySelectorAll('tr');

    var html = '<select name="upMenuId" onChange="moveTr(this)" required="Y">';
    html += '<option value="">선택</option>'
    trs.forEach(function(tr) {
        var upId = tr.querySelector('td').innerText;
        if (upId) {
            html += '<option value="' + upId + '"';
            if (upId == val && val) {
                html += ' selected'
            }
            html += '>' + upId + '</option>';
        }
    });
    html += '</select>'

    return html;
}

// delYn selectbox
function makeDelYn(val) {
    var html = '<select name="delYn" required="Y">';
    if (val == 'Y') {
        html += '<option value="Y" selected>Y</option>';
        html += '<option value="N">N</option>';
    }
    if (val == 'N') {
        html += '<option value="Y">Y</option>';
        html += '<option value="N" selected>N</option>';
    }
    html += '</select>';

    return html;
}

// 저장
function doSave() {
    if (!sggNullChk(trId)) {
        return false;
    }

    var obj = {url: '/auth/menuSave'
                , data: {}
                , frmId : 'frm'};

    var data = ajaxPost(obj);

    if (data > 0) {
        alert('수정 완료.');
        sggGridRun(1, grid1.frmId);
    }
}

// 메뉴 추가
function doMenu() {
    if (trId != '') {
        alert('저장 또는 취소 후 진행해주세요.');
        return false;
    }

    var tbodyEle = document.getElementById(grid1.frmId + '_tbody');
    var trLenth = tbodyEle.querySelectorAll('tr').length;
    var html = '<tr id="' + grid1.frmId + '_' + trLenth + '">';
    trId = grid1.frmId + '_' + trLenth;

    var thLength = Object.keys(grid1.th).length;
    for (let i = 0; i < thLength; i++) {
        html += '<td>';
        if (i == 0) {
            html += makeSelect();
        } else {
            if (colNm[i] == 'menuNo') {
                html += '<input type="number" class="form-control" name="' + colNm[i] + '" required="Y">';
            } else {
                html += '<input type="text" class="form-control" name="' + colNm[i] + '" required="Y">';
            }
        }
        html += '</td>';
    }

    html += '</tr>';

    tbodyEle.insertAdjacentHTML('beforeend', html);

    tbodyEle.style.height = (((grid1.row + 1) * 30) + 60) + 'px';

    document.getElementById(trId).click();
}

// selectbox 누를 때 이동
function moveTr(ele) {
    var tbodyEle = document.getElementById(grid1.frmId + '_tbody');
    var trs = tbodyEle.querySelectorAll('tr');
    var val = ele.value;
    var upVal = '';
    var upNo = '';

    var thisTr = ele.parentNode.parentNode;
    var chk = 0;
    trs.forEach(function(tr, idx) {
        upVal = tr.querySelector('td').innerText;

        if (chk > 0) {
            if (idx == trs.length - 1) {
                upNo = tr.querySelectorAll('td')[3].innerText;
            }
            if (upVal || idx == trs.length - 1) {
                chk = 0;
                var trString = thisTr.outerHTML;
                trString = trString.replace(' selected=""', '');
                trString = trString.replace((val + '"'), (val + '" selected'));
                var position = 'beforebegin';
                if (idx == trs.length - 1) {
                    position = 'afterend'
                }
                tr.insertAdjacentHTML(position, trString);
                thisTr.remove();
                document.getElementsByName('menuNo')[0].value = parseInt(upNo, 10) + 1;
            }
        }

        if (upVal && val == upVal) {
            chk = 1;
        }

        if (chk > 0) {
            upNo = tr.querySelectorAll('td')[3].innerText;
        }
    });
}

// 상위메뉴추가
function doUpMenu() {
    if (trId != '') {
        if (!confirm('수정 중이던 내용이 사라집니다.')) {
            return false;
        } else {
            chgToTxt(trId);
        }
    }

    var tbodyEle = document.getElementById(grid1.frmId + '_tbody');
    var trLenth = tbodyEle.querySelectorAll('tr').length;
    var html = '<tr id="' + grid1.frmId + '_' + trLenth + '">';
    trId = grid1.frmId + '_' + trLenth;

    var thLength = Object.keys(grid1.th).length;
    for (let i = 0; i < thLength; i++) {
        html += '<td>';
        if (i != 1 && i != 4) {
            if (colNm[i] == 'menuNo') {
                html += '<input type="number" class="form-control" name="' + colNm[i] + '" required="Y">';
            } else {
                html += '<input type="text" class="form-control" name="' + colNm[i] + '" required="Y">';
            }
        }
        html += '</td>';
    }

    html += '</tr>';

    tbodyEle.insertAdjacentHTML('beforeend', html);

    tbodyEle.style.height = (((grid1.row + 1) * 30) + 60) + 'px';

    document.getElementById(trId).click();
}

// 취소
function doCancel() {
    if (trId != '') {
        sggGridRun(1, grid1.frmId);
    }
    trId = '';
}