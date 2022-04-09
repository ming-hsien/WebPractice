function add_food(foodname){
    var foodlist = localStorage.getItem("foodname");
    var obj = JSON.parse(foodlist);
    obj.push(foodname);
    console.log(obj);
    localStorage.setItem("foodname", JSON.stringify(obj));
}

function delete_food(foodindex){
    var foodlist = localStorage.getItem("foodname");
    var obj = JSON.parse(foodlist);
    obj.splice(foodindex,1);
    localStorage.setItem("foodname", JSON.stringify(obj));
}

function get_foodlist(){
    var foodlist = localStorage.getItem("foodname");
    var obj = JSON.parse(foodlist);
    return obj;   
}

var foodlt = ['拉麵','滷肉飯','水餃'];
localStorage.setItem("foodname", JSON.stringify(foodlt));
// for(var i =0;i<foodlt.length;i++){
//     add_food(foodlt[i]);
// }
