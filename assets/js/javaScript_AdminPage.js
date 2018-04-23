//**************************  QUẢN LÝ SẢN PHẨM *********************/
//Hiển thị menu để lựa chọn danh sách sản phẩm
function showOptionToViewProduct() {
    var listOption = document.getElementsByClassName("detailOption")[0];
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
    //if (formToAddNew.style.display == "none") {
     account.style.display = "none";
}


//********************************  ĐĂNG XUẤT ***************************
function logout() {
    '<h2>KFEwjfoiejwf</h2>';
}
