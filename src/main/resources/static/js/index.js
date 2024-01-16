$(document).ready(function(){
    // 소개 목록
    drawPrjLine();

    // 소개 내용
    drawPre();

    // 확장자별 파일 수
    drawFile();

    // 주소 가져오기
    drawSnsAddr();

    // 신규회원 체크


});

// 신규권한 체크
function chkAuth() {
    alert('마이페이지 내 정보 수정에서 추가 정보를 입력하여 주세요.');
}

// 로그아웃
function logout(path) {
	var map = {'url' : path
                , 'data':{}};

    var data = ajaxPost(map);

    if (data) {
		location.href = '/';
	}
}

// 주소 그려주기
function drawSnsAddr() {
    var sns = getSnsAddr();

    $('#contactTel').prop({href: 'tel:' + sns.telNo});
    $('#contactSms').prop({href: 'sms:' + sns.telNo});
    $('#contactGithub').prop({href: sns.github});
    $('#contactKakao').prop({href: sns.kakao});
    $('#infoCity').html(sns.city);
    $('#infoEmail').html(sns.email);

    // 전화번호 정규식
    var telNo = sggReg('tel', sns.telNo);
    $('#infoTelNo').html(telNo);
}

// 주소 가져오기
function getSnsAddr() {
    var map = {'url' : '/index/getContact'
                , 'data':{}};

    var data = ajaxPost(map);

    return data;
}

// 확장자별 파일 수 그려주기
function drawFile() {
    // 파일 수
    var fileCnt = getFile();
    var keys = Object.keys(fileCnt);
    var vals = Object.values(fileCnt);

    // #fileSkill에 담아줄 내용
    var html = '';

    var max = 100;
    for (let i = 0; i < vals.length; i++) {
        if (max < vals[i]) {
            max = vals[i];
        }
    }

    for (let i = 0; i < keys.length; i++) {
        html += '<div class="progress">';
        html += '<span class="skill">' + keys[i] + ' <i class="val">' + vals[i] + '</i></span>';
        html += '<div class="progress-bar-wrap">';
        html += '<div class="progress-bar" role="progressbar" aria-valuenow="' + vals[i] + '" aria-valuemin="0" aria-valuemax="' + max + '"></div>';
        html += '</div>';
        html += '</div>';
    };

    $('#fileSkill').append(html);
}

// 확장자별 파일 수 가져오기
function getFile() {
    var map = {'url' : '/index/getCntFile'
                , 'data':{'userAuth' : '999'}};

    var data = ajaxPost(map);

    return data;
}

// 소개내용 그려주기
function drawPre() {
    // 소개내용
    var pre = getPre();

    // #pre에 담아줄 내용
    var html = '';

    for (let i = 0; i < pre.length; i++) {
        html += '<h4>' + pre[i].preHead + '</h4>';
        html += '<br>';
        html += '<p>' + pre[i].preDtl + '</p>';
    }

    $('#pre').append(html);
}

// 소개내용 가져오기
function getPre() {
    var map = {'url' : '/index/getPre'
                , 'data':{'userAuth' : '999'}};

    var data = ajaxPost(map);

    return data;
}

// 소개 목록 그려주기
function drawPrjLine() {
    // 소개 목록
    var line = getPrjLine();

    // #prjLine에 담아줄 내용
    var html = '';

    for (let i = 0; i < line.length; i++) {
        html += '<li><i class="ri-check-double-line"></i>' + line[i].contentDtl + '</li>'
    }

    $('#prjLine').append(html);
}

// 소개 목록 가져오기
function getPrjLine() {
    var map = {'url' : '/index/getLine'
                , 'data':{'userAuth' : '999'}};

    var data = ajaxPost(map);

    return data;
}