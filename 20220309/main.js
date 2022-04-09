$(function(){
    //儲存目前作答到第幾題
    var currentQuiz = null;
    //當按鈕按下後，要做的事情
    $("#submit").on("click",function(){
        if(currentQuiz==null){
            //設定目前作答從第0題開始
            currentQuiz=0;
            //顯示題目
            $("#question").text(questions[0].question);
            //將選項區清空(可以試著先不寫)
            $("#options").empty();
            //將選項逐個加入
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name='options' type='radio'
                    value='${index}'><label>${element[0]}</label><br><br>`);
            });
            $("#submit").attr("value","Next");
        }
        else{
            //已經開始作答從這邊繼續
            //巡訪哪一個選項有被選取
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        //通往最終結果
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //顯示最終結果的標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        //將選項區域清空
                        $("#options").empty();
                        //顯示最終結果內容
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz=null;
                        $("#submit").attr("value","重新開始");
                    }
                    else{
                        currentQuiz = questions[currentQuiz].answers[i][1]
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='options' type='radio'
                                value='${index}'><label>${element[0]}</label><br><br>`);
                        });  
                        $("#submit").attr("value","Next");
                    }
                    return false; //跳離迴圈的方式
                }
            });
        }
    });
});