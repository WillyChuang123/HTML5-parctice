// initial
$(function(){
    $("#dropbox").on("dragenter", dragenter);
    $("#dropbox").on("dragleave", dragleave);
    $("#dropbox").on("dragover", dragover);
    $("#dropbox").on("drop", drop);
});

function dragenter() {
    $("#dropbox").css("background-color", "red")
    $("#dropbox").text("Drop it!");
}

function dragleave() {
    $("#dropbox").css("background-color", "blanchedalmond")
    $("#dropbox").text("Come here.");
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
    convert(files[0]);
}
function convert(file){
    // debugger;
    // check file.type
    if(!file.type.match(/text.*/)){ // if not text
        alert('請拖放文字檔');
        dragleave();
        return false;
    }

    let reader = new FileReader();

    reader.onloadend = function(){
        let s = reader.result;
        $("#preview").text(s);
        dragleave();
    };
    reader.readAsText(file);

}



// report.innerHTML = "hug";
