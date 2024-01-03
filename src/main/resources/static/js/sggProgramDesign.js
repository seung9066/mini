function paste() {
    navigator.clipboard.readText().then(clipboardText => {
        document.getElementById('txtQueryBefore').value = clipboardText;
        runApp();
    }).catch(err => {

    })
}

function runApp() {
    var txt = document.getElementById('txtQueryBefore').value;

    var typeVal = document.querySelector('input[name="type"]:checked').value;

    var obj = {};

    if (typeVal == 'oracleMybatis') {
        obj = runOracle(txt);
    }
    
    reWrite(obj);
    
}

// runApp 실행
function reWrite(obj) {
    // 쿼리변환
    document.getElementById('txtQueryAfter').value = chkWrite(obj.newTxt) + obj.newTxt;
    // 매개변수 컬럼
    var paramT = document.getElementById('param');
    paramT.value = chkEqu(paramT.value, obj.param);
    // 매개변수
    var parameterT = document.getElementById('parameter');
    parameterT.value = chkEqu(parameterT.value, obj.parameter);
    // 테이블
    var tabT = document.getElementById('tab')
    tabT.value = chkEqu(tabT.value, obj.tab);
    // 반환값
    var selT = document.getElementById('sel')
    selT.value = chkEqu(selT.value, obj.sel);

    // 복사
    document.getElementById('txtQueryAfter').select();
    document.execCommand('copy');
}

// 오라클 (마이바티스)
function runOracle(txt) {
    var obj = {};
    var newTxt = '';
    var param = '';
    var parameter = '';
    var tab = '';
    var sel = '';

    // 쿼리변환
    newTxt = runMybatis(txt);
    // 매개변수 컬럼
    param = getParam(newTxt);
    // 매개변수
    parameter = chkParameter(newTxt);
    // 테이블
    tab = chkTableFrmOrNot(newTxt);
    // 반환값은 SELECT문일때만
    if (newTxt.indexOf('DELETE') == -1 && newTxt.indexOf('UPDATE') == -1 && newTxt.indexOf('INSERT') == -1) {
        // 반환값
        sel = getSelectU(newTxt);
    }

    obj.newTxt = newTxt;
    obj.param = param;
    obj.parameter = parameter;
    obj.tab = tab;
    obj.sel = sel;

    return obj;
}

// 테이블 양식 체크 시 테이블 양식 입력칸
function chkFrm() {
    var type = document.querySelector('#tblFrmChk').checked;
    if (type) {
        // 테이블 양식 보여주기
        document.getElementById('tblFrmT').style.display = 'block';
    } else {
        // 테이블 양식 가리기
        document.getElementById('tblFrmT').style.display = 'none';
    }
}

// 중복값 제거
function chkEqu(txt, newTxt) {
    var returnTxt = '';
    var returnArr = [];
    
    // 반점 제거
    newTxt = newTxt.replaceAll(', ', '');
    var newArr = newTxt.split('\n');
    
    // 새로운 배열에서 중복값 제거
    var cnt = newArr.length;
    for (let i = 0; i < cnt; i++) {
        for (let k = i + 1; k < cnt; k++) {
            if (newArr[i] == newArr[k]) {
                newArr.splice(k, 1);
                cnt--;
                k--;
            }
        }
    }
    
    if (txt != '') {
        // 반점 제거
        txt = txt.replaceAll(', ', '');
        // 줄바꿈 기준 배열 만들기
        var arr = txt.split('\n');
        
        // 기존 배열과 새로운 배열에서 중복값 제거
        for (let i = 0; i < arr.length; i++) {
            for (let k = 0; k < cnt; k++) {
                if (arr[i] == newArr[k]) {
                    newArr.splice(k, 1);
                    k--;
                }
            }
        }
        
        // 기존 배열 담아주기
        for (let i = 0; i < arr.length; i++) {
            returnArr.push(arr[i]);
        }
        
    }
    
    // 새로운 배열 담아주기
    for (let i = 0; i < newArr.length; i++) {
        returnArr.push(newArr[i]);
    }
    
    // 쿼리용 문장으로 바꿔주기
    for (let i = 0; i < returnArr.length; i++) {
        if (i != 0) {
            returnTxt += ', ';
        }
        returnTxt += returnArr[i];
        if (i != returnArr.length - 1) {
            returnTxt += '\n';
        }
    }
        
    return returnTxt;
}

// 초기화 버튼
function btnReset() {
    // 글순번
    document.getElementById('writeNo').value = 1;
    // 제목
    document.getElementById('writeHead').value = '';
    // 변환전 쿼리
    document.getElementById('txtQueryBefore').value = '';
    // 쿼리변환
    document.getElementById('txtQueryAfter').value = '';
    // 매개변수 컬럼
    document.getElementById('param').value = '';
    // 매개변수
    document.getElementById('parameter').value = '';
    // 테이블
    document.getElementById('tab').value = '';
    // 반환값
    document.getElementById('sel').value = '';
}

// 테이블 양식 추가 (테이블 양식 직접 입력 시 사용)
function newTableFrm() {
    var cnt = document.querySelectorAll('input[name="tableFrm"]').length;
    var html = `<br><label>테이블 양식<input type="text" id="tableFrm` + cnt + `" name="tableFrm"></label>`;
    document.querySelector('.tblFrm').insertAdjacentHTML('beforeend', html);
}

// 테이블 양식 초기화 (테이블 양식 직접 입력 시 사용)
function resetTableFrm() {
    document.getElementById('tblDiv').innerHTML = '';
    var html = `<label>테이블 양식<input type="text" id="tableFrm0" name="tableFrm"></label>`;
    document.querySelector('.tblFrm').insertAdjacentHTML('beforeend', html);

}

// 산출물 양식 지정
function chkWrite(txt) {
    var newTxt = '';
    // 산출물 양식 사용 체크 시
    if (document.getElementById('writeChk').checked) {
        // SELECT, DELETE, UPDATE, INSERT 절 체크
        var sel = txt.indexOf('SELECT');
        var del = txt.indexOf('DELETE');
        var upd = txt.indexOf('UPDATE');
        var ins = txt.indexOf('INSERT');
        var type = '';

        if (del > -1) {
            type = '삭제한다.';
        } else if (upd > -1) {
            type = '수정한다.';
        } else if (ins > -1) {
            type = '등록한다.';
        } else {
            type = '조회한다.';
        }

        // 순번
        var no = document.getElementById('writeNo').value;
        // 제목
        var head = document.getElementById('writeHead').value;
        // 양식
        newTxt = no + ') ' + head + '\n';
        newTxt += '  가)  정보를 ' + type + '\n';
        newTxt += '  나) \n';

        // 다음 순번으로 올려놓기
        document.getElementById('writeNo').value = Number(no) + 1;
    }

    return newTxt;
}

// 마이바티스 쿼리 변환 실행 (쿼리 추가시 테이블 중첩)
function runMybatis(txt) {
    var newTxt = txt;
    
    // 마이바티스 문법 제거
    newTxt = mybatisQuery(newTxt);
    // 주석제거
    newTxt = delAnno(newTxt);
    // 빈줄제거
    newTxt = delLine(newTxt);

    return newTxt;
}

// 마이바티스 쿼리 변환
function mybatisQuery(txt) {
    // CDATA 제거 + CDATA 내부 비교연산자 변형
    var newTxt = '';
    var arr = txt.split('<![CDATA[');
    // 첫번째 CDATA 이전 쿼리
    var cdataTxt = arr[0];
    // CDATA 수 만큼
    for (let i = 1; i < arr.length; i++) {
        var arr2 = arr[i].split(']]>');
        // 비교연산자 뽑아내기
        var chgTxt = arr2[0];
        // 비교연산자 바꿔주기
        chgTxt = chgTxt.replaceAll('<', '@');
        chgTxt = chgTxt.replaceAll('>', '&');
        // 바꾼 비교 연산자 넣어주기
        chgTxt += arr2[1];
        // 바꾼 비교연산자 + <![CDATA[ 뒤 쿼리 담아주기
        cdataTxt += chgTxt;
    }

    // <> 제거
    var newTxt = '';
    var chkNo = 0;
    for (let i = 0; i < cdataTxt.length; i++) {
        // < 부터 글자 담지 않기
        if (cdataTxt[i] == '<') {
            chkNo = 1;
        }
        
        if (chkNo == 0) {
            newTxt += cdataTxt[i];
        }
            
        // > 이후부터는 다시 글자 담기
        if (cdataTxt[i] == '>') {
            chkNo = 0;
        }
    }

    // 매개변수 바꿔주기
    newTxt = newTxt.replaceAll('#{', ':');
    newTxt = newTxt.replaceAll('}', '');

    // CDATA 내부 비교연산자 되돌리기
    newTxt = newTxt.replaceAll('@', '<');
    newTxt = newTxt.replaceAll('&', '>');

    return newTxt;
}

// 빈줄 제거
function delLine(txt) {
    var newTxt = '';
    var chkNo = 0;
    for (let i = 0; i < txt.length; i++) {
        // 줄바꿈 이후 줄바꿈 (빈줄) || 첫줄이 빈줄 || 마지막이 줄바꿈일시
        if ((txt[i] == '\n' && txt[i-1] == '\n') || (i == 0 && txt[i] == '\n') || (i == txt.length - 1 && txt[i] == '\n')) {
            chkNo = 1;
        } else {
            chkNo = 0;
        }

        if (chkNo == 0) {
            newTxt += txt[i];
        }
    }

    return newTxt;
}

// 주석 제거
function delAnno(txt) {
    // /* */
    var newTxt = '';
    var chkNo = 0;
    for (let i = 0; i < txt.length; i++) {
        // /* 주석 시작부터 글자 담지 않기
        if (txt[i] == '/' && txt[i+1] == '*') {
            chkNo = 1;
        }
        
        if (chkNo == 0) {
            newTxt += txt[i];
        }
        
        // */ 주석을 닫으면 다시 글자 담아주기
        if (txt[i] == '/' && txt[i-1] == '*') {
            chkNo = 0;
        }
    }
    
    // --
    txt = newTxt;
    newTxt = '';
    chkNo = 0;
    for (let i = 0; i < txt.length; i++) {
        // -- 주석 시작부터 글자 담지 않기
        if (txt[i] == '-' && txt[i+1] == '-') {
            chkNo = 1;
        }

        // 줄바꿈시 주석이 끝나므로 다시 담아주기
        if (txt[i] == '\n') {
            chkNo = 0;
        }

        if (chkNo == 0) {
            newTxt += txt[i];
        }
    }

    return newTxt;
}

// 매개변수 찾기
function chkParameter(txt) {
    var regS = /^[a-z]*$/;
    var regL = /^[A-Z]*$/;
    var reg = /^[a-zA-Z]*$/;
    var arr = [];
    var newTxt = '';
    var chkNo = 0;
    for (let i = 0; i < txt.length; i++) {
        // 소문자로 시작할 경우 담기
        if (regS.test(txt[i])) {
            chkNo = 1;
        }
        
        // 소문자로 시작 && 마지막 글자 && 영문자일시 글자담고 배열에 담기
        if (chkNo == 1 && i == txt.length - 1 && reg.test(txt[i])) {
            newTxt += txt[i];
            arr.push(newTxt);
        }
        
        // 소문자일 때 && 영문자가 아닐 때 배열에 담기
        if (chkNo == 1 && !reg.test(txt[i])) {
            arr.push(newTxt);
            chkNo = 0;
            newTxt = '';
        }
        
        if (chkNo == 1) {
            newTxt += txt[i];
        }
    }
    
    newTxt = '';
    // 매개변수 배열
    for (let i = 0; i < arr.length; i++) {
        // 첫번째 인덱스 아니면 , 추가
        if (i != 0) {
            newTxt += ", ";
        }
        // 쿼리 조회를 위해 '' 씌우기
        newTxt += "'";
        newTxt += arr[i];
        newTxt += "'";
        // 마지막을 제외하고 줄바꿈 추가
        if (i != arr.length - 1) {
            newTxt += '\n';
        }
    }
    
    // 매개변수 string
    txt = newTxt;
    newTxt = '';
    for (let i = 0; i < txt.length; i++) {
        var nowTxt = txt[i];
        // 대문자일 경우 앞에 _ 추가
        if (regL.test(nowTxt)) {
            nowTxt = '_' + nowTxt;
        }
        // 소문자일 경우 대문자로 변환
        if (regS.test(nowTxt)) {
            nowTxt = nowTxt.toUpperCase();
        }
        newTxt += nowTxt;
    }
    
    return newTxt;
}

// 매개별수 컬럼 뽑기
function getParam(txt) {
    // 매개변수 컬럼 찾기
    var newTxt = '';
    
    var sel = txt.indexOf('SELECT');
    var del = txt.indexOf('DELETE');
    var upd = txt.indexOf('UPDATE');
    var ins = txt.indexOf('INSERT');
    var type = '';
    
    var newTxt = '';
    if (del > -1) {
        type = 'DELETE FROM ';
    } else if (upd > -1) {
        type = 'UPDATE ';
    } else if (ins > -1) {
        type = 'INSERT INTO ';
    }
    
    if (type != '') {
        // SELECT문이 아니면
        newTxt = fndParamNotSel(txt, type);
    } else {
        // SELECT문이면
        var arr = getParamSel(txt);
        var regStr = /[^a-zA-Z_]/g;
        // 매개변수 컬럼 배열
        for (let i = 0; i < arr.length; i++) {
            var getArr = arr[i].replace(regStr, '');
            // 첫번째 인덱스 아니면 , 추가
            if (i != 0) {
                newTxt += ", ";
            }
            // 쿼리 조회를 위해 '' 씌우기
            newTxt += "'";
            newTxt += getArr;
            newTxt += "'";
            // 마지막을 제외하고 줄바꿈 추가
            if (i != arr.length - 1) {
                newTxt += "\n";
            }
        }
    }
    
    return newTxt;
}

// SELECT절 아닌 매개변수 컬럼 뽑기
function fndParamNotSel(txt, type) {
    var arr = chkParamNotSel(txt, type);
    var newTxt = '';
    var regStr = /[^a-zA-Z_]/g;

    for (let i = 0; i < arr.length; i++) {
        var getArr = arr[i].replace(regStr, '');
        if (i != 0) {
            newTxt += ", ";
        }
        newTxt += "'";
        newTxt += getArr;
        newTxt += "'";
        if (i != arr.length - 1) {
            newTxt += "\n";
        }
    }

    return newTxt;
}

// SELECT문 아닌 경우 WHERE절 컬럼 찾기 + 서브쿼리 WHERE절 컬럼 제거
function chkParamNotSel(txt, type) {
    var newTxt = '';
    // 띄어쓰기 기준으로 자르기 위해 줄바꿈 띄어쓰기로 바꿔주기
    txt = txt.replaceAll('\n', ' ');
    // 띄어쓰기 기준으로 자른 배열
    var arr = txt.split(' ');
    var chkNo = 0;
    var chkSel = 0;
    var chkWhe = 0;
    var newArr = [];
    var regStr = /[^a-zA-Z_]/g;

    // INSERT문이 아니면
    if (type != 'INSERT INTO ') {
        for (let i = 0; i < arr.length; i++) {
            // WHERE절 컬럼은 WHERE, AND, OR, SET 뒤에 옴
            if (arr[i].indexOf('WHERE') > -1 || arr[i].indexOf('AND') > -1 || arr[i].indexOf('OR') > -1 || arr[i].indexOf('SET') > -1) {
                chkWhe = 1;
            }

            // 서브쿼리는 (로 시작
            if (arr[i].indexOf('(') > -1) {
                chkNo++;
            }

            // (가 있고 SELECT가 오면 서브쿼리
            if (chkNo == 1 && arr[i].indexOf('SELECT') > -1) {
                chkSel++;
                chkWhe = 0;
            }

            // 서브쿼리 끝나면
            if (chkNo == chkSel && arr[i].indexOf(')') > -1) {
                chkNo--;
                chkSel--;
            }

            // 서브쿼리 아니고 WHERE절이면
            if (chkNo == 0 && chkWhe == 1) {
                if (arr[i].indexOf('_') > -1) {
                    var getArr = arr[i].replace(regStr, '');
                    newArr.push(getArr);
                }
            }
        }
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].indexOf('(') > -1) {
                chkNo++;
            }
            
            if (arr[i].indexOf(')') > -1) {
                chkNo--;
            }

            // INSERT문은 처음 () 안에 매개변수 컬럼
            if (chkNo == 1) {
                if (arr[i].indexOf('_') > -1) {
                    // 스네이크 방식이면
                    var getArr = arr[i].replace(regStr, '');
                    newArr.push(getArr);
                }
            }
        }
    }
    
    return newArr;
}

// SELECT절 매개변수 컬럼 찿기
function getParamSel(txt) {
    // 매개변수는 where절에 오기에 where 기준으로 자른 배열 만들기
    var whe = txt.split('WHERE');
    var arr = [];

    // 0 = WHERE 이전이기에 1부터
    for (let i = 1; i < whe.length; i++) {
        // 띄어쓰기 제거용
        var wheNew = whe[i].split(' ');
        arr.push(wheNew[1]);
    }
    
    // 매개변수는 and 뒤에 오기에 and 기준으로 자른 배열 만들기
    var wheAnd = txt.split('AND');
    // 0 = AND 이전이기에 1부터
    for (let i = 1; i < wheAnd.length; i++) {
        // 띄어쓰기 제거용
        var wheAndNew = wheAnd[i].split(' ');
        arr.push(wheAndNew[1]);
    }

    // 매개변수는 set 뒤에 오기에 set 기준으로 자른 배열 만들기
    var wheSet = txt.split('SET');
    // 0 = AND 이전이기에 1부터
    for (let i = 1; i < wheSet.length; i++) {
        // 띄어쓰기 제거용
        var wheAndSet = wheSet[i].split(' ');
        arr.push(wheAndSet[1]);
    }

    // 매개변수는 or 뒤에 오기에 or 기준으로 자른 배열 만들기
    var wheOr = txt.split('OR');
    // 0 = OR 이전이기에 1부터
    for (let i = 1; i < wheOr.length; i++) {
        // 띄어쓰기 제거용
        var wheAndOr = wheOr[i].split(' ');
        arr.push(wheAndOr[1]);
    }

    // 테이블, 컬럼은 _가 포함되어 있기에 스네이크 형식 찾기
    var arrChk = getUnderBar(txt);
    var newArr = [];
    var regStr = /[^a-zA-Z_]/g;
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arrChk.length; k++) {
            // 현재 arr에 컬럼뿐만 아니라 매개변수 등도 들어있기에 스네이크 형식(컬럼)인 것만 뽑아내기
            if (arrChk[k] == arr[i]) {
                var getArr = arr[i].replace(regStr, '');
                newArr.push(getArr);
                break;
            }
        }
    }

    return newArr;
}

// select 뽑기
function getSelectU(txt) {
    var newTxt = '';
    var arr = getSelect(txt);
    for (let i = 0; i < arr.length; i++) {
        if (i != 0) {
            newTxt += ", ";
        }
        newTxt += "'";
        newTxt += arr[i];
        newTxt += "'";
        if (i != arr.length - 1) {
            newTxt += "\n";
        }
    }

    return newTxt;
}

// select 찾기
function getSelect(txt) {
    // 컬럼은 _를 포함하기에 스네이크 형식 찾기
    var arr = getUnderBar(txt);
    var newTxt = '';
    
    // 테이블 찾기
    var frmArr = chkTblFrmOrNot(txt);
    var arrCnt = arr.length;
    var frmCnt = frmArr.length;
    for (let i = 0; i < arrCnt; i++) {
        for (let k = 0; k < frmCnt; k++) {
            // 테이블, 컬럼 둘 다 스네이크 형식이기에 테이블 제거
            if (arr[i] == frmArr[k]) {
                frmArr.splice(k, 1);
                arr.splice(i, 1);
                arrCnt--;
                frmCnt--;
                i--;
                k--;
                break;
            }
        }
    }

    // WHERE절 컬럼 찾기
    var chkArr = getParamSel(txt);
    var chkCnt = chkArr.length;
    arrCnt = arr.length;
    for (let i = 0; i < arrCnt; i++) {
        for (let k = 0; k < chkCnt; k++) {
            // WHERE절 컬럼, SELECT절 컬럼 둘 다 스네이크 형식이기에 WHERE절 컬럼 제거
            if (arr[i] == chkArr[k]) {
                chkArr.splice(k, 1);
                arr.splice(i, 1);
                arrCnt--;
                chkCnt--;
                i--;
                k--;
                break;
            }
        }
    }
    
    return arr;
}

// 스네이크 양식 찾기
function getUnderBar(txt) {
    var arr = [];
    var newTxt = '';
    var chkNo = 0;
    var reg = /^[a-zA-Z_]*$/;
    for (let i = 0; i < txt.length; i++) {
        if (reg.test(txt[i])) {
            chkNo = 1;
        } else {
            chkNo = 0;
        }

        if (chkNo == 1) {
            newTxt += txt[i];
        } else {
            if (newTxt != '') {
                if (newTxt.indexOf('_') > -1) {
                    arr.push(newTxt);
                }
                newTxt = '';
            }
        }
    }

    return arr;
}

// 테이블 양식, 비양식 체크 테이블 뽑기
function chkTableFrmOrNot(txt) {
    var type = document.querySelector('#tblFrmChk').checked;
    if (type) {
        // 테이블 양식
        return getTableFrm(txt);
    } else {
        // 테이블 뽑기
        return getTableU(txt);
    }
}

// 테이블 양식, 비양식 체크 테이블 찾기
function chkTblFrmOrNot(txt) {
    var chkType = document.querySelector('#tblFrmChk').checked;
    var arr = [];
    if (chkType) {
        // 테이블 양식
        arr = chkTableFrm(txt);
    } else {
        // 테이블 뽑기
        var sel = txt.indexOf('SELECT');
        var del = txt.indexOf('DELETE');
        var upd = txt.indexOf('UPDATE');
        var ins = txt.indexOf('INSERT');
        var type = '';

        var newTxt = '';
        if (del > -1) {
            type = 'DELETE FROM ';
        } else if (upd > -1) {
            type = 'UPDATE ';
        } else if (ins > -1) {
            type = 'INSERT INTO ';
        }
        
        if (type != '') {
            // SELECT문이 아닌 경우 테이블
            arr.push(fndTableNotSel(txt, type));
        } else {
            // SELECT문 테이블
            arr = fndTableSel(txt);
        }
    }

    return arr;
}

// 테이블 뽑기
function getTableU(txt) {
    var sel = txt.indexOf('SELECT');
    var del = txt.indexOf('DELETE');
    var upd = txt.indexOf('UPDATE');
    var ins = txt.indexOf('INSERT');
    var type = '';

    var newTxt = '';
    if (del > -1) {
        type = 'DELETE FROM ';
    } else if (upd > -1) {
        type = 'UPDATE ';
    } else if (ins > -1) {
        type = 'INSERT INTO ';
    }
    
    if (type != '') {
        // SELECT문이 아닌 경우 테이블
        newTxt = fndTableNotSel(txt, type);
    } else {
        // SELECT문 테이블
        var arr = fndTableSel(txt);
        for (let i = 0; i < arr.length; i++) {
            if (i != 0) {
                newTxt += ', ';
            }
            newTxt += "'";
            newTxt += arr[i];
            newTxt += "'";
            if (i != arr.length - 1) {
                newTxt += "\n";
            }
        }
    }

    return newTxt;
}

// select절이 아닌 경우 테이블 찾기
function fndTableNotSel(txt, type) {
    var newTxt = '';
    var typeTxt = '';
    var chkNo = 0;
    var reg = /^[a-zA-Z_]*$/;
    for (let i = 0; i < txt.length; i++) {
        if (typeTxt != type) {
            typeTxt += txt[i];
        }

        if (chkNo == 1) {
            if (reg.test(txt[i])) {
                if (newTxt == '') {
                    newTxt += "'";
                }
                newTxt += txt[i];
            } else {
                newTxt += "'";
                break;
            }
        }

        if (typeTxt == type) {
            chkNo = 1;
        }
    }
    return newTxt;
}

// select절 테이블 찾기
function fndTableSel(txt) {
    var reg = /^[a-zA-Z_]*$/;
    // SELECT 수
    var selCnt = txt.split('SELECT').length - 1;
    // FROM 수
    var frmCnt = txt.split('FROM').length - 1;
    // WHERE 수
    var wheCnt = txt.split('WHERE').length - 1;
    // ORDER BY 수
    var ordCnt = txt.split('ORDER BY').length - 1;
    // GROUP BY 수
    var grpCnt = txt.split('GROUP BY').length - 1;
    var newTxt = '';
    var arr = [];
    var chkFrm = 0;

    // SELECT
    var cntSel = 0;

    for (let i = 0; i < txt.length; i++) {
        // SELECT 인덱스가 돌고있는 txt 인덱스와 같을 때
        var indexNoSel = -1;
        for (let k = 0; k < selCnt; k++) {
            indexNoSel = txt.indexOf('SELECT', indexNoSel + 1);
            if (i == indexNoSel) {
                chkFrm = 0;
                cntSel++;
            }
        }
        
        // FROM 인덱스가 돌고있는 txt 인덱스와 같을 때
        var indexNoFrm = 0;
        for (let k = 0; k < frmCnt; k++) {
            indexNoFrm = txt.indexOf('FROM', indexNoFrm + 1);
            if (i == indexNoFrm) {
                chkFrm = 1;
                cntSel--;
            }
        }
        
        // SELECT가 있을 때 괄호가 닫히면 (서브쿼리가 있을 때)
        if (cntSel > 0) {
            if (txt[i-1] == ')') {
                chkFrm = 0;
            }
        }
        
        // WHERE 인덱스가 돌고있는 txt 인덱스와 같을 때
        var indexNoWhe = 0;
        for (let k = 0; k < wheCnt; k++) {
            indexNoWhe = txt.indexOf('WHERE', indexNoWhe + 1);
            if (i == indexNoWhe) {
                chkFrm = 0;
            }
        }
        
        // ORDER BY 인덱스가 돌고있는 txt 인덱스와 같을 때
        var indexNoOrd = 0;
        for (let k = 0; k < ordCnt; k++) {
            indexNoOrd = txt.indexOf('ORDER BY', indexNoOrd + 1);
            if (i == indexNoOrd) {
                chkFrm = 0;
            }
        }
        
        // GROUP BY 인덱스가 돌고있는 txt 인덱스와 같을 때
        var indexNoGrp = 0;
        for (let k = 0; k < grpCnt; k++) {
            indexNoGrp = txt.indexOf('GROUP BY', indexNoGrp + 1);
            if (i == indexNoGrp) {
                chkFrm = 0;
            }
        }

        // 서브쿼리가 시작되면
        if (txt[i - 1] == '(') {
            chkFrm = 0;
        }

        // FROM절이면
        if (chkFrm == 1) {
            newTxt += txt[i];
        }

        // FROM절이 끝나고 newTxt(테이블 담은 스트링)이 비어있지 않으면
        if (chkFrm == 0 || (chkFrm == 1 && i == txt.length - 1)) {
            if (newTxt != '') {
                arr.push(newTxt);
            }
            newTxt = '';
        }
    }

    // arr에서 스네이크 양식만 뽑기
    var returnArr = [];
    var regStr = /[^a-zA-Z_]/g;
    var str = '';
    for (let i = 0; i < arr.length; i++) {
        var strArr = arr[i];
        var strArr = strArr.split(',');
        for (let k = 0; k < strArr.length; k++) {
                var strArrStr = strArr[k];
                strArrStr = strArrStr.replaceAll('FROM', '');
                strArrStr = strArrStr.replace(regStr, '');
                if (strArrStr != '') {
                    returnArr.push(strArrStr);
                }
        }
    }

    return returnArr;
}

// 테이블 양식 입력 때 테이블 찾기
function getTableFrm(txt) {
    var arr = chkTableFrm(txt);
    var newTxt = '';
    var regStr = /[^a-zA-Z_]/g;

    for (let i = 0; i < arr.length; i++) {
        var getArr = arr[i].replace(regStr, '');
        if (i != 0) {
            newTxt += ", ";
        }
        newTxt += "'";
        newTxt += getArr;
        newTxt += "'";
        if (i != arr.length - 1) {
            newTxt += "\n";
        }
    }

    return newTxt;
}

// 테이블 양식 입력 때 테이블 찾기
function chkTableFrm(txt) {
    // 줄바꿈 -> 띄어쓰기
    txt = txt.replaceAll('\n', ' ');
    // 띄어쓰기 기준 배열
    var arr = txt.split(' ');
    var regStr = /[^a-zA-Z_]/g;

    // 테이블 양식 수
    var cnt = document.querySelectorAll('input[name=tableFrm]').length;
    var frmArr = [];

    // 테이블 양식 배열
    for (let i = 0; i < cnt; i++) {
        var frmVal = document.getElementById('tableFrm' + i).value;
        if (frmVal != '') {
            frmArr.push(frmVal);
        }
    }
    
    var newArr = [];
    for (let i = 0; i < arr.length; i++) {
        var arrTxt = arr[i].replace(regStr, '');
        for (let k = 0; k < frmArr.length; k++) {
            // 테이블 양식에 맞으면 배열에 추가
            if (arrTxt.indexOf(frmArr[k]) > -1) {
                newArr.push(arrTxt)
            }
        }
    }

    return newArr;
}