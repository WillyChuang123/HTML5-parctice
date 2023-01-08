$(function(){
    $("[type='checkbox']").on("change",updateProgress);
});
function updateProgress(){
    let hasChecked = 0;
    for (let x=0; x<$("[type='checkbox']").length; x++){ // 會一直確認三個checkbox 是否被勾起來
        if ($("[type='checkbox']")[x].checked){
            hasChecked += 1;
        }
    }
    $("meter").attr("min", 0);
    $("meter").attr("max", $("[type='checkbox']").length);
    $("meter").attr("value", hasChecked);

    // progress max = 1
    $("progress").attr("value", hasChecked / $("[type='checkbox']").length);

    $("#myRange").attr("max", $("[type='checkbox']").length);
    $("#myRange").attr("value", hasChecked);

}