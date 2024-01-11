$(document).ready(function(){
    // 소개 목록
    drawPrjLine();

    // 소개 내용
    drawPre();
});

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
    var map = {'url' : '/menu/getPre'
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
    var map = {'url' : '/menu/getLine'
                , 'data':{'userAuth' : '999'}};

    var data = ajaxPost(map);

    return data;
}