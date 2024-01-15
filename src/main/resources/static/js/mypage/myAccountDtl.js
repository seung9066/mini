$(document).ready(function(){
    getAccount();

    // 엔터키 다음칸 이동
    $("input").on("input", function(key){
		if(key.keyCode==13) {
			// 아이디 중복체크
			if ($(this).attr('name') == 'userId') {
				if (sggRegChk('id', $(this).val())) {
					idChk();
				}
			}
			
			if ($('#myId').attr('readonly')) {
				if ($(this).attr('name') == 'userId') {
					$('#myNm').focus();
				}
				if ($(this).attr('name') == 'userNm') {
					// saveAccount();
				}
			}
		}
	});

	// 전화번호
	$('#telNo').on("input", function(key) {
        if ($(this).val().substr(0, 2) == '02') {
            $(this).attr('maxlength', '10');
        } else {
            $(this).attr('maxlength', '11');
        }
	});

	// 정보수정
	$('#btnNewAccount').on('click', function() {
		saveAccount();
	});
});

// 정보 불러오기
function getAccount() {
    var map = {'url' : '/mypage/getAccount'
                , 'frmId': 'frmNewAccount'};

    // 폼태그 시리얼라이즈 포스트
    var data = ajaxPostSerial(map);

    sggBindMap(data);
}

// 정보 수정
function saveAccount() {
	
	// 빈값 체크
	if (!sggNullChk('frmNewAccount')) {
		return false;
	}

	// 유효성 체크
	if (!sggRegChkAttr('frmNewAccount')) {
		return false;
	}
	
	var map = {'url' : '/mypage/saveAccount'
                , 'frmId': 'frmNewAccount'};
	
	// 폼태그 시리얼라이즈 포스트
	var data = ajaxPostSerial(map);
	
	if (data) {
		alert('수정이 완료되었습니다.');
	} else {
		alert('error');
	}
}