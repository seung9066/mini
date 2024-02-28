$(document).ready(function(){
//    sggGridRun(1, grid1.frmId);

    addEvent();
    // 목록 div
    getList();
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
    , th : {diaryNo : '글번호', dairyTitle : '제목', delYn : '삭제여부'}
    // 그리드 row 수 값이 없으면 모두 다 출력
    , row : 20
    // ajax 버튼용 총 게시글 수 url
    , ajaxBtnUrl : '/etc/diaryListCnt'
    // 총 게시글 수
    , totalCnt : 0
    // 버튼 수
    , btn : 10
    // tr onclick function명
    , tonC : 'getDtl'
    // tr onclick 색상 true, false
    , tonCColor : 'false'
    // tr onclick시 데이터 담아줄 배열
    , trData : {}
    // callback function 없으면 ''
    , callback : ''
    // table css
    , tbCss : {'width' : '100%;', 'text-align' : 'center'}
    // th css 하나의 {}만 입력시 모든 th에 적용, grid.th.lengh 만큼 적으면 각각 적용
    , thCss: [{width : '15%'}, {width : '70%'}, {width : '15%'}]
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
    getWriteFrm();
}

// 목록 불러오기
function getList() {
    // 버튼 div
    var btnFrm = document.getElementById('btnFrm');
    // 목록 div
    var listDiv = document.getElementById('listDiv');
    // 상세정보 div
    var dtlDiv = document.getElementById('dtlDiv');

    if (listDiv) {
        listDiv.remove();
    }
    if (dtlDiv) {
        dtlDiv.remove();
    }

    // 목록 html
    var html = `<div class="row" id="listDiv">
                   <div class="col-lg-12 mt-5 mt-lg-0 d-flex align-items-stretch">
                       <div class="php-email-form">
                           <form id="frm">
                           </form>
                       </div>
                   </div>
                </div>
                <br><br><br>`;

    // 버튼 div 뒤에 생성
    btnFrm.insertAdjacentHTML('afterend', html);
    // 그리드 조회
    sggGridRun(sggPgNum, grid1.frmId);
}

// 작성폼
function getWriteFrm() {
    // 버튼 div
    var btnFrm = document.getElementById('btnFrm');
    // 목록 div
    var listDiv = document.getElementById('listDiv');
    // 상세정보 div
    var dtlDiv = document.getElementById('dtlDiv');

    if (listDiv) {
        listDiv.remove();
    }
    if (dtlDiv) {
        dtlDiv.remove();
    }

    // 상세정보 div
    var html = `<div class="row" id="dtlDiv">
                    <div class="col-lg-12 mt-5 mt-lg-0 d-flex align-items-stretch">
                        <div class="php-email-form">
                            <form id="frmDtl">
                            </form>
                            <br><br>
                            <div class="text-center"><input type="button" id="btnSave" value="저장"></div>
                        </div>
                    </div>
                </div>`;

    // 버튼 div 뒤에 생성
    btnFrm.insertAdjacentHTML('afterend', html);

    var map = [{id :'btnSave'
                , event : 'click'
                , eventDtl : 'doSave'}
              ]

    sggEvent(map);
}

// 저장
function doSave() {
    // 목록
    getList();
}

// 상세정보
function getDtl() {
    // 입력폼 생성
    getWriteFrm();
}