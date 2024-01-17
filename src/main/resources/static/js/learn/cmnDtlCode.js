$(document).ready(function(){
    if (codeNo != '') {
        // 내용
        getDtl();
        chkCodeNo(1);
    } else {
        chkCodeNo(0);
    }

    // 코드삭제 숨기기
    $('#btnDivDel').hide();

    // 글쓰기 포커스
    $('.pWrite').on('focus', function() {
        getPWriteId($(this).attr('id'));
    });

    $('[id]').on('click', function() {
        event.stopPropagation();
        chkOnclick($(this).attr('id'));
    });
});

var pWriteId = '';

function chkCodeNo(chk) {
    // 상세보기이면
    if (chk == 1) {
        $('#btnSave').hide();
        $('#btnDiv').hide();
        $('#btnDivDel').hide();

        $('#btnUpdate').show();
    } else {
        $('#btnSave').show();
        $('#btnDiv').show();
        $('#btnDivDel').show();

        $('#btnUpdate').hide();
    }
}

// 내용
function getDtl() {
    var map = {url : '/learn/getDtl'
                , data : {codeNo : codeNo}};

    var data = ajaxPost(map);

    $('#title').text(data[0].codeTitle);

    for (let i = 0; i < data.length; i++) {
        var id = 'pWrite' + (i + 1);
        var html = '<div id="' + id + '"></div>';
        $('#frmNewAccount').append(html);
        $('#' + id).append(data[i].divCode);
    }
}

// 저장
function doSave() {
    var map = new Map();

    var cnt = 0;
    $('.pWrite').each(function() {
        cnt++;
        var content = $(this).html();
        map.set(cnt, content);
    });

    map = Object.fromEntries(map);

    console.log(map)
}

// 코드 추가
function addFrm() {
    // pWrite 아이디에 붙여줄 번호
    var cnt = $('.pWrite').length + 1;
    // pWrite 생성
    $('#frmNewAccount').append('<div id="pWrite' + cnt + '" class="pWrite" contenteditable="true"></div>');

    // focus function 걸어주기
    $('#pWrite' + cnt).on('focus', function() {
        event.stopPropagation();
        getPWriteId($(this).attr('id'));
    });

    // onclick function 걸어주기
    $('#pWrite' + cnt).on('click', function() {
        event.stopPropagation();
        chkOnclick($(this).attr('id'));
    });

    $('#pWrite' + cnt).focus();

    $('#btnDivDel').show();
}

// 코드 삭제
function delFrm() {
    $('#' + pWriteId).remove();
    // 코드 삭제 가리기
    $('#btnDivDel').hide();
    // 삭제할 코드 아이디
    pWriteId = '';
    var cnt = $('.pWrite').length;

    for (let i = 0; i < cnt; i++) {
        var id = 'pWrite' + (i + 1);
        $($('.pWrite').get(i)).attr('id', id);
    }
}

// 포커스 된 pWrite
function getPWriteId(id) {
    // 코드 삭제 보여주기
    $('#btnDivDel').show();
    // 삭제할 코드 id
    pWriteId = id;
}

// 상세보기 수정 클릭 시
function getChg() {
    var cnt = $('#frmNewAccount').find('div').length;

    for (let i = 0; i < cnt; i++) {
        var id = $($('#frmNewAccount').find('div').get(i)).attr('id');

        if (typeof id != 'undefined') {
            if (id.substr(0, 6) == 'pWrite') {
                // 속성주기
                $($('#frmNewAccount').find('div').get(i)).addClass('pWrite');
                $($('#frmNewAccount').find('div').get(i)).attr('contenteditable', true);

                // focus function 걸어주기
                $('#pWrite1').on('focus', function() {
                    event.stopPropagation();
                    getPWriteId($(this).attr('id'));
                });

                // onclick function 걸어주기
                $('#pWrite1').on('click', function() {
                    event.stopPropagation();
                    chkOnclick($(this).attr('id'));
                });

                $('#pWrite1').focus();
            }
        }
    }
}

// 클릭 이벤트 감지
function chkOnclick(id) {
    if (id == 'btnDivDel') {
       delFrm();

       return false;
    }

    if (id == 'btnDiv') {
       addFrm();

       return false;
    }

    if (id == 'btnSave') {
        doSave();

        return false;
    }

    if (id == 'btnUpdate') {
        chkCodeNo(0);
        getChg();

        return false;
    }

    if (id.substr(0, 6) != 'pWrite') {
       // 글 작성 칸이 아닐 시
       $('#btnDivDel').hide();
       pWriteId = '';

       return false;
    }
}