var grid1 =
{
    // 그리드를 그려줄 폼태그 아이디
    frmId : 'frm'
    // 그리드 데이터(미리 값을 담아주거나 ajax통신을 통해 받아온 데이터)
    , data : []
    // ajax url
    , ajaxUrl : '/learn/getList'
    // ajax GET, POST
    , ajaxType : 'POST'
    // 테이블 컬럼 {컬럼명, 한글명}
    , th : {'codeNo' : '코드번호', 'codeTypeCd' : '타입', 'codeTitle' : '제목'}
    // 그리드 row 수 값이 없으면 모두 다 출력
    , row : 10
    // ajax 버튼용 총 게시글 수 url
    , ajaxBtnUrl : '/learn/getListCnt'
    // 총 게시글 수
    , totalCnt : 0
    // 버튼 수
    , btn : 10
    // tr onclick function명
    , tonC : ''
    // tr onclick시 데이터 담아줄 배열
    , trData : {}
    // callback function명
    , callback : ''
    // table css
    , tbCss : {'width' : '100%;', 'text-align' : 'center'}
    // th css 하나의 {}만 입력시 모든 th에 적용, grid.th.lengh 만큼 적으면 각각 적용
    , thCss: [{'width':'20%'}, {'width':'20%'}, {'width':'60%'}]
    // 첫컬럼 타입 (checkbox, radio, ''이면 아무것도 없는거)
    , tdType : ''
    // 첫컬럼에 따른 row 데이터 담을 배열
    , tdTypeData: []
}

var sggGridList = [grid1]

// 클릭 시 색상 hover 방지용
var sggGridTr = 0;

// 클릭된 버튼 표시용
var sggPgNum = 0;

$(document).ready(function(){
    sggGridRun(1, grid1.frmId);
});

function sggGridRun(pageNum, gridFrmId) {
    // 새로 그렸으니 tr onclick 색상용 변수 비워주기
    sggGridTr = 0;
    sggPgNum = pageNum;

    var grid = sggGridFnd(gridFrmId);

    // ----- 검색조건, 페이지번호 데이터 -----
    var data = sggGridFrmData(pageNum, grid);

    // ajaxUrl이 있으면 데이터 받아오기
    if (grid.ajaxUrl) {
        grid.data = sggGridAjax(data, grid.ajaxUrl, grid.ajaxType);
    }

    // ----- table, thead, tbody 그리기 -----
    sggGridDraw(grid);

    // ajaxBtnUrl이 있으면 총 건수 받아오기
    if (grid.ajaxBtnUrl) {
        grid.totalCnt = sggGridAjax(data, grid.ajaxBtnUrl, grid.ajaxType);
        // tfoot 그리기
        sggGridDrawBtn(pageNum, grid);
    }

    // css 적용
    sggGridCss(grid);
    // 이벤트, 함수
    sggGridFnc(grid);
}

// 어떤 테이블인지 찾기
function sggGridFnd(gridFrmId) {
    // grid 배열 인택스 용, 어떤 테이블에 그려줄 것인지 체크 용
    var gridCount = 0;

    // 어떤 테이블에 대한 그리드, 페이징버튼인지 파악
    for (let i = 0; i < sggGridList.length; i++) {
        if (gridFrmId == sggGridList[i].frmId) {
            gridCount = i;
        }
    }

    // 어떤 테이블인지 확정
    var grid = sggGridList[gridCount];

    return grid;
}

// 폼태그 데이터 받아오기
function sggGridFrmData(pageNum, grid) {
    // 폼태그 내부 검색조건 데이터 ajax용으로 바꿔주기
    var frmData = new FormData(document.getElementById(grid.frmId));
    var data = new URLSearchParams(frmData).toString();
    // 페이징을 위한 pageNum, row
    data += '&page=' + pageNum;
    // row가 없으면 전체 출력
    if (grid.row) {
        data += '&row=' + grid.row;
    }

    return data;
}

// ajax 통신 데이터 받아오기
// data : 검색조건, 페이지번호
// url : 주소
// type : GET, POST
function sggGridAjax(data, url, type) {
    var returnData;
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: 'json',
        async: false,
        success: function (result) {
            returnData = result;
        }
    });
    return returnData;
}

// 테이블 그리기
// data : 그리드에 담을 데이터
// frmId : 그리드 그려줄 폼태그 아이디
// tdType : checkbox, radio
// th : [{디비에서가져온컬럼 : 컬럼보여줄명}]
function sggGridDraw(grid) {

    // 테이블 그리기
    sggGridTbl(grid);
    // thead 그리기
    sggGridThead(grid);
    // tbody 그리기
    sggGridTbody(grid);

}

// 테이블 그리기
function sggGridTbl(grid) {
    // ----- 테이블 만들기 -----
    var tableEle = document.getElementById(grid.frmId + '_tbl');
    if (!tableEle) {
        var html = '<table id="' + grid.frmId + '_tbl"></table>';
        var frmEle = document.getElementById(grid.frmId);
        frmEle.insertAdjacentHTML('beforeend', html);
    }
}

// 테이블 thead 양식 그리기
function sggGridThead(grid) {
    // 지우기
    var theadEle = document.getElementById(grid.frmId + '_thead');
    if (theadEle) {
        theadEle.parentNode.removeChild(theadEle);
    }

    // 그리기
    var html = '<thead id="' + grid.frmId + '_thead' + '"></thead>';
    var tableEle = document.getElementById(grid.frmId + '_tbl');
    tableEle.insertAdjacentHTML('beforeend', html);

    // thead 내용 그리기
    sggGridTheadData(grid);
}

// 테이블 thead 내용 그리기
function sggGridTheadData(grid) {
    var html = '<tr>';
    // 체크박스 생성여부
    if (grid.tdType == 'checkbox') {
        html += '<th><input type="checkbox" id="' + grid.frmId + '_chkA" style="width: 10px;"></th>';
    }

    // radio는 전체 선택이 없어서 컬럼만 생성
    if (grid.tdType == 'radio') {
        html += '<th></th>';
    }

    // 컬럼 그려주기
    var obj = grid.th;
    for (let key in obj) {
        var k = `${key}`;
        var v = `${obj[key]}`;

        html += '<th>' + v + '</th>';
    }
    html += '</tr>';

    var theadEle = document.getElementById(grid.frmId + '_thead');
    theadEle.insertAdjacentHTML('beforeend', html);
}

// 테이블 tbody 양식 그리기
function sggGridTbody(grid) {
    // 지우기
    var tbodyEle = document.getElementById(grid.frmId + '_tbody');
    if (tbodyEle) {
        tbodyEle.parentNode.removeChild(tbodyEle);
    }

    // 그리기
    var html = '<tbody id="' + grid.frmId + '_tbody' + '"></tbody>';
    var tableEle = document.getElementById(grid.frmId + '_tbl');
    tableEle.insertAdjacentHTML('beforeend', html);

    // tbody 내용 그리기
    sggGridTbodyData(grid);
}

// 테이블 tbody 내용 그리기
function sggGridTbodyData(grid) {
    var html = '';

    var data = grid.data;
    var thLength = Object.keys(grid.th).length;

    // 버튼 생성을 위한 url을 입력하지 않으면 모든 row 출력
    if (grid.ajaxBtnUrl == '') {
        grid.row = data.length;
    }

    // 데이터가 없을 때
    if (data.length == 0) {
        if (grid.tdType == 'checkbox' || grid.tdType == 'radio') {
            html += '<tr><td colspan="' + (grid.th.length + 1) + '">조회된 데이터가 없습니다</td></tr>';
        } else {
            html += '<tr><td colspan="' + grid.th.length + '">조회된 데이터가 없습니다</td></tr>';
        }

        // 빈줄 row 수만큼 등록
        for (let i = 0; i < (grid.row - 1); i++) {
            if (grid.tdType == 'checkbox' || grid.tdType == 'radio') {
                html += '<tr><td colspan="' + (grid.th.length + 1) + '">&nbsp</td></tr>';
            } else {
                html += '<tr><td colspan="' + grid.th.length + '">&nbsp</td></tr>';
            }
        }
    } else {
        for (let i = 0; i < grid.row; i++) {
            // row 보다 데이터가 적으면 빈줄 해주기 위해
            if (i < data.length) {
                // tr onclick 함수 있을 때 없을 때
                if (grid.tonC != '') {
                    html += '<tr id="' + grid.frmId + '_' + i + '" onclick="' + grid.tonC + '(this);">';
                } else {
                    html += '<tr id="' + grid.frmId + '_' + i + '">';
                }

                for (let k = 0; k < thLength; k++) {
                    if (k == 0) {
                        // chkBox 생성여부
                        if (grid.tdType == 'checkbox') {
                            // tr onclick 막기
                            html += '<td id="' + grid.frmId + '_chk' + i + '" onclick="event.cancelBubble=true"><input type="checkbox" name="' + grid.frmId + '_chk"></td>';
                        }
                        // radio 생성여부
                        if (grid.tdType == 'radio') {
                            // tr onclick 막기
                            html += '<td id="' + grid.frmId + '_radio' + i + '" onclick="event.cancelBubble=true"><input type="radio" name="' + grid.frmId + '_radio"></td>';
                        }
                    }
                    html += '<td></td>';
                }
                html += '</tr>';
            } else {
                if (grid.tdType == 'checkbox' || grid.tdType == 'radio') {
                    html += '<tr><td colspan="' + (thLength + 1) + '">&nbsp</td></tr>';
                } else {
                    html += '<tr><td colspan="' + thLength + '">&nbsp</td></tr>';
                }
            }
        }
    }

    // 그리기
    var tbodyEle = document.getElementById(grid.frmId + '_tbody');
    tbodyEle.insertAdjacentHTML('beforeend', html);

    // 값 그리기
    for (let i = 0; i < data.length; i++) {
        // td idx
        var idx = 0;
        if (grid.tdType == 'checkbox' || grid.tdType == 'radio') {
            idx = 1;
        }
        var tr = document.getElementById(grid.frmId + '_tbody').getElementsByTagName('tr')[i];
        // 넣을 값
        var obj = data[i];
        // thead 컬럼
        var th = grid.th;
        for (let key in obj) {
            var k = `${key}`;
            var v = `${obj[key]}`;

            for (let key2 in th) {
                var thk = `${key2}`;
                var thv = `${th[key2]}`;

                // data 컬럼과 thead 컬럼이 같으면 값 넣어주기
                if (k == thk) {
                    tr.getElementsByTagName('td')[idx].innerText = v;
                    idx++;
                }

            }
        }
    }

}

// 버튼 그리기
function sggGridDrawBtn(pageNum, grid) {
    sggGridTFoot(pageNum, grid);
}

// 버튼 양식 그리기
function sggGridTFoot(pageNum, grid) {
    // 지우기
    var tfootEle = document.getElementById(grid.frmId + '_tfoot');
    if (tfootEle) {
        tfootEle.parentNode.removeChild(tfootEle);
    }

    // 그리기
    var html = '<tfoot id="' + grid.frmId + '_tfoot' + '"></tfoot>';
    var tableEle = document.getElementById(grid.frmId + '_tbl');
    tableEle.insertAdjacentHTML('beforeend', html);

    sggGridTFootData(pageNum, grid);
}

// 버튼 데이터 그리기
function sggGridTFootData(pageNum, grid) {
    var html = '<tr>';
    var thLength = Object.keys(grid.th).length;

    // 체크박스, 라디오 옵션에 따라 td 크기 바꿔주기
    if (grid.tdType == 'checkbox' || grid.tdType == 'radio') {
        html += '<td colspan="' + (thLength + 1) + '">';
    } else {
        html += '<td colspan="' + thLength + '">';
    }

    // 총 버튼 수
    var totalB = Math.ceil(grid.totalCnt / grid.row);console

    // 시작 버튼이 1 보다 작은 경우 방지
    if (totalB < 1) {
        totalB = 1;
    }

    // 총 버튼 수 보다 큰 수 입력 방지
    if (pageNum > totalB) {
        pageNum = totalB;
    }

    // 보여줄 시작 버튼
    var startB = Math.max((pageNum - (pageNum % grid.btn) + 1), 1);
    // 보여줄 끝 버튼
    var endB = Math.min(pageNum + (grid.btn - (pageNum % grid.btn)), totalB);

    // 입력된 수가 보여줄 끝 버튼과 같을 때
    if (pageNum % grid.btn == 0) {
        startB = Math.max(pageNum - grid.btn + 1, 1);
        endB = Math.min(pageNum, totalB);
    }

    html += '<button onclick="sggGridRun(1, ' + grid.frmId + ')"><<</button>';

    if (startB == 1) {
        html += '<button onclick="sggGridRun(' + startB + ', ' + grid.frmId + ')"><</button>';
    } else {
        html += '<button onclick="sggGridRun(' + (startB - 1) + ', ' + grid.frmId + ')"><</button>';
    }

    for (let i = startB; i < endB + 1; i++) {
        html += '<button onclick="sggGridRun(' + i + ', ' + grid.frmId + ')">' + i + '</button>';
    }

    if (endB == totalB) {
        html += '<button onclick="sggGridRun(' + endB + ', ' + grid.frmId + ')">></button>';
    } else {
        html += '<button onclick="sggGridRun(' + (endB + 1) + ', ' + grid.frmId + ')">></button>';
    }

    html += '<button onclick="sggGridRun(' + totalB + ', ' + grid.frmId + ')">>></button>';

    html += '</td></tr>';

    var tfootEle = document.getElementById(grid.frmId + '_tfoot');
    tfootEle.insertAdjacentHTML('beforeend', html);
}

// css
function sggGridCss(grid) {
    // 테이블 css
    sggGridCssTbl(grid);
    // th css
    sggGridCssTh(grid);
    // hover
    sggGridCssHover(grid);
    // 클릭 hover 방지
    sggGridClickHover(grid);

    // 버튼 css
    sggGridBtnCss(grid);
}

// 테이블 css
function sggGridCssTbl(grid) {
    // ----- 테이블 css -----
    var tbl = document.getElementById(grid.frmId + '_tbl');

    // 기본 css
    if (tbl) {
        tbl.style.width = '100%';
        tbl.style.textAlign = 'center';
        tbl.style.height = ((grid.row * 30) + 60) + 'px';
        tbl.style.borderSpacing = '0px';
    }

    // 추가 css
    if (grid.tbCss && tbl) {
        var obj = grid.tbCss;
        for (let key in obj) {
            var k = `${key}`;
            var v = `${obj[key]}`;

            tbl.style[k] = v;
        }
    }
}

// th css
function sggGridCssTh(grid) {
    // ----- th css -----
    var thead = document.getElementById(grid.frmId + '_thead');

    if (thead) {
        var th = thead.getElementsByTagName('th');

        // 기본 css
        if (th) {
            for (let i = 0; i < th.length; i++) {
                th[i].style.backgroundColor = '#B8D7FF';
                th[i].style.height = '30px';
            }
        }

        // 추가 css
        if (grid.thCss && th) {
            var thCssLenght = Object.keys(grid.thCss).length;
            // 추가 css 하나만 적으면 그걸로 통일
            if (thCssLenght == 1) {
                var obj = grid.thCss[0];
                for (let key in obj) {
                    var k = `${key}`;
                    var v = `${obj[key]}`;

                    th[i].style[k] = v;
                }
            } else if (thCssLenght > 0) {
                var idx = 0;
                // checkbox, radio 시 th 배열 한 인덱스 앞으로
                if (grid.tdType == 'checkbox' || grid.tdType == 'radio') {
                    idx = 1;
                }
                for (let i = 0; i < thCssLenght; i++) {
                    var obj = grid.thCss[i];
                    for (let key in obj) {
                        var k = `${key}`;
                        var v = `${obj[key]}`;

                        th[idx].style[k] = v;
                        idx++;
                    }
                }
            }

            if (grid.tdType == 'checkbox' || grid.tdType == 'radio') {
                th[0].style.width = '30px';
            }
        }
    }
}

// hover
function sggGridCssHover(grid) {
    var gridTbl = document.getElementById(grid.frmId + '_tbl');

    if (gridTbl) {
        var tbodyRows = gridTbl.querySelectorAll('tbody tr');

        tbodyRows.forEach(function (row) {
            row.addEventListener('mouseover', function () {
                this.style.backgroundColor = '#E0EBFF';
                this.style.transition = 'all 0.15s';
            });

            row.addEventListener('mouseout', function () {
                // 클릭된 tr이 아닌 tr만
                if (sggGridTr !== this.id) {
                    this.style.backgroundColor = 'white';
                }
                // 값이 없는 빈 tr
                if (!this.id) {
                    this.style.backgroundColor = 'white';
                }
            });
        });
    }
}

// 클릭 hover 방지
function sggGridClickHover(grid) {
    var gridTbody = document.getElementById(grid.frmId + '_tbody');

    if (gridTbody) {
        var gridTrs = gridTbody.querySelectorAll('tr');

        if (gridTrs) {
            gridTrs.forEach(function (tr) {
                tr.addEventListener('click', function () {
                    if (sggGridTr == 0) {
                        // 처음클릭
                        sggGridTr = this.id;
                        this.style.backgroundColor = '#E0EBFF';
                    } else if (sggGridTr == this.id) {
                        // 재클릭
                        this.style.backgroundColor = 'white';
                        sggGridTr = 0;
                    } else {
                        // 다른거 클릭
                        var beForeTr = document.getElementById(sggGridTr);
                        beForeTr.style.backgroundColor = 'white';
                        sggGridTr = this.id;
                        this.style.backgroundColor = '#E0EBFF';
                    }
                });
            });
        }
    }
}

// 페이징 버튼 css
function sggGridBtnCss(grid) {
    var gridTfoot = document.getElementById(grid.frmId + '_tfoot');

    if (gridTfoot) {
        var btns = gridTfoot.querySelectorAll('button');

        if (btns) {
            btns.forEach(function (btn) {
                btn.style.border = 'none';
                btn.style.width = '25px';
                btn.style.height = '25px';
                btn.style.marginRight = '2px';
                btn.style.backgroundColor = '#CCE1FF';

                btn.addEventListener('mouseover', function () {
                    this.style.opacity = '0.5';
                });

                btn.addEventListener('mouseout', function () {
                    if (this.innerText != sggPgNum) {
                        this.style.opacity = '1';
                    }
                });

                if (btn.innerText == sggPgNum) {
                    btn.style.opacity = '0.5';
                } else {
                    btn.style.opacity = '1';
                }
            });
        }
    }
}

// 이벤트, 함수
function sggGridFnc(grid) {
    // 체크박스
    sggGridChk(grid);
    // tr onclick
    sggGridtrData(grid);
    // 라디오
    sggGridRadio(grid);
    // 콜백함수
    sggGridCallBack(grid);
}

// checkbox
function sggGridChk(grid) {
    if (grid.tdType == 'checkbox') {
        var allChk = document.getElementById(grid.frmId + '_chkA');

        if (allChk) {
            var checkboxes = document.querySelectorAll('input[name=' + grid.frmId + '_chk]');
            // 전체 선택 시
            allChk.addEventListener('click', function () {
                if (checkboxes) {
                    if (allChk.checked) {
                        checkboxes.forEach(function (checkbox) {
                            checkbox.checked = true;
                            sggGridCheckRow(grid);
                        });
                    } else {
                        checkboxes.forEach(function (checkbox) {
                            checkbox.checked = false;
                        });
                    }
                }
            });

            // 각 행 선택 시
            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener('change', function () {
                    var total = checkboxes.length;
                    var checked = document.querySelectorAll('input[name=' + grid.tblId + '_chk]:checked').length;

                    // 모든 행 선택시
                    allChk.checked = (total === checked);

                    sggGridCheckRow(grid);
                });
            });

        }
    }
}

// 체크된 값 배열에 담아주기
function sggGridCheckRow(grid) {
    grid.tdTypeData = [];
    var checkboxes = document.querySelectorAll('input[name=' + grid.frmId + '_chk]:checked');

    if (checkboxes) {
        for (let i = 0; i < checkboxes.length; i++) {
            var id = checkboxes[i].parentNode.parentNode.id;
            var frm = grid.frmId + '_';
            id = id.replace(frm, '');

            grid.tdTypeData.push(grid.data[id]);
        }
    }
}

// tr onclick
function sggGridtrData(grid) {
    var gridTbl = document.getElementById(grid.frmId + '_tbl');
    var trs = gridTbl.querySelectorAll('tbody tr');

    if (trs) {
        trs.forEach(function (tr) {
            tr.addEventListener('click', function () {
                var id = this.id;
                var frm = grid.frmId + '_';
                id = id.replace(frm, '');
                grid.trData = grid.data[id];
            });
        });
    }
}

// 라디오 체크 값
function sggGridRadio(grid) {
    var radios = document.querySelectorAll('input[name=' + grid.frmId + '_radio]');

    radios.forEach(function (radio) {
        radio.addEventListener('change', function () {
            if (this.checked) {
                grid.tdTypeData = [];
                var id = this.parentNode.parentNode.id;
                var frm = grid.frmId + '_';
                id = id.replace(frm, '');

                grid.tdTypeData.push(grid.data[id]);
            }
        });
    });
}

// 콜백함수
function sggGridCallBack(grid) {
    if (grid.callback != '') {
        eval(grid.callback + '()');
    }
}