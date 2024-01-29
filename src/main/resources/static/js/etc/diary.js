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
    , ajaxUrl : '/etc/diaryList'
    // ajax GET, POST
    , ajaxType : 'POST'
    // 테이블 컬럼 {컬럼명, 한글명}
    , th : {rnum : '번호', lev2 : '하위메뉴아이디', menuName : '메뉴명', menuNo : '메뉴번호', menuPath : '경로', userAuth : '권한', delYn : '삭제여부'}
    // 그리드 row 수 값이 없으면 모두 다 출력
    , row : 20
    // ajax 버튼용 총 게시글 수 url
    , ajaxBtnUrl : '/etc/diaryListCnt'
    // 총 게시글 수
    , totalCnt : 0
    // 버튼 수
    , btn : 10
    // tr onclick function명
    , tonC : ''
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
    var map = [{id :'btnWrite'
                , event : 'click'
                , eventDtl : 'doWrite'}
              ]

    sggEvent(map);
}

// 글작성
function doWrite() {

}
