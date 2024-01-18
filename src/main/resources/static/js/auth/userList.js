$(document).ready(function(){
    sggGrid(1, grid1.tblId);

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
});

var grid1 =
{
 // 검색용 form 태그 아이디
 form: 'frm',
 // 페이징 ajax url
 url: '/auth/getList',
 // GET, POST
 type: 'POST',
 // 테이블 아이디
 tblId: 'tbl',
 // 테이블 th 컬럼명으로 정해줄 내용, th(컬럼) 수 보다 td 수가 많을 경우 해당 td hidden 처리
 th: ['번호', '아이디', '이름', '권한'],
 // 페이징 between (1 ~ row 번까지)
 row: '10',
 // 페이징 버튼 용 게시글 총 수 url
 buttonUrl: '/auth/getListCnt',
 // 한번에 보여줄 페이징 버튼 수
 pageButtonNum: 10,
 // tr onclick function명
 tonC: 'getDtl',
 // tr onclick 값 담아줄 배열
 trRowData: [],
 // callback 함수명
 callback: '',
 // table css
 tbCss: {'width':'100%', 'text-align':'center'},
 // th css 하나의 {}만 입력시 모든 th에 적용, grid.th.lengh 만큼 적으면 각각 적용
 thCss: [],
 // check box 옵션 (true or false)
 chkBox: 'false',
 // chkBox 값 담을 배열
 chkBoxRow: []
}

// 그리드들 배열에 담아주는 작업 필수
var gridList = [grid1];

// 상세조회
function getDtl() {
    console.log(grid1.trRowData);
}

function drawCode() {

    var map = {cdId : 'USER_AUTH'
                , upCdId : ''
                , exCode : []
                , id : 'type'};

    getCode(map);
}