// deal with click process
$(function(){
    $("#getfoods").on("click",function(){
        var numberOfListItem = $("li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        $("#imageHere").empty();
        //debugger;
        //不重複
        while($("#options li").eq(randomChildNumber).text()==$("h1").text()){
            randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        }           
        $("h1").text($("li").eq(randomChildNumber).text());
        $("#imageHere").append(`<img src="./images/${$("li").eq(randomChildNumber).text()}.jpeg" width=50% height=50%>`);
    })

    //Add new food
    $("#addfoods").on("click",function(){
        var foodname = $("#food_name").val();
        if (foodname=="") {          
            alert ("請填妥資料");
        }
        else{
            var foodlist = get_foodlist();
            if ($.inArray(foodname,foodlist)>=0){
                alert("勿新增重複資料");
            } 
            else{
                add_food(foodname);
                alert("新增成功");
                $("#options").append(`<li>${foodname}</li>`);
            }  
        } 
    })

    $("#deletefoods").on("click",function(){
        var foodname = $("#food_name").val();
        if (foodname=="") {          
            alert ("請填妥資料");
        }
        else{
            var foodlist = get_foodlist();
            if ($.inArray(foodname,foodlist)>=0){
                delete_food($.inArray(foodname,foodlist));
                alert("刪除成功");
                $("#options").empty();
                foodlist = get_foodlist();
                foodlist.forEach(function(element){
                    $("#options").append(`<li>${element}</li>`);
                });
            } 
            else{
                alert("查無此資料!");
            }
        } 
    })

})

// print foods (initial)
$(function(){
    var foodlist = get_foodlist();
    foodlist.forEach(function(element){
        $("#options").append(`<li>${element}</li>`);
    });
})