$(function() {
    $("[type='color']").on("change",changeBgColor);

});

function changeBgColor(){
    var thisColor = this.value;
    // console.log(thisColor);
    document.body.style.backgroundColor = thisColor;
    
    // demo 
    // $('body').css("background-color", thisColor);
}