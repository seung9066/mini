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
    , ajaxUrl : '/auth/indexList'
    // ajax GET, POST
    , ajaxType : 'POST'
    // 테이블 컬럼 {컬럼명, 한글명}
    , th : {rnum : '번호', preHead : '제목', userId : '아이디', delYn : '삭제여부'}
    // 그리드 row 수 값이 없으면 모두 다 출력
    , row : 20
    // ajax 버튼용 총 게시글 수 url
    , ajaxBtnUrl : '/auth/indexListCnt'
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
    , thCss: []
    // 첫컬럼 타입 (checkbox, radio, ''이면 아무것도 없는거)
    , tdType : ''
    // 첫컬럼에 따른 row 데이터 담을 배열
    , tdTypeData: []
}

sggGridList.push(grid1);

// 이벤트
function addEvent() {
    // 조회
    var map = [{id :'search'
                , event : 'click'
                , eventDtl : 'btnSearch'}
                , {id : 'btnSave'
                    , event : 'click'
                    , eventDtl : 'btnSave'}
                , {id : 'btnC'
                    , event : 'click'
                    , eventDtl : 'btnC'}]

    sggEvent(map);
}

// 조회
function btnSearch(ele) {
    sggGridRun(1, grid1.frmId);
}

// 상세정보
function getDtl(ele) {
    var data = grid1.trData;
    var preDtl = data.preDtl;
    // db에 줄 바꿈을 <br>로 처리
    data.preDtl = preDtl.replaceAll('<br>', '\n');

    sggBindMap(data);
}

// 저장
function btnSave() {
    if (!sggNullChk('dtlFrm')) {
        return false;
    }

    var preDtl = document.getElementById('preDtl').value;
    // db에 줄 바꿈을 <br>로 처리
    preDtl = preDtl.replaceAll('\n', '<br>');
    document.getElementById('preDtl').value = preDtl;

    var map = {url : '/auth/saveIndex'
                , data:{}
                , frmId : 'dtlFrm'};

    var data = ajaxPost(map);

    if (data > 0) {
        afterBtnSave();
    }

}

// 저장 이후
function afterBtnSave() {
    sggGridRun(1, grid1);

    var dtlFrm = document.getElementById('dtlFrm');
    sggToNull(dtlFrm);
}

// 취소
function btnC() {
    var dtlFrm = document.getElementById('dtlFrm');
    sggToNull(dtlFrm);
}