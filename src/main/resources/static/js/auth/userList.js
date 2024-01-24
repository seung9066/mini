$(document).ready(function(){
    sggGridRun(1, grid1.frmId);

    drawCode();

    // 작성
    $('#btnWrite').on('click', function() {
        goWrite();
    });

    // 조회
    $('#search').on('click', function() {
       sggGridRun(1, grid1.frmId);
    });

    if ($('#layoutUserAuth').val() != '999') {
        $('.btnFrm').hide();
    }

    addEvent();
});

var grid1 =
{
    // 그리드를 그려줄 폼태그 아이디
    frmId : 'frm'
    // 그리드 데이터(미리 값을 담아주거나 ajax통신을 통해 받아온 데이터)
    , data : []
    // ajax url
    , ajaxUrl : '/auth/getList'
    // ajax GET, POST
    , ajaxType : 'POST'
    // 테이블 컬럼 {컬럼명, 한글명}
    , th : {'rnum' : '번호', 'userId' : '아이디', 'userNm' : '이름', 'userAuthNm' : '권한'}
    // 그리드 row 수 값이 없으면 모두 다 출력
    , row : 10
    // ajax 버튼용 총 게시글 수 url
    , ajaxBtnUrl : '/auth/getListCnt'
    // 총 게시글 수
    , totalCnt : 0
    // 버튼 수
    , btn : 10
    // tr onclick function명
    , tonC : 'getDtl'
    // tr onclick 색상 true, false
    , tonCColor : 'true'
    // tr onclick시 데이터 담아줄 배열
    , trData : {}
    // callback function 없으면 ''
    , callback : ''
    // table css
    , tbCss : {'width' : '100%;', 'text-align' : 'center'}
    // th css 하나의 {}만 입력시 모든 th에 적용, grid.th.lengh 만큼 적으면 각각 적용
    , thCss: [{'width':'20%'}, {'width':'30%'}, {'width':'30%'}, {'width':'20%'}]
    // 첫컬럼 타입 (checkbox, radio, ''이면 아무것도 없는거)
    , tdType : ''
    // 첫컬럼에 따른 row 데이터 담을 배열
    , tdTypeData: []
}

sggGridList.push(grid1);

// 상세조회
function getDtl() {
    sggBindMap(grid1.trData);

    if (grid1.trData.userAuth == '999') {
        document.getElementById('userAuth').disabled = true;
    } else {
        document.getElementById('userAuth').disabled = false;
    }
}

// 유저권한 공통코드 조회
function drawCode() {
    // 조회
    var map = {cdId : 'USER_AUTH'
                , upCdId : ''
                , exCode : []
                , id : 'type'};

    getCode(map);

    // 상세
    var map = {cdId : 'USER_AUTH'
                , upCdId : ''
                , exCode : []
                , id : 'userAuth'};

    getCode(map);
}

// 이벤트
function addEvent() {
    var btnSv = {id : 'btnSave'
                , event : 'click'
                , eventDtl : 'btnSave'};

    var map = [btnSv];

    sggEvent(map);
}

// 저장
function btnSave() {
    var map = {url : '/auth/doSave'
                , frmId : 'dtlFrm'};

    var data = ajaxPostSerial(map);

    if (data > 0) {
        alert('수정 완료.');
        sggGridRun(sggPgNum, grid1.frmId);

        var dtlFrm = document.getElementById('dtlFrm');
        sggToNull(dtlFrm);
    }
}