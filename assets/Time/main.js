var ctx, thisImage;
$(function(){
    $("[type='date']").on("change",showDate);
    ctx = $("#myCanvas")[0].getContext("2d");
});

function showDate(){
    var thisDate = this.value;
    console.log(thisDate);
    // debugger check thisDate console result
    // type of thisDate= string '2022-12-15' 
    // require 20221215 so "-" should be replace
    thisDate = thisDate.replace(/-/g, ""); // g means global
    console.log(thisDate);
    thisImage = new Image();
    thisImage.src = "flipClockNumbers.png";
    thisImage.onload = function () {
        for (var x=0; x<thisDate.length; x++) {
            ctx.drawImage(thisImage, thisDate[x]*80, 0, 90, 130, 60*x, 0, 60, 100);
        }
    };

}