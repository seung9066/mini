// map : {'url':url, 'data':data}
// 아작스 포스트 통신
function ajaxPost(map) {
    var dataMap = map.data;

    var jsonData = JSON.stringify(dataMap);

    var returnData = '';

    $.ajax({
        url:map.url,
        type:'POST',
        contentType: 'application/json',
        data:jsonData,
        dataType:"json",
        async:false,
        success:function(data){
            returnData = data;
        },
        error:function(reject){
            returnData = reject;
        }
    })

    return returnData;
}

// map : {'url':url, 'frmId':frmId}
// 폼 태그 시리얼라이즈 아작스 포스트
function ajaxPostSerial(map) {
	var data = $('#' + map.frmId).serialize();

	var returnData = '';

    $.ajax({
        url:map.url,
        type:'POST',
        data:data,
        dataType:"json",
        async:false,
        success:function(data){
            returnData = data;
        },
        error:function(reject){
            returnData = reject;
        }
    })

    return returnData;
}

// 아작스 겟 통신
// map : {'url':url, 'data'::data}
function ajaxGet(map) {

}

// 필수값 체크
// id = 태그 아이디
function sggNullChk(id) {
	for (let i = 0; i < $('#' + id).find('[required=Y]').length; i++) {
		var val = $($('#' + id).find('[required=Y]').get(i)).val();
		var nm = $($('#' + id).find('[required=Y]').get(i)).attr('placeholder');
		if (val.trim() == '') {
			if (nm != '') {
				alert(nm + ' 을(를) 입력해주세요.');
				$($('#' + id).find('[required=Y]').get(i)).focus();
			}

			return false;
		}
	}

	return true;
}

// 값 바인딩
// id = 태그 아이디
// map = 바인딩할 데이터 맵
function sggBindMap(map) {
    var keys = Object.keys(map);
    var vals = Object.values(map);

    for (let i = 0; i < keys.length; i++) {
        $('#' + keys[i]).val(vals[i]);
    }
}

// 정규식 변환
// type = 정규식 방식
// val = 변환할 값
function sggReg(type, val) {
    // 전화번호
    if (type == 'tel') {
        var phoneRule = /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g;
        var tel = val.replace(phoneRule, '$1-$2-$3');
        return tel;
    }
}

// 정규식 체크
// type = 정규식 방식
// val = 체크할 값
function sggRegChk(type, val) {
    // 전화번호
    if (type == 'tel') {
        var phoneRule = /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g;
        return phoneRule.test(val);
    }

    // 이메일
    if (type == 'email') {
        var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return emailRule.test(val);
    }

    // 비밀번호 영문 숫자 특수기호 조합 8자리 이상
    if (type == 'pw') {
		var pwRule = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
		return pwRule.test(val);
	}

	// 아이디 영문 숫자 조합 8자리 이상
	if (type == 'id') {
		var idRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/;
		return idRule.test(val)
	}

    // type이 잘못 되었을 시
    return false;
}

// 필수값 체크
// id = 태그 아이디
function sggRegChkAttr(id) {
	for (let i = 0; i < $('#' + id).find('[regChk]').length; i++) {
		var val = $($('#' + id).find('[regChk]').get(i)).val();
		var type = $($('#' + id).find('[regChk]').get(i)).attr('regChk');
		var nm = $($('#' + id).find('[regChk]').get(i)).attr('placeholder');

		// 전화번호
	    if (type == 'tel') {
	        var phoneRule = /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g;
	        if (!phoneRule.test(val)) {
				if (nm != '') {
					alert(nm + ' 을(를) 올바르게 입력해주세요.');
					$($('#' + id).find('[regChk]').get(i)).focus();
				}
		        return false;
			}
	    }

	    // 이메일
	    if (type == 'email') {
	        var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	        if (!emailRule.test(val)) {
				if (nm != '') {
					alert(nm + ' 을(를) 올바르게 입력해주세요.');
					$($('#' + id).find('[regChk]').get(i)).focus();
				}
		        return false;
			}
	    }

	    // 비밀번호 영문 숫자 특수기호 조합 8자리 이상
	    if (type == 'pw') {
			var pwRule = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
			if (!pwRule.test(val)) {
				if (nm != '') {
					alert(nm + ' 을(를) 올바르게 입력해주세요.');
					$($('#' + id).find('[regChk]').get(i)).focus();
				}
		        return false;
			}
		}

		// 아이디 영문 숫자 조합 8자리 이상
		if (type == 'id') {
			var idRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/;
			if (!idRule.test(val)) {
				if (nm != '') {
					alert(nm + ' 을(를) 올바르게 입력해주세요.');
					$($('#' + id).find('[regChk]').get(i)).focus();
				}
		        return false;
			}
		}
	}

	return true;
}