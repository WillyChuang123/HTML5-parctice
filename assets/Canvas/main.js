let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
// mapArray 決定地圖中每個格子的元素
// ctx HTML5 Canvas
// currentImgMainX, currentImgMainY 決定主角所在座標
// imgMountain, imgMain, imgEnemy 障礙物 主角 敵人 的圖片物件
const gridLength = 200;
// 定義出九宮格，並且不會再改變

// new method function
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  }

// 網頁載入完成後初始化動作
$(function(){
    mapArray = [ //  0-可走, 1-障礙物, 2-終點, 3-敵人
        [0,1,1],
        [0,0,0],
        [3,1,2]
    ];
    // define canvas mode as 2d 
    ctx = $("#myCanvas")[0].getContext("2d");
    
    // place the main character
    // Image() maybe need more loading time ==> preload
    imgMain = new Image(); // use img function
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x":0,
        "y":0
    };

    imgMain.onload = function(){ // preload img
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
         // draw img (slice orignal img to new style) (img,sx,sy,swidth,sheight,x,y,width, height)
    }

// 試用網路的多張圖載入方法

  var sources = {
    mountain: 'images/material.png',
    enemy: 'images/Enemy.png'
  };

  loadImages(sources, function(images) {
    for (var x in mapArray) {
        for (var y in mapArray[x]){
            if (mapArray[x][y] == 1) {
                ctx.drawImage(images.mountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
            } else if (mapArray[x][y] == 3) {
                ctx.drawImage(images.enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
            }
        }
    }
  });
});

// 處理使用者按下按鍵 (event) 會有傳入值，event 可自訂名稱
$(document).on("keydown", function(event){
    let targetImg, targetBlock, cutImagePositionX;
    // cutImagePositionX - 決定主角臉朝向
    targetImg = { // 主角的目標座標
        "x": -1, 
        "y": -1
    };
    targetBlock = { // 主角的目標(對應二維陣列)
        "x": -1,
        "y": -1
    };
    event.preventDefault();
    // 避免鍵盤預設行為發生，如捲動/放大/換頁
    // 判斷使用者按下的案件並推算目標座標
    // console.log(event.code); 確認是否接收到鍵盤輸入訊息
    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175; // Face Left
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355; // Face Up
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540; // Face Right
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0; // Face Down
            break;
        default: // Other key - no effect
            return;
    }

    // confirm the Main rule will not leave the map
    if (targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >=0){ // 同時符合條件，限制在畫布範圍中
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    //clear orig. main role
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if(targetBlock.x != -1 && targetBlock.y != -1){
        // check Map data
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: // can go
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: // Mountain
                $("#talkBox").text("有山");
                break;
            case 2: // can go - Final stop
                $("#talkBox").text("終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: // Enemy
                $("#talkBox").text("Hello");
                break;
        }

    }else{
        $("#talkBox").text("邊界");
    }
    // reDraw Main role
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
});