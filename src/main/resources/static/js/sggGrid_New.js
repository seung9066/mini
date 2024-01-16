// // 사용할 페이지에 적어줄 것

// var grid1 = 
// { 
//     // 검색용 form 태그 아이디
//     form: 'frm', 
//     // 페이징 ajax url 
//     url: '', 
//     // GET, POST 
//     type: '', 
//     // 테이블 아이디 
//     tblId: 'tbl', 
//     // 테이블 th 컬럼명으로 정해줄 내용, th(컬럼) 수 보다 td 수가 많을 경우 해당 td hidden 처리
//     th: [1, 2, 3, 4], 
//     // 페이징 between (1 ~ row 번까지)
//     row: '10', 
//     // 페이징 버튼 용 게시글 총 수 url
//     buttonUrl: '', 
//     // 한번에 보여줄 페이징 버튼 수
//     pageButtonNum: 5, 
//     // tr onclick function명
//     tonC: '',
//     // tr onclick 값 담아줄 배열
//     trRowData: [],
//		// callback 함수명
//	    callback: '',
//     // table css
//     tbCss: {'width':'100%', 'text-align':'center'},
//     // th css 하나의 {}만 입력시 모든 th에 적용, grid.th.lengh 만큼 적으면 각각 적용
//     thCss: [{'width':'20%'}, {'width':'20%'}, {'width':'20%'}, {'width':'40%'}],
//     // check box 옵션 (true or false)
//     chkBox: 'true',
//     // chkBox 값 담을 배열
//     chkBoxRow: []
// }

// // 그리드들 배열에 담아주는 작업 필수
// var gridList = [grid1, grid2];

// sggGrid(1, grid.tblId)

// 체크 박스 특정 th 값 가져오기 예시
// function authChange() {
//	var data = [];
//	for (let i = 0; i < grid1.chkBoxRow.length; i++) {
//		for (let j = 0; j < grid1.chkBoxRow[i].length; j++) {
//			data.push(grid1.chkBoxRow[i]);
//		}
//	}
//}

//  tonC 실행 시 trColor 막기 (function tonC()에 넣어주기)
//	trColor(this).preventDefault();

// 기능 부분
// pageNum = 버튼 넘버, gridName = tblId
function sggGrid(pageNum, gridName) {
    // grid 배열 인택스 용, 어떤 테이블에 그려줄 것인지 체크 용
    var gridCount = 0;

    // 새로 그렸으니 tr onclick 색상용 변수 비워주기
    trColorClick = 0;

    // 화면에 테이블 뿌리고 난 후 매개변수를 object type으로 받아서 해당 아이디의 태그 자체를 가지고 와서 다시 테이블 id로 string으로 바꿔주기
    if (typeof (gridName) == 'object') {
        gridName = gridName.id
    }

    // 어떤 테이블에 대한 그리드, 페이징버튼인지 파악
    for (let i = 0; i < gridList.length; i++) {
        if (gridName == gridList[i].tblId) {
            gridCount = i;
        }
    }

    // 어떤 테이블인지 확정
    var grid = gridList[gridCount];

    var data = '';

    // 검색 용 폼태그 name들 담기
    if (grid.form != '') {
        data = $('#' + grid.form).serialize();
    }

    // 페이징용 pageNum between grid.row
    data += '&page=' + pageNum;

    if (grid.row) {
        data += '&row=' + grid.row;
    }    

    // 테이블 페이징
    $.ajax({
        url: grid.url,
        type: grid.type,
        data: data,
        dataType: 'json',
        async: false,
        success: function (result) {
            // result json 배열 값만 가져오기
            var ajaxResult = Object.values(result);
            var html = '';

            $('#' + grid.tblId + '_thead').remove();
            $('#' + grid.tblId + '_tbody').remove();

            html += '<thead id="' + grid.tblId + '_thead' + '"></thead>';
            html += '<tbody id="' + grid.tblId + '_tbody' + '"></tbody>';
            $('#' + grid.tblId).append(html);

            // thead 컬럼 생성
            html = '<tr>';
            for (let i = 0; i < grid.th.length; i++) {
                // chkBox 생성여부
                if (grid.chkBox == 'true' && i == 0) {
                    html += '<th><input type="checkbox" id="' + grid.tblId + '_chkA" style="width: 10px;"></th>';
                }

                html += '<th>' + grid.th[i] + '</th>';
            }
            html += '</tr>';

            $('#' + grid.tblId + '_thead').append(html);

            if (grid.buttonUrl == '') {
                grid.row = result.length;
            }

            // tbody 내용 생셩
            html = '';
            // 값이 없을 경우
            if (ajaxResult.length == 0) {
                if (grid.chkBox == 'true') {
                    html += '<tr><td colspan="' + (grid.th.length + 1) + '">조회된 데이터가 없습니다</td></tr>';
                } else {
                    html += '<tr><td colspan="' + grid.th.length + '">조회된 데이터가 없습니다</td></tr>';
                }
                for (let i = 0; i < (grid.row - 1); i++) {
                    if (grid.chkBox == 'true') {
                        html += '<tr><td colspan="' + (grid.th.length + 1) + '">&nbsp</td></tr>';
                    } else {
                        html += '<tr><td colspan="' + grid.th.length + '">&nbsp</td></tr>';
                    }
                }
            } else {
                for (let i = 0; i < grid.row; i++) {
                    // 테이블에 그려줄 row 수보다 반환값이 적으면
                    if (i < ajaxResult.length) {
                        var ajaxResultValue = Object.values(ajaxResult[i]);
                        // tr onclick 함수 있을 때 없을 때
                        if (grid.tonC != '') {
                            html += '<tr id="' + grid.tblId + '_' + i + '" onclick="getRowData(this, ' + grid.tblId + '); ' + grid.tonC + '(this); trColor(this)">';
                        } else {
                            html += '<tr id="' + grid.tblId + '_' + i + '" onclick="getRowData(this, ' + grid.tblId + ');">';
                        }

                        for (let j = 0; j < ajaxResultValue.length; j++) {
                            // chkBox 생성여부
                            if (grid.chkBox == 'true' && j == 0) {
                                // tr onclick 막기
                                html += '<td id="' + grid.tblId + '_chk' + i + '" onclick="event.cancelBubble=true"><input type="checkbox" name="' + grid.tblId + '_chk"></td>';
                            }

                            // th 컬럼 수 보다 많으면 hidden 처리
                            if (j >= grid.th.length) {
                                html += '<td style="width:0px;"><input type="hidden" value="' + ajaxResultValue[j] + '"></td>';
                            } else {
                                html += '<td></td>';
                            }
                        }
                        html += '</tr>';
                    } else {
                        if (grid.chkBox == 'true') {
                            html += '<tr><td colspan="' + (grid.th.length + 1) + '">&nbsp</td></tr>';
                        } else {
                            html += '<tr><td colspan="' + grid.th.length + '">&nbsp</td></tr>';
                        }
                    }
                }
            }

            $('#' + grid.tblId + '_tbody').append(html);

            for (let i = 0; i < ajaxResult.length; i++) {
                var ajaxResultValue = Object.values(ajaxResult[i]);
                for (let j = 0; j < ajaxResultValue.length; j++) {
                    if (j < grid.th.length && grid.chkBox == 'false') {
                        $($($('#' + grid.tblId + '_tbody').find('tr')[i]).find('td')[j]).text(ajaxResultValue[j]);
                    } else if (j < grid.th.length && grid.chkBox == 'true') {
                        $($($('#' + grid.tblId + '_tbody').find('tr')[i]).find('td')[j + 1]).text(ajaxResultValue[j]);
                    }
                }
            }
        }
    })

    // 테이블 css
    // 기본값
    $('#' + grid.tblId).css({
        'width': '100%',
        'text-align': 'center',
        'height': ((grid.row * 30) + 60) + 'px',
        'border-spacing': '0px'
    });

    // 추가값
    for (let i = 0; i < Object.keys(grid.tbCss).length; i++) {
        $('#' + grid.tblId).prop(Object.keys(grid.tbCss)[i], Object.values(grid.tbCss)[i]);
    };

    $('#' + grid.tblId + ' thead').css({
        'background-color': '#B8D7FF',
        'height': '30px'
    });

    // th(컬럼) css
    if (grid.thCss.length > 1 && Object.keys(grid.thCss[0]) != '') {
        // th(컬럼) 수에 맞게 적었을 때
        for (let i = 0; i < grid.thCss.length; i++) {
            $('#' + grid.tblId + ' th:nth-child(' + (i + 1) + ')').css(grid.thCss[i]);
        };
    } else if (grid.thCss.length == 1 && Object.keys(grid.thCss[0]) != '') {
        // 하나의 {}만 적었을 때
        $('#' + grid.tblId + ' th').css(grid.thCss[0]);
    } else {
        // 기본값
        $('#' + grid.tblId + ' th').css({
            'width': Math.floor(100 / grid.th.length) + '%'
        });
    }

    if (grid.chkBox == 'true') {
        $('#' + grid.tblId + ' th:nth-child(' + 1 + ')').css({
            'width': '30px'
        });
    }

    // hover
    $('#' + grid.tblId + ' tbody tr').hover(function () {
        $('#' + this.id).css({
            'background-color': '#E0EBFF',
            'transition': 'all 0.15s'
        });
    }, function () {
        // 클릭 된 tr이 아닌 tr만
        if (trColorClick != this.id) {
            $('#' + this.id).css('background-color', 'white');
        }
        // 값이 없는 빈 tr
        if (!this.id) {
            $('#' + this.id).css('background-color', 'white');
        }
    });

    // chkBox
    if (grid.chkBox == 'true') {
        // 전체 선택시
        $('#' + grid.tblId + '_chkA').click(function () {
            gridList[gridCount].chkBoxRow = [];
            if ($('#' + grid.tblId + '_chkA').is(':checked')) {
                $('input[name=' + grid.tblId + '_chk]').prop('checked', true);
                checkRow();
            } else {
                $('input[name=' + grid.tblId + '_chk]').prop('checked', false);
            }
        });

        // 각 행 선택시
        $('input[name=' + grid.tblId + '_chk]').click(function () {
            var total = $('input[name=' + grid.tblId + '_chk]').length;
            var checked = $('input[name=' + grid.tblId + '_chk]:checked').length;

            // 모든 행 선택시
            if (total == checked) {
                $('#' + grid.tblId + '_chkA').prop('checked', true);
            } else {
                $('#' + grid.tblId + '_chkA').prop('checked', false);
            }

            gridList[gridCount].chkBoxRow = [];
            checkRow();
        });

        // 체크된 값들 배열에 담아주기
        function checkRow() {
            var row = $('#' + grid.tblId).find('tr');

            // tr 돌기
            for (let i = 1; i < row.length; i++) {
                var columns = row[i].querySelectorAll('td');
                var rowTd = [];
                // 체크된 tr만 찾기
                if (columns[0].querySelector('input').checked) {
                    for (let j = 0; j < columns.length; j++) {
                        // 체크박스 td 넘어가기
                        if (columns[j].getAttribute('id')) {

                        } else if (columns[j].innerHTML.indexOf('hidden') > -1) {
                            // hidden td 값 가져오기
                            var valueS = columns[j].innerHTML.indexOf('value="');
                            var valueE = columns[j].innerHTML.indexOf('">');
                            rowTd.push(columns[j].innerHTML.slice((valueS + 7), valueE));
                        } else {
                            rowTd.push(columns[j].innerText);
                        }
                    }
                    gridList[gridCount].chkBoxRow.push(rowTd);
                }
            }
        }
    }

    if (grid.buttonUrl != '') {
        // 페이징 버튼
        $.ajax({
            url: grid.buttonUrl,
            type: grid.type,
            data: data,
            async: false,
            success: function (result) {
                var html = '';

                // 체크박스 옵션에 따라 td 크기 바꿔주기
                if (grid.chkBox == 'true') {
                    html = '<tr><td colspan="' + (grid.th.length + 1) + '">';
                } else {
                    html = '<tr><td colspan="' + grid.th.length + '">';
                }

                // 총 버튼 수
                var totalB = Math.ceil(result / grid.row);

                // 시작 버튼이 1 보다 작은 경우 방지
                if (totalB < 1) {
                    totalB = 1;
                }

                // 총 버튼 수 보다 큰 수 입력 방지
                if (pageNum > totalB) {
                    pageNum = totalB;
                }

                // 보여줄 시작 버튼
                var startB = Math.max((pageNum - (pageNum % grid.pageButtonNum) + 1), 1);
                // 보여줄 끝 버튼
                var endB = Math.min(pageNum + (grid.pageButtonNum - (pageNum % grid.pageButtonNum)), totalB);
                
                // 입력된 수가 보여줄 끝 버튼과 같을 때
                if (pageNum % grid.pageButtonNum == 0) {
                    startB = Math.max(pageNum - grid.pageButtonNum + 1, 1);
                    endB = Math.min(pageNum, totalB);
                }

                html += '<button onclick="sggGrid(1, ' + gridName + ')"><<</button>';

                if (startB == 1) {
                    html += '<button onclick="sggGrid(' + startB + ', ' + gridName + ')"><</button>';
                } else {
                    html += '<button onclick="sggGrid(' + (startB - 1) + ', ' + gridName + ')"><</button>';
                }
                
                for (let i = startB; i < endB + 1; i++) {
                    html += '<button onclick="sggGrid(' + i + ', ' + gridName + ')">' + i + '</button>';
                }

                if (endB == totalB) {
                    html += '<button onclick="sggGrid(' + endB + ', ' + gridName + ')">></button>';
                } else {
                    html += '<button onclick="sggGrid(' + (endB + 1) + ', ' + gridName + ')">></button>';
                }

                html += '<button onclick="sggGrid(' + totalB + ', ' + gridName + ')">>></button>';
                
                html += '</td></tr>';

                $('#' + grid.tblId + '_tfoot').remove();
                $('#' + grid.tblId).append('<tfoot id="' + grid.tblId + '_tfoot' + '"></tfoot>');
                $('#' + grid.tblId + '_tfoot').append(html);
            }
        })
    }

    // 버튼 css
    $('#' + grid.tblId + ' tfoot button').css({
        'border': 'none',
        'width': '25px',
        'height': '25px',
        'margin-right': '2px',
        'background-color': '#CCE1FF'
    });

    $('#' + grid.tblId + ' tfoot button').hover(function () {
        $(this).css({
            'opacity': '0.5'
        })
    }, function () {
        if ($(this).text() != pgNum) {
            $(this).css({
                'opacity': '1'
            })
        }
    });

    var btnCss = $('#' + grid.tblId + ' tfoot').find('button');

    pgNum = pageNum;

    // 클릭 된 버튼 opacity
    for (let i = 0; i < btnCss.length; i++) {
        if ($(btnCss[i]).text() == pgNum) {
            $(btnCss[i]).css('opacity', '0.5');
        } else {
            $(btnCss[i]).css('opacity', '1');
        }
    }

    var chkCB = 0;

    // callback 함수 실행 (grid object에 callback 여부 파악)
    for (let i = 0; i < Object.keys(grid).length; i++) {
        if (Object.keys(grid) == 'callback') {
            chkCB++;
        }
    }

    if (chkCB == 1) {
        if (grid.callback != '') {
            // 문자를 js코드로 실행하는 함수
            eval(grid.callback + '()');
        }
    }
};

// 클릭된 버튼 표시용
var pgNum = 0;

function getRowData(This, gridName) {
    // grid 배열 인택스 용, 어떤 테이블에 그려줄 것인지 체크 용
    var gridCount = 0;

    // 화면에 테이블 뿌리고 난 후 매개변수를 object type으로 받아서 해당 아이디의 태그 자체를 가지고 와서 다시 테이블 id로 string으로 바꿔주기
    if (typeof (gridName) == 'object') {
        gridName = gridName.id
    }

    // 어떤 테이블에 대한 그리드, 페이징버튼인지 파악
    for (let i = 0; i < gridList.length; i++) {
        if (gridName == gridList[i].tblId) {
            gridCount = i;
        }
    }

    // 어떤 테이블인지 확정
    var grid = gridList[gridCount];

    var mli = $('#' + This.id);

    grid.trRowData = [];

    // tr 각 td 텍스트 담기
    for (let i = 0; i < mli.find('td').length; i++) {
        // hidden이 아닐 때
        if (mli.find('td')[i].innerText != '') {
            grid.trRowData.push(mli.find('td')[i].innerText);
        } else {
            if (i != 0) {
                // hidden value 담기
                grid.trRowData.push(mli.find('td').find('input').val());
            }
        }
    }
};

// 클릭 시 색상 hover 방지용
var trColorClick = 0;

function trColor(This) {
    if (trColorClick == 0) {
        // 처음 클릭
        trColorClick = This.id;
        $('#' + trColorClick).css('background-color', '#E0EBFF');
    } else if (trColorClick == This.id) {
        // 재클릭
        $('#' + trColorClick).css('background-color', 'white');
        trColorClick = 0;
    } else {
        // 다른 tr 클릭
        $('#' + trColorClick).trigger('click');
        trColorClick = This.id;
        $('#' + trColorClick).css('background-color', '#E0EBFF');
    }
};