// define format
const legalVideoFormats = [
    "mp4", "flv", "avi", "mov", "mkv", "mpeg", "3gp", "wmv", "swf" // dapend on request
];
window.URL = window.URL || window.webkitURL // merge new and old URL tool

// initial
$(function(){
    $("#inputFile").on("change", function(e){
        $("table").empty();
        $("table").append("<tr><th>檢核項目</th> <th>需求規格</th> <th>檢查結果</th> <th>是否通過</th></tr>");
        // debugger;
        processFile(e.target.files);
    });
    $("#dropbox").on("dragenter", dragenter);
    $("#dropbox").on("dragleave", dragleave);
    $("#dropbox").on("dragover", dragover);
    $("#dropbox").on("drop", drop);
});

// drag related
function dragenter() {
    $("#dropbox").css("border", "5px solid gray");
    $("#dropbox").text("Drop it!");
}

function dragleave() {
    $("#dropbox").css("border", "5px dashed gray")
    $("#dropbox").text("Choose file by the button below or Drop here.");
}

function dragover(e) {
    e.preventDefault(); // 取消預設網頁動作
}

function drop(e) {
    e.preventDefault();
    // debugger;
    let files = e.originalEvent.dataTransfer.files; // jQuery 才有
    if(files.length == 0){
        return false;
    }
   
    $("table").empty();
    $("table").append("<tr><th>檢核項目</th> <th>需求規格</th> <th>檢查結果</th> <th>是否通過</th></tr>");
    processFile(files);
    dragleave(); // 讓框框恢復原狀
}



function processFile(files) {
    let thisVideo = files[0]; // No1 file
    $("table").append($(`<tr><td colspan="4">影片名稱：${thisVideo.name}</td></tr>`).css("background-color", "yellow"));
    $("table").append($(`<tr><td>影片長度</td><td>須介於60~90秒</td><td id="thisDuration"></td><td id="thisDurationResult"></td></tr>`));
    $("table").append($(`<tr><td>影片格式</td><td> "mp4", "flv", "avi", "mov", "mkv", "mpeg", "3gp", "wmv", "swf"</td><td id="thisFormat">${thisVideo.type}</td><td id="thisFormatResult"></td></tr>`));
    var thisFileType = thisVideo.type.split("/"); // string split to list
    if(thisFileType[0] == 'video'){
        if(legalVideoFormats.indexOf(thisFileType[1])!=-1) { // -1 means false indexof check
            $("#thisFormatResult").text("O").css("color", "green");
        }else{
            $("#thisFormatResult").text("X").css("color", "red");
        } 

    }else{
        $("#thisFormatResult").text("非影片格式").css("color", "red");
    }

    $("table").append($(`<tr><td>解析度</td><td>720p(1280*720)以上</td><td id="thisResolution"></td><td id="thisResolutionResult"></td></tr>`));

    let videoElement = document.createElement('video');
    videoElement.preload = 'metadata';
    videoElement.onloadedmetadata = function(){
        thisVideo.duration = videoElement.duration;
        thisVideo.videoWidth = videoElement.videoWidth;
        thisVideo.videoHeight = videoElement.videoHeight;
        $("#thisDuration").text(thisVideo.duration);
        $("#thisResolution").text(thisVideo.videoWidth + "*" + thisVideo.videoHeight);
        if(thisVideo.duration>=60 && thisVideo.duration<91){
            $("#thisDurationResult").text("O").css("color", "green");
        }else{
            $("#thisDurationResult").text("X").css("color", "red");
        }

        if(thisVideo.videoWidth>=1280 && thisVideo.videoHeight>=720) {
            $("#thisResolutionResult").text("O").css("color", "green");
        }else{
            $("#thisResolutionResult").text("X").css("color", "red");
        }
    };
    videoElement.src = URL.createObjectURL(thisVideo);

}



