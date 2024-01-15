$(document).ready(function(){
	// 아이디 포커스
	$('#loginId').focus();
	
	// 아이디 중복체크 이후 창
	$('#afterIdChk').hide();
	$('#btnNewAccount').hide();
	
    // 아이디 존재여부 체크
    $('#idChk').on('click', function() {
        idChk();
    });

    // 엔터키 다음칸 이동
    $("input").on("keyup", function(key){
		if(key.keyCode==13) {
			// 아이디 중복체크
			if ($(this).attr('name') == 'userId') {
				if (sggRegChk('id', $(this).val())) {
					idChk();
				}
			}
			
			// 중복체크 성공시
			if ($('#loginId').attr('readonly')) {
				if ($(this).attr('name') == 'userId') {
					$('#loginPw').focus();
				}
				if ($(this).attr('name') == 'userPw') {
					// 비밀번호 양식이 맞으면
					if (sggRegChk('pw', $(this).val())) {
						$('#loginPwChk').focus();
					}
				}
				if ($(this).attr('name') == 'userPwChk') {
					$('#loginNm').focus();
				}
				if ($(this).attr('name') == 'userNm') {
					newAccount();
				}
			}
		}
	});
	
	$('input[type=id]').on('input', function(key){
		if (!sggRegChk('id', $(this).val())) {
			$('#loginFail').html('아이디 양식 (영문 숫자 조합 8자리 이상)을 맞춰주세요.');
		} else {
			$('#loginFail').html('');
		}
	});
	
	// 패스워드 비교
	$('input[type=password]').on("input", function(key){
		var pw = $('#loginPw').val();
		var pwChk = $('#loginPwChk').val();
		
		// 비밀번호 양식
		if ($(this).attr('name') == 'userPw') {
			if (!sggRegChk('pw', $(this).val())) {
				$('#loginFail').html('비밀번호 양식 (영문 숫자 특수기호 조합 8자리 이상)을 맞춰주세요.');
			} else {
				$('#loginFail').html('');
			}
		} else {
			if (pw != pwChk) {
				$('#loginFail').html('비밀번호가 일치하지 않습니다.');
			} else {
				$('#loginFail').html('');
			}
		}
	});
	
	// 회원가입
	$('#btnNewAccount').on('click', function() {
		newAccount();
	});
});

// 회원가입
function newAccount() {
	
	// 빈값 체크
	if (!sggNullChk('frmNewAccount')) {
		return false;
	}
	
	// 비밀번호 일치 체크
	var pw = $('#loginPw').val();
	var pwChk = $('#loginPwChk').val();
	if (pw != pwChk) {
		alert('비밀번호 불일치');
		$('#loginPwChk').focus();
		return false;
	}
	
	// 유효성 체크
	if (!sggRegChkAttr('frmNewAccount')) {
		return false;
	}
	
	var map = {'url' : '/login/newAccount'
                , 'frmId': 'frmNewAccount'};
	
	// 폼태그 시리얼라이즈 포스트
	var data = ajaxPostSerial(map);
	
	if (data) {
		alert('회원가입이 완료되었습니다.');
		location.href="/";
	} else {
		alert('error');
	}
}

// 아이디 존재여부 체크
function idChk() {
    var id = '';
    id = $('#loginId').val();

    var map = {'url' : '/login/getId'
                , 'data':{'userId' : id}};

    var data = ajaxPost(map);

    if (data.cnt > 0) {
        // 존재하면
        $('#loginFail').html('사용할 수 없는 아이디 입니다.');
    } else {
		if (confirm('사용가능한 아이디 입니다. 사용하시겠습니까?')) {
			// 사용가능 아이디
	        // 아이디 수정 불가
	        $('#loginId').attr('readonly', true);
	        // 아이디 체크 버튼
	        $('#idChk').hide();
	        // 이후 입력창
	        $('#afterIdChk').show();
	        // 회원가입 버튼
	        $('#btnNewAccount').show();
	        // 로그인 실패 문구 초기화
	        $('#loginFail').html('');
		}
    }
}