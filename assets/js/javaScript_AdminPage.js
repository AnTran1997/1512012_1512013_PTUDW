$('input[type="checkbox"]').on('change', function(){
    $('input[type="checkbox"]').not(this).prop('checked', false);
})

function dropDown(nameClass) {
    var item = document.getElementsByClassName(nameClass);
    for (var i = 0; i < item.length; i++) {
        if (item[i].style.display == "none") {
            item[i].style.display = "block";
        } else {
            item[i].style.display = "none";
        }
    }
}

function closeFormAddNew() {
    alert("Thêm sản phẩm mới thành công!");

    //Display addnew form thành none
    var formToAddNew = document.getElementsByClassName("addNewForm")[0];    
    formToAddNew.style.display = "none";

    //Chuyển trang chủ dashboard
    window.location.href = "../../pages/AdminPages/adminHomePage.html";

}
