$(document).ready(function(){
    // type select box
    drawCode();

    if (codeNo != '') {
        // 내용
        getDtl();
        chkCodeNo(1);
    } else {
        chkCodeNo(0);
    }

    // 코드삭제 숨기기
    $('#btnDivDel').hide();
    $('#btnDivDel1').hide();

    // 글쓰기 포커스
    $('.pWrite').on('focus', function() {
        getPWriteId($(this).attr('id'));
    });

    $('[id]').on('click', function() {
        event.stopPropagation();
        chkOnclick($(this).attr('id'));
    });
});

var userId = '';

var pWriteId = '';

function chkCodeNo(chk) {
    // 상세보기이면
    if (chk == 1) {
        $('#btnSave').hide();
        $('#btnFrm').hide();
        $('#btnFrm1').hide();
        $('#divType').hide();
        $('#title').attr('readonly', true);
        $('#title').css('border', 'none');

        $('#btnUpdate').show();
    } else {
        $('#btnSave').show();
        $('#btnFrm').show();
        $('#btnFrm1').show();
        $('#divType').show();
        $('#title').attr('readonly', false);
        $('#title').css('border', '1px solid #ccc');

        $('#btnUpdate').hide();
    }

    if ($('#layoutUserId').val() != userId) {
        if ($('#layoutUserAuth').val() != '999') {
            $('#btnUpdate').hide();
        }
    }
}

// 내용
function getDtl() {
    var map = {url : '/learn/getDtl'
                , data : {codeNo : codeNo}};

    var data = ajaxPost(map);

    if (data.length > 0) {

        $('#title').val(data[0].codeTitle);
        $('#type').val(data[0].codeTypeCd);

        userId = data[0].userId;

        var divNo = '';
        var id = '';
        var resumHtml = '';
        for (let i = 0; i < data.length; i++) {
            if (divNo == data[i].divNo) {
                resumHtml += data[i].divCode;
                if (i == data.length - 1 || divNo != data[i+1].divNo) {
                    $('#' + id).append(resumHtml);
                }
            } else {
                divNo = data[i].divNo;
                id = 'pWrite' + divNo;
                var html = '<div id="' + id + '" class="dtlPWrite"></div>';
                $('#frmCode').append(html);

                if (i != data.length - 1) {
                    if (divNo == data[i+1].divNo) {
                        resumHtml = data[i].divCode;
                    } else {
                        var htmlData = data[i].divCode;
                        $('#' + id).append(htmlData);
                    }
                } else {
                    var htmlData = data[i].divCode;
                    $('#' + id).append(htmlData);
                }

            }

        }
    }

    // 인텔리제이에서 가져온 코드 글자크기 조정
    for (let i = 0; i < $('pre').length; i++) {
        var style = $($('pre').get(i)).attr('style');
        style = style.replace('font-size:9.8pt;', 'font-size: 14px;');

        $('pre').attr('style', style);
    }

    // color scripter에서 가져온 코드 배경크기 조정
    for (let i = 0; i < $('.ce-code-text').length; i++) {
        var style = $($('.ce-code-text').get(i)).attr('style');

        var wid = style.indexOf('width');
        var hei = style.indexOf('height');

        var widStyle = style.substr(0, wid);
        var heiStyle = style.substr(hei);
        var semi = heiStyle.substr((heiStyle.indexOf(';') + 1));

        style = widStyle + semi;

        console.log(style)

        $('.ce-code-text').attr('style', style);
    }
}

// 저장
function doSave() {
    if (!sggNullChk('divTitle')) {
        return false;
    };

    var arr = [];

    var cnt = 0;
    $('.pWrite').each(function() {
        cnt++;
        var content = $(this).html();
        if (content.length > 800) {
            // db 컬럼이 1000이라서 잘라서 넣어주기
            var split = sggSplitLength(content, 800);
            var divNoNo = 1;
            for (let i = 0; i < split.length; i++) {
                var map = {codeNo : codeNo
                            , divNo : cnt
                            , divNoNo : divNoNo
                            , divCode : split[i]}
                divNoNo++;
                arr.push(map);
            }
        } else {
            var map = {codeNo : codeNo
                    , divNo : cnt
                    , divNoNo : 1
                    , divCode: content}
            arr.push(map);
        }
    });

    var map = {codeNo : codeNo
                , codeTypeCd : $('#type').val()
                , codeTitle : $('#title').val()};

    var dataMap = {code : map
                ,dtl : arr};

    var obj = {url : '/learn/doSave'
                , data : dataMap}

    var data = ajaxPost(obj);

    if (data > 0) {
        // 목록으로
        $('#btnList').click();
    }
}

// 코드 추가
function addFrm() {
    // pWrite 아이디에 붙여줄 번호
    var cnt = $('.pWrite').length + 1;
    // pWrite 생성
    $('#frmCode').append('<div id="pWrite' + cnt + '" class="pWrite" contenteditable="true"></div>');

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
    $('#btnDivDel1').show();
}

// 코드 삭제
function delFrm() {
    $('#' + pWriteId).remove();
    // 코드 삭제 가리기
    $('#btnDivDel').hide();
    $('#btnDivDel1').hide();
    // 삭제할 코드 아이디
    pWriteId = '';
    var cnt = $('.pWrite').length;

    // 아이디 새로 붙여주기
    for (let i = 0; i < cnt; i++) {
        var id = 'pWrite' + (i + 1);
        $($('.pWrite').get(i)).attr('id', id);
    }
}

// 포커스 된 pWrite
function getPWriteId(id) {
    // 코드 삭제 보여주기
    $('#btnDivDel').show();
    $('#btnDivDel1').show();
    // 삭제할 코드 id
    pWriteId = id;
}

// 상세보기 수정 클릭 시
function getChg() {
    var cnt = $('.dtlPWrite').length;

    for (let i = 0; i < cnt; i++) {
        var id = $('.dtlPWrite').attr('id');

        // 속성주기
        $('#' + id).addClass('pWrite');
        $('#' + id).removeClass('dtlPWrite');
        $('#' + id).attr('contenteditable', true);

        // focus function 걸어주기
        $('#' + id).on('focus', function() {
            event.stopPropagation();
            getPWriteId($(this).attr('id'));
        });

        // onclick function 걸어주기
        $('#' + id).on('click', function() {
            event.stopPropagation();
            chkOnclick($(this).attr('id'));
        });
    }
}

// 클릭 이벤트 감지
function chkOnclick(id) {
    if (id == 'btnDivDel' || id == 'btnDivDel1') {
       delFrm();

       return false;
    }

    if (id == 'btnDiv' || id == 'btnDiv1') {
       addFrm();

       return false;
    }

    if (id == 'btnSave') {
        doSave();

        return false;
    }

    if (id == 'btnList') {
        goPage('learn/cmnCode');
    }

    if (id == 'btnUpdate') {
        chkCodeNo(0);
        getChg();

        return false;
    }

    if (id == 'btnCS' || id == 'btnCS1') {
        window.open('https://colorscripter.com/', 'Popup', 'width=700, height=800');
    }

    if (id.substr(0, 6) != 'pWrite') {
       // 글 작성 칸이 아닐 시
       $('#btnDivDel').hide();
       $('#btnDivDel1').hide();
       pWriteId = '';

       return false;
    }
}

// 코드 타입 selectbox
function drawCode() {

    var map = {cdId : 'CODE_TYPE_CD'
                , upCdId : ''
                , exCode : []
                , id : 'type'};

    getCode(map);
}