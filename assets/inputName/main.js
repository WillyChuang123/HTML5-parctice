$(function(){
    $("button").on("click", go);
});

const maleKeywords = ["雄", "強", "賢", "志", "威", "Jo"];
const femaleKeywords = ["芸", "芬", "佩" , "安" ,"Jo"];

let go = () => {
    // alert("hi");
    var inputText = $("#userInput").val(); // get input value jquery function
    const isMale = maleKeywords.some(thisElement => inputText.includes(thisElement));
    // .some array[string] true or false   // include() check whether array[string] include target keywords
    // only one parameter, () could not  ; function action return value /true or false {} could not include
    const isFemale = femaleKeywords.some(thisElement => inputText.includes(thisElement));
    if (isMale && isFemale) {
        $("h1").text("🫠");
    }else if(isMale){
        $("h1").text("🤪");
    }else if(isFemale){
        $("h1").text("🥰");
    }else{
        $("h1").text("😹");
    }
};