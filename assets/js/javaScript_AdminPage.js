var header = document.getElementById("menu-bar");
var btns = header.getElementsByClassName("adminRole");
//alert("step 2");
for (var i = 0; i < btns.length; i++) {
    
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    })
}

/*
//**************************  QUẢN LÝ SẢN PHẨM *********************
//Hiển thị menu để lựa chọn danh sách sản phẩm
function showOptionToViewProduct() {
    var qlsp = document.getElementsByClassName("viewPro")[0];

    var listOption = document.getElementsByClassName("detailOption")[0];
    var button
    if (listOption.style.display == "none") {
        listOption.style.display = "block";
    } else {
        listOption.style.display = "none";
    }  
}

function addNewProduct() {
    var formToAddNew = document.getElementsByClassName("addNewForm")[0];
    //if (formToAddNew.style.display == "none") {
        formToAddNew.style.display = "block";

}

function closeFormAddNew() {
    var formToAddNew = document.getElementsByClassName("addNewForm")[0];
    //if (formToAddNew.style.display == "none") {
        formToAddNew.style.display = "none";
}


//**************************  XEM TÀI KHOẢN *********************
function xemTaiKhoan() {
    var account = document.getElementsByClassName("showAccount")[0];
    if (account.style.display == "none") {
     account.style.display = "block";
    } else {
        account.style.display = "none";
    }
}


//********************************  ĐĂNG XUẤT ***************************
function logout() {
    `<h2>safda</h2>;`;
}*/

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
