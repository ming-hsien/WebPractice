let ctx;
const gridLength = 80;

function draw_initial(){
    ctx = $("#myCanvas")[0].getContext("2d");
    player1 = new Image();
    player1.src = "images/l13.png";
    p1_pos = {
        "x":0,
        "y":480
    };

    player2 = new Image();
    player2.src = "images/r12.png";
    p2_pos = {
        "x":880,
        "y":480
    };

    ball = new Image();
    ball.src = "images/volleyball.png";
    ball_pos = {
        "x": p1_pos.x+50,
        "y": p1_pos.y-30
    }

    player1.onload = function(){
        ctx.drawImage(player1,p1_pos.x,p1_pos.y,120,120);
    }

    player2.onload = function(){
        ctx.drawImage(player2,p2_pos.x,p2_pos.y,120,120);
    }

    ball.onload = function(){
        ctx.drawImage(ball,ball_pos.x,ball_pos.y,40,40);
    }
}

// function choose_cat(){

// }

function clear_and_restart(){
    ctx.clearRect(p1_pos.x, p1_pos.y, 120, 120);
    ctx.clearRect(p2_pos.x, p2_pos.y, 120, 120);
    draw_initial();
}

$(function(){
    draw_initial();
    var refresh;
    let ball_speed=25;

    $('#ballspeed').on('change', function() {
        ball_speed = 30-$(this).val()*5;
    });

    $("#start").on("click",function(){
        let dx = 4;
        let dy = -4;
        let count = 0;
        if (refresh){
            clearInterval(refresh);
        }
        refresh = setInterval(draw_ball, ball_speed);
        
        function draw_ball() {
            ctx.clearRect(ball_pos.x, ball_pos.y, 40, 40);
            if (ball_pos.x+dx>=990 || ball_pos.x+dx<=10){
                dx*=-1;
            }
            if (ball_pos.y+dy<=10){
                dy*=-1;
            }

            // P1 VS P2
            let p1_ball_dist = Math.sqrt(Math.pow(ball_pos.x-(p1_pos.x+60),2)+Math.pow(ball_pos.y-(p1_pos.y),2));
            let p2_ball_dist = Math.sqrt(Math.pow(ball_pos.x-(p2_pos.x+30),2)+Math.pow(ball_pos.y-(p2_pos.y),2));

            if ((p1_ball_dist<=60 || p2_ball_dist<=60) && count>=100/ball_speed*5){
                // let tan_ = (ball_pos.y-p1_pos.y)/(ball_pos.x-p1_pos.x-120);
                dx*=-1;
                dy*=-1;
                count=0;
            }

            //判斷輸贏
            if (ball_pos.y>=590 && ball_pos.x>=520){
                alert("Player1 Win!");
                clearInterval(refresh);
                clear_and_restart();
            }
            else if (ball_pos.y>=590 && ball_pos.x<=480){
                alert("Player2 Win!");
                clearInterval(refresh);
                clear_and_restart();
            }

            //重新設定球的位置
            ball_pos.x += dx;
            ball_pos.y += dy;
            ctx.drawImage(ball,ball_pos.x,ball_pos.y,40,40);
            count++;
        }

        $('#ballspeed').on('change', function() {
            ball_speed = 30-$(this).val()*5;
            clearInterval(refresh);
            refresh = setInterval(draw_ball, ball_speed);
        });
    })
});

//Player1
$(document).on("keydown",function(event){
    // let targetImg, targetBlock, cutImagePositionX;
    targetImg1 = {
        "x":p1_pos.x,
        "y":p1_pos.y
    };
    //避免鍵盤預設行為發生，如捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標
    event.preventDefault();
    switch(event.code){
        case "KeyA":
            targetImg1.x= p1_pos.x- gridLength;
            targetImg1.y= p1_pos.y;
            break;

        case "KeyW":
            targetImg1.x= p1_pos.x;
            targetImg1.y= p1_pos.y -gridLength;
            break;

        case "KeyD":
            targetImg1.x= p1_pos.x+ gridLength;
            targetImg1.y= p1_pos.y;
            break;

        case "KeyS":
            targetImg1.x= p1_pos.x;
            targetImg1.y= p1_pos.y+ gridLength;
            break;
        
        default:
            return;
    }
    if (targetImg1.x<=360 && targetImg1.x>=0 && targetImg1.y>=0 && targetImg1.y<=480){
        ctx.clearRect(p1_pos.x, p1_pos.y, 120, 120);
        p1_pos.x = targetImg1.x;
        p1_pos.y = targetImg1.y;
        ctx.drawImage(player1,p1_pos.x,p1_pos.y,120,120);
    } 
})

//Player2
$(document).on("keydown",function(event){
    // let targetImg, targetBlock, cutImagePositionX
    targetImg2 = {
        "x":p2_pos.x,
        "y":p2_pos.y
    };
    //避免鍵盤預設行為發生，如捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標
    event.preventDefault();
    switch(event.code){
        case "ArrowLeft":
            targetImg2.x= p2_pos.x- gridLength;
            targetImg2.y= p2_pos.y;
            break;

        case "ArrowUp":
            targetImg2.x= p2_pos.x;
            targetImg2.y= p2_pos.y -gridLength;
            break;

        case "ArrowRight":
            targetImg2.x= p2_pos.x+ gridLength;
            targetImg2.y= p2_pos.y;
            break;

        case "ArrowDown":
            targetImg2.x= p2_pos.x;
            targetImg2.y= p2_pos.y+ gridLength;
            break;
        
        default:
            return;
    }
    
    if(targetImg2.x>=520 && targetImg2.x<=880 && targetImg2.y>=0 && targetImg2.y<=480){
        ctx.clearRect(p2_pos.x, p2_pos.y, 120, 120);
        p2_pos.x = targetImg2.x;
        p2_pos.y = targetImg2.y;
        ctx.drawImage(player2,p2_pos.x,p2_pos.y,120,120);
    }
    
})