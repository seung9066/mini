$(document).ready(function(){
	// 아이디 포커스
	$('#myPw').focus();
	
	// 수정
	$('#btnNewAccount').on('click', function() {
		myAccount();
	});
	
	// 비밀번호 엔터키
    $("#myPw").on("keyup", function(key){
		if(key.keyCode==13) {
			myAccount();
		}
	});
});

// 수정 전 비밀번호 확인
function myAccount() {
	
	// 빈값 체크
	if (!sggNullChk('frmNewAccount')) {
		return false;
	}
	
	var map = {'url' : '/mypage/chkMypage'
                , 'frmId': 'frmNewAccount'};
	
	// 폼태그 시리얼라이즈 포스트
	var data = ajaxPostSerial(map);
	
	if (data) {
		goPage('mypage/myAccountDtl');
	} else {
		alert('비밀번호를 확인해주세요');
	}
}
