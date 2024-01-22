$(document).ready(function(){
    sggGridRun(1, grid1.frmId);

    drawCode();

    // 작성
    $('#btnWrite').on('click', function() {
        goWrite();
    });

    // 조회
    $('#search').on('click', function() {
       sggGrid(1, grid1.tblId);
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
    , ajaxUrl : '/learn/getList'
    // ajax GET, POST
    , ajaxType : 'POST'
    // 테이블 컬럼 {컬럼명, 한글명}
    , th : {'codeNo' : '번호', 'codeTitle' : '제목', 'codeTypeCd' : '언어'}
    // 그리드 row 수 값이 없으면 모두 다 출력
    , row : 20
    // ajax 버튼용 총 게시글 수 url
    , ajaxBtnUrl : '/learn/getListCnt'
    // 총 게시글 수
    , totalCnt : 0
    // 버튼 수
    , btn : 10
    // tr onclick function명
    , tonC : 'getDtl'
    // tr onclick시 데이터 담아줄 배열
    , trData : {}
    // callback function 없으면 ''
    , callback : ''
    // table css
    , tbCss : {'width' : '100%;', 'text-align' : 'center'}
    // th css 하나의 {}만 입력시 모든 th에 적용, grid.th.lengh 만큼 적으면 각각 적용
    , thCss: [{'width':'20%'}, {'width':'60%'}, {'width':'20%'}]
    // 첫컬럼 타입 (checkbox, radio, ''이면 아무것도 없는거)
    , tdType : ''
    // 첫컬럼에 따른 row 데이터 담을 배열
    , tdTypeData: []
}

sggGridList.push(grid1);

// 상세조회
function getDtl() {
    goPageMap('learn/cmnDtlCode', {codeNo : grid1.trRowData[0]});
}

// 작성 페이지 이동
function goWrite() {
    goPageMap('learn/cmnDtlCode', {codeNo : ''});
}

function drawCode() {

    var map = {cdId : 'CODE_TYPE_CD'
                , upCdId : ''
                , exCode : []
                , id : 'type'};

    getCode(map);
}

function addEvent() {
    var map = [{id :'grdRow'
                , event : 'change'
                , eventDtl : 'rowChange'}]
    sggEvent(map);
}

function rowChange(ele) {
    grid1.row = ele.value;

    sggGridRun(sggPgNum, grid1.frmId);
}