$(function () {
    // debugger; // 中斷指令，並能在網頁的 console 確認當下 jQuery 有抓到哪些元件
    // Load Video : set video element's src
    // find video element
    // document.getElementById("myVideo") == $("myVideo")
    $("#myVideo").attr("src", "sample-mp4-file.mp4");

    // set Play Button <-- click event ..xxxx
    // onckick, addEventListner
    $("#playBtn").on("click", function () {
        // add volumeDisplay and progressBar controler
        $("#volumeDisplay").text($("#myVideo")[0].volume.toFixed(2));
        $("#progressBar")[0].max = $("#myVideo")[0].duration;
        // debugger; //check with console



            // console.log("Yo"); // test
            // 1. Play Video or Pause Video <-- Check Video Current Status
            // 2. Set Button Text
            // jQuery 要手動指定[0]才能帶入到該元件<video>
            // $("#myVideo") 會指定到video#myVideo [0] 才會是 <video>)
        if ($("#myVideo")[0].paused) {
            $("#myVideo")[0].play();
            $("#playBtn").text("Pause");
        }
        else {
            $("#myVideo")[0].pause();
            $("#playBtn").text("Play");
        }
    });
    $("#fullBtn").on("click", function () {
        $("#myVideo")[0].webkitEnterFullscreen();
    });

    // onckick lowerVolumeBtn higherVolumeBtn
    // 
    $("#lowerVolumeBtn").on("click", downVolume);
    $("#higherVolumeBtn").on("click", upVolume);
    $("#myVideo").on("timeupdate", updateProgress); // 接收myvideo 的 timeupdate 獲取時間
    $("#progressBar").on("change",changeProgress);
});

function downVolume(){
    var myVideo = $("#myVideo")[0];
    if(myVideo.volum == 0){ // no action
    }
    else if(myVideo.volume <0.1){
        myVideo.volume = 0;
    }
    else{
        myVideo.volume = myVideo.volume - 0.1;
    }
    // display
    $("#volumeDisplay").text(myVideo.volume.toFixed(2));
}

function upVolume(){
    var myVideo = $("#myVideo")[0];
    if(myVideo.volum == 1){ // no action
    }
    else if(myVideo.volume > 0.9){
        myVideo.volume = 1;
    }
    else{
        myVideo.volume = myVideo.volume + 0.1;
    }
    // display
    $("#volumeDisplay").text(myVideo.volume.toFixed(2));
}

function updateProgress(){
    $("#timeDisplay").text(Math.floor($("#myVideo")[0].currentTime));
    // $("#timeDisplay").append("/" + Math.floor( $("#myVideo")[0].duration)+"秒");
    $("#timeDisplay").append(`/ ${Math.floor( $("#myVideo")[0].duration)} 秒`);
    $("#progressBar")[0].value = $("#myVideo")[0].currentTime;
}

function changeProgress(){
    $("#myVideo")[0].pause();
    $("#myVideo")[0].currentTime = $("#progressBar")[0].value;
    $("#myVideo")[0].play();
}