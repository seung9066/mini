$(document).ready(function(){
    // 내용
    getDtl();
});

// 내용
function getDtl() {
    var map = {url : '/learn/getDtl'
                , data : {codeNo : codeNo}};

    var data = ajaxPost(map);

    $('#title').text(data[0].codeTitle);

    // 각 div 생성 후 내부에 적어주기
    for (let i = 0; i < data.length; i++) {
        var id = data[i].divNo;

        var html = '<div id="' + id + '"></div>';
        $('#frmNewAccount').append(html);
        $('#' + id).html(data[i].divCode);
    }
}