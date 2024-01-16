// obj : {'url':url, 'data':data}
// 아작스 포스트 통신
function ajaxPost(obj) {
    var dataMap = obj.data;

    var jsonData = JSON.stringify(dataMap);

    var returnData = '';

    $.ajax({
        url:obj.url,
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
    // 필수 설정을 준 태그들
	for (let i = 0; i < $('#' + id).find('[required=Y]').length; i++) {
	    // 인풋 타입
		var type = $($('#' + id).find('[required=Y]').get(i)).attr('type');
		// 값
		var val = $($('#' + id).find('[required=Y]').get(i)).val();
		// 태그아이디
		var tagId = $($('#' + id).find('[required=Y]').get(i)).attr('id');
		// 알림 이름 (라벨명)
		var nm = $('label[for="' + tagId + '"]').text();

		if (type == 'radio') {
		    // 라디오는 name으로 관리
            var tagNm = $($('#' + id).find('[required=Y]').get(i)).attr('name');
            // 체크된 라디오가 있는지 확인
            var radioChk = $('input:radio[name="' + tagNm + '"]:checked').length;
            // 라디오는 legend 태그의 글자로
            nm = $('legend[name="' + tagNm + '"]').text();

            if (radioChk == 0) {
                alert(nm + ' 을(를) 선택해주세요.');
                $($('#' + id).find('[required=Y]').get(i)).focus();

                return false;
            }
		} else {
            if (val.trim() == '') {
                alert(nm + ' 을(를) 입력해주세요.');
                $($('#' + id).find('[required=Y]').get(i)).focus();

                return false;
            }
		}
	}

	return true;
}

// 값 바인딩
// id = 태그 아이디
// obj = 바인딩할 데이터 맵
function sggBindMap(obj) {
    for (let key in obj) {
        var k = `${key}`;
        var v = `${obj[key]}`;

        if ($('#' + k).length > 0) {
            var type = $('#' + k).prop('tagName');
            if (type == 'INPUT' || type == 'TEXTAREA') {
                $('#' + k).val(v);
            } else {
                $('#' + k).html(v);
            }
        } else if ($('input[name=' + k + ']').length > 0) {
            $('input:radio[name="' + k + '"]:input[value="' + v + '"]').attr("checked", true);
        }
    }
}

// 값을 맵에 넣어주기
function sggDataToMap(obj) {
    var map = new Map();

    for (let key in obj) {
        var k = `${key}`;
        var v = `${obj[key]}`;
        if (`${obj[key]}` != '') {
            map.set(k, v);
        } else {
            if ($('#' + k).length > 0) {
                var type = $('#' + k).prop('tagName');
                if (type == 'INPUT' || type == 'TEXTAREA') {
                    var vv = $('#' + k).val();
                    vv = vv.trim();
                    map.set(key, vv);
                } else {
                    var vv = $('#' + k).text();
                    vv = vv.trim();
                    map.set(key, vv);
                }
            } else if ($('input[name=' + k + ']').length > 0) {
                var vv = $('input[name=' + k + ']').val();
                vv = vv.trim();
                map.set(k, vv);
            }
        }
    }

    map = Object.fromEntries(map);

    return map;
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
		var tagId = $($('#' + id).find('[regChk]').get(i)).attr('id');
		var nm = $('label[for="' + tagId + '"]').text();

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