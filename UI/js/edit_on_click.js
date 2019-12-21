function editOnClick(element) {
    var oldvalue = element.innerHTML;
    //建立新的input元素
    var newobj = document.createElement('input');
    //為新增元素新增型別
    newobj.type = 'text';
    //為新增元素新增value值
    newobj.value = oldvalue;
    
    //設定該標籤的為不顯示
    element.setAttribute("style", "display:none");

    //新增該標籤的子節點，input物件
    element.parentElement.appendChild(newobj);
    //設定選擇文字的內容或設定游標位置（兩個引數：start,end；start為開始位置，end為結束位置；如果開始位置和結束位置相同則就是游標位置）
    newobj.setSelectionRange(0, oldvalue.length);
    //設定獲得游標
    newobj.focus();

    //為新增元素新增游標離開事件
    newobj.onblur = function() {
        element.innerHTML = this.value == oldvalue ? oldvalue : this.value;
        //當觸發時判斷新增元素值是否為空，為空則不修改，並返回原有值 
        element.setAttribute("style","");
        newobj.remove();
    }
}