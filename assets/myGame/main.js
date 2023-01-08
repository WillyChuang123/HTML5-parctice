// mapArray: map element data
// ctx: HTML5 Canvas
// currrentImgMain: x, y location
// imgXXX: image object
let mapArray, ctx, currentImgMain;
let imgBrick, imgMain, imgTablet
const gridLength = 200;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}
// initial
$(function () {
    mapArray = [
        [0, 1, 1, 3, 0, 1],
        [0, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1],
        [2, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 4]
    ];
    ctx = $('#myCanvas')[0].getContext('2d');

    // main role
    imgMain = new Image();
    imgMain.src = "./img/AjFP5.png";
    currentImgMain = {
        "x": 0,
        "y": 0
    };
    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 60, 60, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };
    var sources = {
        brick: './img/brick-wall2.png',
        tablet: './img/tablet.png'
    };
    loadImages(sources, function (images) {
        for (var x in mapArray) {
            for (var y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    ctx.drawImage(images.brick, 0, 0, 500, 500, y * gridLength, x * gridLength, gridLength, gridLength);

                } else if (mapArray[x][y] == 2) {
                    ctx.drawImage(images.tablet, 0, 0, 500, 500, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    ctx.drawImage(images.tablet, 0, 0, 500, 500, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });
})

// User Event
$(document).on("keydown", function (event) {
    let targetImg, targetBlock, cutImagePositionX, cutImagePositionY;
    targetImg = { // disappear & event activate
        "x": -1,
        "y": -1
    };
    targetBlock = {
        "x": -1,
        "y": -1
    };
    event.preventDefault(); // cancel default action
    // console.log(event.code);
    switch (event.code) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 0;
            cutImagePositionY = 70;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 0;
            cutImagePositionY = 200;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 0;
            cutImagePositionY = 130;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            cutImagePositionY = 0;
            break;
    }
    //Confirm the main role will not leave the map
    if (targetImg.x <= 1000 && targetImg.x >= 0 && targetImg.y <= 1000 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    //clear main role
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    //talkBox
    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0:
                $('#talkBox').text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                $('#player').css("display", "none");
                $('#playButton').css("display","none");
                $('#jokeImg').css("display","none");
                break;
            case 1:
                $('#talkBox').text("oops!");
                break;
            case 2:
                $('#talkBox').text("watch Video blow");
                $('#player').css("display", "block");
                $('#playButton').css("display","block");
                break;
            case 3:
                $('#talkBox').text("watch Video blow");
                $('#jokeImg').append('<img src="./img/haha.jpg">');
                $('#jokeImg').append('<img src="./img/wow.gif">');
                $('#jokeImg').css("display","block");


                break;
            case 4:
                $('#talkBox').text("Congratulation!!");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
        }
    }else{
        $('#talkBox').text("Danger!!");
    }
    ctx.drawImage(imgMain, cutImagePositionX, cutImagePositionY, 60, 60, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

})

// youtube
let player;
let currentPlay = 0;
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player", {
        height: "800",
        width: "1200",
        videoId: playList[currentPlay],
        playerVars: {
            autoplay: 0, //autoplay y/n
            controls: 0, //control y/n
            start: playTime[currentPlay][0],//start sec
            end: playTime[currentPlay][1],//end sec
            iv_load_policy: 3
        },
        events: {
            //when the video player is ready => onReady
            onReady: onPlayerReady,
        }
    });
}
// YouTube Play Ready
function onPlayerReady(event){
    $("#playButton").on("click", function(){
        player.playVideo();
    });
}