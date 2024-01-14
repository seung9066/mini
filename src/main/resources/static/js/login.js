$(document).ready(function(){
    $('#pwDiv').hide();

    // 아이디 존재여부 체크
    $('#idChk').on('click', function() {
        idChk();
    });

    // 비밀번호 체크
    $('#pwChk').on('click', function() {
        pwChk();
    });
});

// 아이디 존재여부 체크
function idChk() {
    var id = '';
    id = $('#loginId').val();

    var map = {'url' : '/login/getId'
                , 'data':{'userId' : id}};

    var data = ajaxPost(map);

    if (data.cnt > 0) {
        // 아이디가 존재하면
        // 아이디 수정 불가
        $('#loginId').attr('readonly', true);
        // 아이디 체크 버튼
        $('#idChk').hide();
        // 비밀번호
        $('#pwDiv').show();
        // 로그인 실패 문구 초기화
        $('#loginFail').html('');
    } else {
        // 존재하지 않으면
        // 로그인 실패 문구
        $('#loginFail').html('존재하지 않는 아이디 입니다.');
    }
}

// 비밀번호 체크
function pwChk() {
    var id = '';
    id = $('#loginId').val();

    var pw = '';
    pw = $('#loginPw').val();

    var map = {'url' : '/login/loginChk'
                , 'data':{'userId' : id
                        , 'userPw' : pw}};

    var data = ajaxPost(map);

    if (data.cnt > 0) {
        // 로그인 성공
        alert('a')
    } else {
        // 로그인 실패
        $('#loginFail').html('잘못된 비밀번호 입니다.');
    }
}