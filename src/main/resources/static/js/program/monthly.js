$(document).ready(function(){
    // 초기화
    document.getElementById("btnReset").addEventListener("click", function() {
        doReset();
    });

    // 변환
    document.getElementById("btnTrans").addEventListener("click", function() {
        doChange();
    });

    // 변환
    document.getElementById("frmWrite").addEventListener("dblclick", function() {
        doChange();
    });
});

function doReset() {
    document.getElementById("frmWrite").value = "";
    document.getElementById("chg0").value = "";
    document.getElementById("chg1").value = "";
    document.getElementById("chg2").value = "";
    document.getElementById("chg3").value = "";
}

function doChange() {
    var frmWrite = document.getElementById("frmWrite");
    var txt = frmWrite.value;

    if (txt != "") {
        // 메뉴명만 가져오기
        txt = changeDash(txt);

        // 설계, 분석, 구현, 시험 나누기
        var txtList = changeGb(txt);

        // 내용 합쳐주기
        changeFinal(txtList);
    }
}

// 메뉴명만 가져오기
function changeDash(txt) {
    var txtList = txt.split("\n");
    var returnTxt = "";

    for (let i = 0; i < txtList.length; i++) {
        if (txtList[i].indexOf("1.") > -1 || txtList[i].indexOf("2.") > -1 || txtList[i].indexOf("3.") > -1 || txtList[i].indexOf("4.") > -1) {
            returnTxt += txtList[i];
            returnTxt += "\n";
        } else if (txtList[i].indexOf("-") > -1 && returnTxt != "") {
            returnTxt += txtList[i];
            returnTxt += "\n";
        }
    }

    return returnTxt;
}

// 설계, 분석, 구현, 시험 나누기
function changeGb(txt) {
    var a = txt.slice(txt.indexOf("  1."), txt.indexOf("  2."));
    var b = txt.slice(txt.indexOf("  2."), txt.indexOf("  3."));
    var c = txt.slice(txt.indexOf("  3."), txt.indexOf("  4."));
    var d = txt.slice(txt.indexOf("  4."));

    var txtList = [a, b, c, d];

    return txtList;
}

// 같은 값 제거하며 내용 추가
function changeFinal(txtList) {
    for (let i = 0; i < 4; i++) {
        // 기존값
        var chgTa = document.getElementById("chg" + i);
        var chgTaTxt = chgTa.value;
        var chgTaList = chgTaTxt.split("\n");

        // 추가값
        var txtList2 = txtList[i].split("\n");

        var newTxt = "";

        for (let k = 0; k < chgTaList.length; k++) {
            for (let j = 0; j < txtList2.length; j++) {
                if (chgTaList[k].replaceAll(" ", "") == txtList2[j].replaceAll(" ", "")) {
                    txtList2.splice(j, 1);
                    j--;
                }
            }
        }

        for (let j = 0; j < txtList2.length; j++) {
            newTxt += txtList2[j];
            newTxt += "\n";
        }

        chgTa.value += newTxt;
    }
}