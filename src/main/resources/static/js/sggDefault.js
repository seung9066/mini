// obj : {'url':url, 'data':{data}, frmId : '폼태그아이디'}
// 아작스 포스트 통신
function ajaxPost(obj) {
    if (obj.frmId) {
        var frmData = new FormData(document.getElementById(obj.frmId));
        var data = {};
        frmData.forEach(function(value, key){
            obj.data[key] = value;
        });
    }
    var dataMap = obj.data;

    var jsonData = JSON.stringify(dataMap);

    var returnData = '';

//    var xhr = new XMLHttpRequest();
//    xhr.open('POST', obj.url, false);
//
//    xhr.setRequestHeader('Content-Type', 'application/json'); // 설정한 Content-Type
//
//    xhr.onreadystatechange = function() {
//        if (xhr.readyState == 4) {
//            if (xhr.status == 200) {
//                returnData = JSON.parse(xhr.responseText);
//            } else {
//                console.error('Vanilla JavaScript AJAX Error:', xhr.status);
//            }
//        }
//    };
//
//    xhr.send(jsonData);

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
    var frmData = new FormData(document.getElementById(map.frmId));
    var data = new URLSearchParams(frmData).toString();

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

// 값 비워주기
// element = document.getElementById(); 아이디가 없는 태그도 있어서 element로 받음
function sggToNull(element) {
    if (element) {
        var childElement = element.children;

        for (let i = 0; i < childElement.length; i++) {
            // 인풋 타입
            var type = childElement[i].tagName;
            // 태그아이디
            var tagId = childElement[i].getAttribute('id');
            var tagNm = childElement[i].getAttribute('name');

            if (type == 'INPUT' || type == 'TEXTAREA' || type == 'SELECT') {
                var inputType = childElement[i].getAttribute('type')
                if (inputType != 'button') {
                    if (type == 'SELECT') {
                        childElement[i].selectedIndex = 0;
                    } else if (inputType == 'radio') {
                        var radioChk = document.querySelector('input[type="radio"][name="' + tagNm + '"]:checked');
                        if (radioChk) {
                            radioChk.checked = false;
                        }
                    } else {
                        childElement[i].value = '';
                    }
                }
            } else {
                sggToNull(childElement[i]);
            }
        }
    }
}

// 필수값 체크
// id = 태그 아이디
function sggNullChk(id) {
    var element = document.getElementById(id).querySelectorAll('[required=Y]');
    if (element) {
        // 필수 설정을 준 태그들
        for (let i = 0; i < element.length; i++) {
            // 태그
            var tagNm = element[i].tagName;
            // 인풋 타입
            var type = element[i].getAttribute('type');
            // 값
            var val = element[i].value;
            // 태그아이디
            var tagId = element[i].getAttribute('id');
            var placeholder = element[i].placeholder;
            var nm = '';
            // 알림 이름 (라벨명)
            var label = document.querySelector('label[for="' + tagId + '"]');
            if (label) {
                nm = label.textContent;
            } else if (placeholder) {
                nm = placeholder
            }

            var msg = '';
            if (type == 'radio' || tagNm == 'SELECT') {
                msg = '선택';
            } else {
                msg = '입력';
            }

            if (type == 'radio') {
                // 라디오는 name으로 관리
                var tagNm = element[i].getAttribute('name');
                // 체크된 라디오가 있는지 확인
                var radioChk = document.querySelector('input[type="radio"][name="' + tagNm + '"]:checked').length;
                // 라디오는 legend 태그의 글자로
                nm = document.querySelector('legend[name="' + tagNm + '"]').textContent;

                if (radioChk == 0) {
                    if (nm != '') {
                        alert(nm + ' 을(를) ' + msg + '해주세요.');
                    } else {
                        alert('값을 ' + msg + '해주세요.');
                    }
                    element[i].focus();

                    return false;
                }
            } else {
                if (val.trim() == '') {
                    if (nm != '') {
                        alert(nm + ' 을(를) ' + msg + '해주세요.');
                    } else {
                        alert('값을 ' + msg + '해주세요.');
                    }
                    element[i].focus();

                    return false;
                }
            }
        }
    }

	return true;
}

// 값 바인딩
// obj = 바인딩할 데이터 맵
function sggBindMap(obj) {
    for (let key in obj) {
        var k = `${key}`;
        var v = `${obj[key]}`;

        if (document.getElementById(k)) {
            var type = document.getElementById(k).tagName;
            if (type == 'INPUT' || type == 'TEXTAREA' || type == 'SELECT') {
                document.getElementById(k).value = v;
            } else {
                document.getElementById(k).innerText = v;
            }
        } else if (document.querySelectorAll('input[name="' + k + '"]').length > 0) {
            var radioElement = document.querySelector('input[type="radio"][name="' + k + '"][value="' + v + '"]');
            if (radioElement) {
                radioElement.checked = true;
            }
        }
    }
}

// 지정한 컬럼에 대한 id를 찾아서 그 값을 obj로 반환
// obj = {컬럼명 : '', 컬럼명 : ''}
function sggDataToMap(obj) {
    var map = new Map();

    for (let key in obj) {
        var k = `${key}`;
        var v = `${obj[key]}`;
        if (`${obj[key]}` != '') {
            map.set(k, v);
        } else {
            if (document.querySelectorAll('#' + k).length > 0) {
                var type = document.getElementById(k).tagName;
                if (type == 'INPUT' || type == 'TEXTAREA') {
                    var vv = document.getElementById(k).value;
                    vv = vv.trim();
                    map.set(key, vv);
                } else {
                    var vv = document.getElementById(k).textContent;
                    vv = vv.trim();
                    map.set(key, vv);
                }
            } else if (document.querySelectorAll('input[name="' + k + '"]').length > 0) {
                var vv = document.querySelector('input[name="' + k + '"]').value;
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

// 정규식 체크
// id = 상위 태그 아이디
function sggRegChkAttr(id) {
    var element = document.getElementById(id).querySelectorAll('[regChk]');
    if (element) {
        for (let i = 0; i < element.length; i++) {
            var val = element[i].value;
            var type = element[i].getAttribute('regChk');
            var tagId = element[i].getAttribute('id');
            var label = document.querySelector('label[for="' + tagId + '"]');
            var placeholder = element[i].placeholder;
            var nm = '';
            if (label) {
                nm = label.textContent;
            } else if (placeholder) {
                nm = placeholder;
            }

            // 전화번호
            if (type == 'tel') {
                var phoneRule = /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g;
                if (!phoneRule.test(val)) {
                    if (nm != '') {
                        alert(nm + ' 을(를) 올바르게 입력해주세요.');
                    }
                    element[i].focus();
                    return false;
                }
            }

            // 이메일
            if (type == 'email') {
                var emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
                if (!emailRule.test(val)) {
                    if (nm != '') {
                        alert(nm + ' 을(를) 올바르게 입력해주세요.');
                    }
                    element[i].focus();
                    return false;
                }
            }

            // 비밀번호 영문 숫자 특수기호 조합 8자리 이상
            if (type == 'pw') {
                var pwRule = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
                if (!pwRule.test(val)) {
                    if (nm != '') {
                        alert(nm + ' 을(를) 올바르게 입력해주세요.');
                    }
                    element[i].focus();
                    return false;
                }
            }

            // 아이디 영문 숫자 조합 8자리 이상
            if (type == 'id') {
                var idRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/;
                if (!idRule.test(val)) {
                    if (nm != '') {
                        alert(nm + ' 을(를) 올바르게 입력해주세요.');
                    }
                    element[i].focus();
                    return false;
                }
            }
        }
    }

	return true;
}

// 공통코드 조회
// map : {cdId : '', upCdId : '', exCode : [], id : ''}
function getCode(map) {
    var obj = {url : '/cmn/getCode'
                , data : map};

    var data = ajaxPost(obj);

    var html = '';

    for (let i = 0; i < data.length; i++) {
        html += '<option value="' + data[i].cdDtl + '">' + data[i].cdDtlName + '</option>';
    }

    var selectEle = document.getElementById(map.id);
    selectEle.insertAdjacentHTML('beforeend', html);
}

// 메뉴 이동
// path : 이동할 주소
function goPage(path) {
    document.getElementById('pagePath').value = path;
    document.getElementById('goPage').submit();
}

// 데이터 담은 메뉴 이동
// 폼태그에 데이터 담을 input 생성
function goPageMap(path, map) {
    document.getElementById('goPage').setAttribute('action', '/pageMap');

    var html = '';
    for (let key in map) {
        var k = `${key}`;
        var v = `${map[key]}`;

        html += '<input type="hidden" name="' + k + '" value="' + v + '">';
    }
    document.getElementById('pagePath').value = path;

    var goPageElement = document.getElementById('goPage');
    goPageElement.insertAdjacentHTML('beforeend', html);

    document.getElementById('goPage').submit();
}

// 문자열 길이기준 자르기
// str : 문자
// size : 자를 길이
function sggSplitLength(str, size) {
    let result = [];
    for (let i = 0; i < str.length; i += size) {
        result.push(str.substring(i, i + size));
    }
    return result;
}

// 이벤트 추가
// map(list) : id : '태그아이디', event : '태그이벤트', eventDtl : '이벤트 function'
function sggEvent(map) {
    for (let i = 0; i < map.length; i++) {
        var ele = document.getElementById(map[i].id);
        if (ele) {
            ele.addEventListener(map[i].event, function () {
                eval(map[i].eventDtl + '(ele)');
            });
        }
    }
}

// 공통 목록조회
// obj : {path : '쿼리', data : {}, frmId : '폼태그 아이디'}
function sggGetList(obj) {
    if (obj.frmId) {
        var frmData = new FormData(document.getElementById(obj.frmId));
        var data = {};
        frmData.forEach(function(value, key){
            obj.data[key] = value;
        });
    }

    var jsonData = JSON.stringify(obj);

    var returnData = '';

//    var xhr = new XMLHttpRequest();
//    xhr.open('POST', '/cmn/getList', false);
//
//    xhr.setRequestHeader('Content-Type', 'application/json'); // 설정한 Content-Type
//
//    xhr.onreadystatechange = function() {
//        if (xhr.readyState == 4) {
//            if (xhr.status == 200) {
//                returnData = JSON.parse(xhr.responseText);
//            } else {
//                console.error('Vanilla JavaScript AJAX Error:', xhr.status);
//            }
//        }
//    };
//
//    xhr.send(jsonData);

    $.ajax({
        url:'/cmn/getList',
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

// 공통 단건조회
// obj : {path : '쿼리', data : {}, frmId : '폼태그 아이디'}
function sggGetData(obj) {
    if (obj.frmId) {
        var frmData = new FormData(document.getElementById(obj.frmId));
        var data = {};
        frmData.forEach(function(value, key){
            obj.data[key] = value;
        });
    }

    var jsonData = JSON.stringify(obj);

    var returnData = '';

//    var xhr = new XMLHttpRequest();
//    xhr.open('POST', '/cmn/getData', false);
//
//    xhr.setRequestHeader('Content-Type', 'application/json'); // 설정한 Content-Type
//
//    xhr.onreadystatechange = function() {
//        if (xhr.readyState == 4) {
//            if (xhr.status == 200) {
//                returnData = JSON.parse(xhr.responseText);
//            } else {
//                console.error('Vanilla JavaScript AJAX Error:', xhr.status);
//            }
//        }
//    };
//
//    xhr.send(jsonData);

    $.ajax({
        url:'/cmn/getData',
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

// 공통 업데이트
// obj : {path : '쿼리', data : {}, frmId : '폼태그 아이디'}
function sggUpdate(obj) {
    if (obj.frmId) {
        var frmData = new FormData(document.getElementById(obj.frmId));
        var data = {};
        frmData.forEach(function(value, key){
            obj.data[key] = value;
        });
    }

    var jsonData = JSON.stringify(obj);

    var returnData = '';

//    var xhr = new XMLHttpRequest();
//    xhr.open('POST', '/cmn/upData', false);
//
//    xhr.setRequestHeader('Content-Type', 'application/json'); // 설정한 Content-Type
//
//    xhr.onreadystatechange = function() {
//        if (xhr.readyState == 4) {
//            if (xhr.status == 200) {
//                returnData = JSON.parse(xhr.responseText);
//            } else {
//                console.error('Vanilla JavaScript AJAX Error:', xhr.status);
//            }
//        }
//    };
//
//    xhr.send(jsonData);

    $.ajax({
        url:'/cmn/upData',
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