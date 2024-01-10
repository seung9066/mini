// map : {'url':url, 'data'::data}
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