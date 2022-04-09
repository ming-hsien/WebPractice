$(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    var topicCount = topic.length;

    let second_perday = 24*60*60*1000;
    var current_second = startDate.getTime();

    for(var x=0;x<topicCount;x++){
        $("#courseTable").append(
            `<tr><td>${x+1}</td>
            <td>${(new Date(current_second+7*x*second_perday).toLocaleDateString()).slice(5)}</td>
            <td>${topic[x]}</td></tr>`
        );
    }

    $("#search").on("click",function(){
        var date = new Date($('#searchdate').val())
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        
        if (date=="Nan"){
            alert("請輸入正確時間");
        }
        else{
            $("#courseTable").find("tr").removeClass("addcolor");
            let buffer="";
            $("#courseTable").find("tr").each(function(){
                var tdArr = $(this).children();
                var opDate = tdArr.eq(1).text();
                opDate = opDate.split("/");
                if (month==opDate[0] && day==opDate[1]){
                    buffer = $(this);
                }
            })
            if (buffer==""){
                alert("未查到行程");
            }
            else{
                buffer.addClass("addcolor");
            }     
        }
    })
});