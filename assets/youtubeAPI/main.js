let player;
let currentPlay = 0;
// YouTube API Ready
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player", {
        height: "390",
        width: "640",
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
            //when the player's state is change => onStateChange
            onStateChange: onPlayerStateChange
        }
    });

}
// YouTube Play Ready
function onPlayerReady(event){
    $("#playButton").on("click", function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}
//Player State Change
function onPlayerStateChange(event){
    console.log(event.data);
    //check from youtube iframe API doc.
    // event.data
    // 1 playing
    // 2 pause
    // 0 ended
    // -1 unstarted
    // 3 buffering
    // 5 video cued
    if(Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]){
    // because time has shown as float , Math.floor to get int
        if(currentPlay < playList.length-1){
            currentPlay++;
            player.loadVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "latrge"
            });
        }else{
            currentPlay = 0;
            player.cueVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "latrge"
            });
        }
        if(event.data==1){
            $("h2").text(player.getVideoData().title);
        }
    };


}
