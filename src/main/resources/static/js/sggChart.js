//var chart1 = {
//    // 테이블 명
//    tblId: 'tbl1',
//    // 받아온 값(수)
//    resultData: [[100, 34, 56, 74, 91], [15, 33, 56, 7, 91], [15, 33, 56, 30, 91], [15, 33, 56, 74, 91], [15, 33, 56, 74, 91]],
//    // 그래프 기준
//    graph: ['a', 'b', 'c', 'd', 'e'],
//   // 그래프 카테고리
//    category: ['1', '2', '3', '4', '5'],
//    // 그래프 제목
//    title: 'abc',
//    // ajax url
//	  url: ''
//}

//sggChart(chart1);

function sggChart(chartName) {
    var chart = chartName;
	
	var chartRow = [];
	$.ajax({
		url: './' + chart.url + '.do',
		type: 'POST',
		async: false,
		dataType: 'JSON',
		success: function(result) {
			for (let i = 0; i < result.length; i++) {
				chart.resultData.push(Object.values(result[i]));
			}
		}
	});
	
    var max = 0;

    // 차트 내용 중 최대값 찾기
    for (let i = 0; i < chart.resultData.length; i++) {
        for (let j = 0; j < chart.resultData[i].length; j++) {
            if (max < chart.resultData[i][j]) {
                max = chart.resultData[i][j];
            }
        }
    }

    // 차트 최대 수
    while (max % 10 != 0) {
        max += 1;
    }

    // 막대그래프
    var html = '';
    // 막대그래프 명
    var html1 = '';
    // 막대그래프 수량 용
    var html2 = '';
    var countHtml2 = 0;
    
    // 막대그래프 색상용
    var rowColorArry = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    if (chart.category.length > 6) {
    	for (let i = 6; i < chart.category.length; i++) {
        	var rowColor = '#';
        	for (let j = 0; j < 6; j++) {
            	rowColor += (parseInt(Math.random() * 0xf)).toString(16);
        	}
        	rowColorArry.push(rowColor);
    	}
    }

    $('#' + chart.tblId + ' tbody', '#' + chart.tblId + ' thead').remove();

    html += '<thead><td colspan="' + ((chart.graph.length * chart.category.length) + (chart.graph.length * 1) + 3) + '" style="font-size:20px;">' + chart.title + '</td>';
    html += '<tbody></tbody>';
    html += '<tfoot></tfoot>';
    $('#' + chart.tblId).append(html);
	
    // 차트 그리기
    html = '<tr>';
    html += '<th>' + max + '</th>';
    for (let i = 0; i < chart.resultData[0].length; i++) {
    	
	    html += '<th rowspan="12">&nbsp;</th>';

        for (let j = 0; j < chart.resultData.length; j++) {
        	// 막대그래프 수량용
        	countHtml2 ++;
        
            // 막대그래프 퍼센트
            var percent = Math.round((chart.resultData[j][i] / max) * 100);

            // linear-gradient용 수 비교
            html += '<td id="' + chart.resultData[j][i] + '" rowspan="11" style="background-image: linear-gradient(to top, ' + rowColorArry[j] + ' ' + percent + '%, white ' + percent + '%);"></td>';
        }
    }
    html += '<th></th>';

    html += '<td rowspan="12" id="' + chart.tblId + '_category">'; 
    // 색상 표시
    for (let i = 0; i < chart.category.length; i++) {
        html += '<div style="background-color: ' + rowColorArry[i] + '; width : 14px; height : 14px; display:inline-block" /> ';
        html += chart.category[i] + '<br>';
    }
    html += '</td>';
    html += '</tr>';
    html += '</tr>';

    var maxCount = max / 10;

    // 차트 수량 그려주기
    for (let i = 0; i < 10; i++) {
        max -= maxCount;
        if (i % 2 != 0) {
            html += '<tr>';
            html += '<th>' + max + '</th>';
            html += '</tr>';
        } else {
            html += '<tr>';
            html += '<th>&nbsp;</th>';
            html += '</tr>';
        }
    }

    html1 += '<tr>';
    html1 += '<th>&nbsp;</th>';
    // 기준명
    for (let i = 0; i < chart.graph.length; i++) {
        html1 += '<th>&nbsp;</th>';
        html1 += '<td colspan="' + chart.category.length + '">' + chart.graph[i] + '</td>';
    }
    html1 += '</tr>';
    
    $('#' + chart.tblId + ' tbody').append(html);
    $('#' + chart.tblId + ' tfoot').append(html1);

    $('#' + chart.tblId + '').css({
        'border-spacing': '0',
        'border-collapse': 'collapse'
    })

    $('#' + chart.tblId + ' th').css({
        'width': '3%',
        'text-align': 'center'
    })

    $('#' + chart.tblId + ' td').css({
        'width': '30px',
        'text-align': 'center'
    })
    
    // 수 보여주기 hover
    $('#' + chart.tblId + ' tbody td').hover(function() {
        if (this.id != chart.tblId + '_category') {
            $(this).text(this.id);
            $(this).css({
            	'opacity' : '0.5',
            	'transition' : 'all 0.2s'
            });
        }
    }, function() {
        if (this.id != chart.tblId + '_category') {
            $(this).text('');
            $(this).css({'opacity' : '1'});
        }
    })
}