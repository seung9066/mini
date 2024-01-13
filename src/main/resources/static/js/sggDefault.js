// map : {'url':url, 'data'::data}
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

// 정규식 변환
// type = 정규식 방식
// val = 변환할 값
function regSgg(type, val) {
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
function regSggChk(type, val) {
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

    // type이 잘못 되었을 시
    return false;
}