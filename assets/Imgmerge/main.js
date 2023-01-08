const inputImgFormats = [
    "jpeg", "jpg", "png"
];
window.URL = window.URL || window.webkitURL 
let image1 = null;
let image2 = null;
$(function(){
    $("#inputImg1").on("change", function(e){
        image1 = e.target.files[0];
        preImg1();
        console.log(image1);
        console.log(image2);
        console.log(e);
        if(image1 && image2) {
            mergeImages();
        }
    });
    
    $("#inputImg2").on("change", function(e){
        image2 = e.target.files[0];
        preImg2();
        console.log(image1);
        console.log(image2);
        console.log(e);
        if(image1 && image2) {
            mergeImages();
        }
    });
    function preImg1() {
        if(!image1.type.match(/image.*/)){
            alert('we need Image');
            return false;
        }
        let prefrontImgsrc = URL.createObjectURL(image1);
        $("#dropbox1").empty();
        $("#dropbox1").css("background-image", `url(${prefrontImgsrc})`)
        .css("background-size", "contain")
        .css("background-repeat", "no-repeat")
        .css("border","5px solid gray");
    }
    function preImg2() {
        if(!image2.type.match(/image.*/)){
            alert('we need Image');
            return false;
        }
        let prebackImgsrc = URL.createObjectURL(image2);
        $("#dropbox2").empty();
        $("#dropbox2").css("background-image", `url(${prebackImgsrc})`)
        .css("background-size", "contain")
        .css("background-repeat", "no-repeat")
        .css("border","5px solid gray");
    }
    function mergeImages () {
        let image1Url = URL.createObjectURL(image1);
        let image2Url = URL.createObjectURL(image2);
        $("#mergeResult").css("background-image", `url(${image1Url}), url(${image2Url})`)
        .css("background-size", "contain")
        .css("background-repeat", "no-repeat")
        .css("border","5px solid gray");;
    }
    
  
});
console.log(image1);
console.log(image2);
// image1 & image2 was declared as global scope when function{ image1 = e.target.files}
// above console.log(image1); was conducted prior to change event 
