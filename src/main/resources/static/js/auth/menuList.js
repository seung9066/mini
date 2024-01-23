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
// 신규 체크
var newChk = 0;

// 메뉴 수정
function replaceMenu(tr) {
    var tds = tr.querySelectorAll('td');

    if (trId != '' && trId != tr.id) {
        if (confirm('수정 중이던 내용이 사라집니다.')) {
            // input > text
            chgToTxt(trId);
            // text > input
            chgToInput(tds);

            if (newChk == 1) {
                document.getElementById(trId).remove();
            }
            newChk = 0;

            trId = tr.id;
        } else {
            document.getElementById(trId).click();
        }
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
                td.innerHTML = '<input type="text" class="form-control" value="' + txt + '" name="' + colNm[idx] + '">';
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

// 인풋 태그를 text로 바꾸기
function chgToTxt(id) {
    var tr = document.getElementById(id);
    var tds = tr.querySelectorAll('td');

    // 이미 수정중인지 체크
    var cnt = 0;
    tds.forEach(function(td) {
        var html = td.innerHTML;
        if (html.indexOf('<input') > -1) {
            cnt++;
        }
    });

    // 수정중이 아니면 input으로 바꿔주기
    if (cnt > 0) {
        tds.forEach(function(td, idx) {
            td.innerHTML = '';
            td.innerText = beforVal[idx];
        });
        beforVal = [];
    }
}

// 상위 메뉴 selectBox 그려주기
function makeSelect(val) {
    var tbodyEle = document.getElementById(grid1.frmId + '_tbody');
    var trs = tbodyEle.querySelectorAll('tr');

    var html = '<select name="upMenuId" onChange="moveTr(this)">';
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

// 저장
function doSave() {
    console.log('a')
}

// 메뉴 추가
function doMenu() {
    if (trId != '') {
        if (!confirm('수정 중이던 내용이 사라집니다.')) {
            return false;
        } else {
            chgToTxt(trId);
        }
    }

    newChk = 1;
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
            html += '<input type="text" class="form-control" value="" name="' + colNm[i] + '">';
        }
        html += '</td>';
    }

    html += '</tr>';

    tbodyEle.insertAdjacentHTML('beforeend', html);

    tbodyEle.style.height = (((grid1.row + 1) * 30) + 60) + 'px';

    sggGridClickHover(grid1);

    document.getElementById(trId).click();
}

// selectbox 누를 때 이동
function moveTr(ele) {
    var tbodyEle = document.getElementById(grid1.frmId + '_tbody');
    var trs = tbodyEle.querySelectorAll('tr');
    var val = ele.value;
    var upVal = '';

    var thisTr = ele.parentNode.parentNode;

    trs.forEach(function(tr) {
        upVal = tr.querySelector('td').innerText;

        if (upVal && val == upVal) {
            var trString = thisTr.outerHTML;
            trString = trString.replace((val + '"'), (val + '" selected'));
            tr.insertAdjacentHTML('afterend', trString);
            thisTr.remove();
        }
    });

    sggGridClickHover(grid1);
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

    newChk = 1;
    var tbodyEle = document.getElementById(grid1.frmId + '_tbody');
    var trLenth = tbodyEle.querySelectorAll('tr').length;
    var html = '<tr id="' + grid1.frmId + '_' + trLenth + '">';
    trId = grid1.frmId + '_' + trLenth;

    var thLength = Object.keys(grid1.th).length;
    for (let i = 0; i < thLength; i++) {
        html += '<td>';
        if (i != 1 && i != 4) {
            html += '<input type="text" class="form-control" value="" name="' + colNm[i] + '">';
        }
        html += '</td>';
    }

    html += '</tr>';

    tbodyEle.insertAdjacentHTML('beforeend', html);

    tbodyEle.style.height = (((grid1.row + 1) * 30) + 60) + 'px';

    sggGridClickHover(grid1);

    document.getElementById(trId).click();
}

// 취소
function doCancel() {
    if (newChk == 0) {
        chgToTxt(trId);
    } else {
        document.getElementById(trId).remove();
    }
    trId = '';
    newChk = 0;
}