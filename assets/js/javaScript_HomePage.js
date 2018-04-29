function showMenu() {
    var menu = document.getElementsByClassName("menuItem");
    for (var i = 0; i < menu.length; i++) {
        if (menu[i].style.display == "none") {
                menu[i].style.display = "block";
        } else {
            menu[i].style.display = "none";
        }
    }
  
}

//Show list of new products when user click on "Sản phẩm mới về" on menu bar
function showNewProducts() {
    var listPro = document.getElementsByClassName("newProducts");
    var bestSeller = document.getElementsByClassName("bestSellers");
    var hightest = document.getElementsByClassName("highestView");
    for (var i = 0; i <listPro.length; i++) {
        //Hidden list of best seller products and highest view products
        if (bestSeller[i].style.display != "none") {
            bestSeller[i].style.display = "none";
        } 
        if (hightest[i].style.display != "none") {
            hightest[i].style.display = "none";
        } 

        //Show list of new products
        listPro[i].style.display = (listPro[i].style.display == "none") ? "block" : "none";

    }
}

//Show list of best seller products when user click on "Sản phẩm bán chạy nhất" on menu bar
function showBestSellers() {
    var listPro = document.getElementsByClassName("bestSellers");
    var newPro = document.getElementsByClassName("newProducts");
    var hightest = document.getElementsByClassName("highestView");
    for (var i = 0; i <listPro.length; i++) {
        //Hidden list of new products and highest view products
        if (newPro[i].style.display != "none") {
            newPro[i].style.display = "none";
        } 
        if (hightest[i].style.display != "none") {
            hightest[i].style.display = "none";
        } 
        
        //SHow lít of best seller products
        listPro[i].style.display = (listPro[i].style.display == "none") ? "block" : "none";
    }
}

//Show list of products having highest view when user click on "Sản phẩm có lượt xem nhiều nhất" on menu bar
function showHighestViewPro() {
    var listPro = document.getElementsByClassName("highestView");
    var bestSeller = document.getElementsByClassName("bestSellers");
    var newPro = document.getElementsByClassName("newProducts");
    for (var i = 0; i <listPro.length; i++) {
       //Hidden list of new products and highest view products
       if (newPro[i].style.display != "none") {
        newPro[i].style.display = "none";
        } 
        if (bestSeller[i].style.display != "none") {
            bestSeller[i].style.display = "none";
        } 
    
    //SHow lít of best seller products
        listPro[i].style.display = (listPro[i].style.display == "none") ? "block" : "none";
    }
}

function bookingCamera() {
    alert("Đặt hàng thành công!");
    window.location.href = "../Userpages/userHomePage.html";
}

function convertStrToInt(str) {
    alert("true");
    var result;
    var pos = str.indexOf(".");
    while (pos != -1) {
        result = str.substr(pos, 1);
        alert(result);
    }
    alert(result);
}

function deleteOrder(num) {
    var item1 = document.getElementsByClassName("editOrder")[num];
    item1.style.display = "none";

    var item2 = document.getElementsByClassName("productsInfo")[num];
    item2.style.display = "none";
}

function increaseNumProduct(num) {
    var item = document.getElementsByClassName("numProduct")[num].value;
    var currentPrice = document.getElementsByClassName("price")[num].textContent;

    item = parseInt(item);
    var unitPrice = currentPrice / item;

    //show changement of number of products
    item += 1;
    document.getElementsByClassName("numProduct")[num].value = item;

    //change price of product
    document.getElementsByClassName("price")[num].textContent = unitPrice*item;
}

function decreaseNumProduct(num) {
    var item = document.getElementsByClassName("numProduct")[num].value;
    item = parseInt(item);
    if (item < 1) {
        return;
    }
    item -= 1;
    document.getElementsByClassName("numProduct")[num].value = item; 
}