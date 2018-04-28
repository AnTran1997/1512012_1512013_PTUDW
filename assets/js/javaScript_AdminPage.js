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


function displayContent(nameClass) {
    var items = document.getElementsByClassName("isDisplayed");
    for (var i = 0; i < items.length; i++) {
        if (items[i].className == nameClass + " isDisplayed") {
            items[i].style.display = "block";
        } else {
            items[i].style.display = "none";
        }
    }
}

function addNewProduct() {
    var modal = document.getElementById('myModal');
    var icon = document.getElementsByClassName("fa-close")[0];
    var addbtn = document.getElementById("addBtn");
    modal.style.display = "block";
    icon.onclick = function() {
        modal.style.display = "none";
    }

    addbtn.onclick = function() {
        alert("Adding new product successfully");
        modal.style.display = "none";
        location.href = "https://www.google.com/";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function getCharts() {
    var ele = document.getElementById("brandCanvas");
    var col = ele.getContext("2d");
    var x = 40, h = 240, distance = 40, y = 240 - h; //x, y are coordinates and h is height of collumn
    var w = 70 //width of a collumn
    var colorBrand = ["#00ff00", "#b30000", "#cc00cc", "#008ae6"];
    var heightBrand = [57.6, 36, 103.2, 43.2];
    var percentBrand = ["24%", "15%", "43%", "18%"];
    var nameBrand = ["Canon", "Nikon", "Fujifilm", "Sony"];

    for (var i = 0; i < 4; i++) {
        h = heightBrand[i];
        y = 240 - h;
        //Display collumn statistic
        col.beginPath();
        col.rect(x, y, w, h);
        col.stroke();
        col.fillStyle = colorBrand[i];
        col.fill();

        //Display name of its brand
        col.font = "20px Helvetica";
        col.fillStyle = "black";
        col.fillText(nameBrand[i], x, 270);

        col.beginPath();
        col.font = "25px Helvetica";
        col.fillText(percentBrand[i], x + 10, y - 10);  
        
        x += w + distance;
    }
    col.beginPath();
    col.moveTo(20, 240);
    col.lineTo(460, 240);
    col.stroke();

    col.beginPath();
    col.moveTo(20, 20);
    col.lineTo(20, 240);
    col.stroke();


    //*******************  STATISTIC OF NUMBER OF PRODUCTS IN TYPES ********************
    ele = document.getElementById("typeCanvas");
    col = ele.getContext("2d");
    x = 70, h = 240, distance = 70, y = 240 - h; //x, y are coordinates and h is height of collumn
    w = 70 //width of a collumn
    var colorType = ["#ff6600", "#0099ff", "#00b300"];
    var heightType = [57.6, 115.2, 67.2];
    var percentType = ["24%", "48%", "28%"];
    var nameType = ["Máy cơ", "Kỹ thuật số", "Máy lấy liền"];

    for (var i = 0; i < 3; i++) {
        h = heightType[i];
        y = 240 - h;
        col.beginPath();
        col.rect(x, y, w, h);
        col.stroke();
        col.fillStyle = colorType[i];
        col.fill();

    //Display name of its type
    col.font = "20px Helvetica";
        col.fillStyle = "black";
        col.fillText(nameType[i], x, 270);

        col.beginPath();
        col.font = "25px Helvetica";
        col.fillText(percentType[i], x + 10, y - 10);  
        x += w + distance;
    }      
    col.beginPath();
    col.moveTo(20, 240);
    col.lineTo(450, 240);
    col.stroke();

    col.beginPath();
    col.moveTo(20, 20);
    col.lineTo(20, 240);
    col.stroke();


    //*******************  STATISTIC OF NUMBER OF PRODUCTS IN TYPES ********************
    ele = document.getElementById("orderCanvas");
    col = ele.getContext("2d");
    x = 80, h = 240, distance = 100, y = 290 - h; //x, y are coordinates and h is height of collumn
    w = 200 //width of a collumn
    var colorOrder = ["#ff6600", "#0099ff", "#00b300"];
    var heightOder = [48, 94.8, 157.2];
    var percentOrder = ["16%", "31.6%", "52.4%"];
    var nameOrder = ["Chưa giao hàng", "Đang giao hàng", "Giao hàng thành công"];

    for (var i = 0; i < 3; i++) {
        h = heightOder[i];
        y = 290 - h;
        col.beginPath();
        col.rect(x, y, w, h);
        col.stroke();
        col.fillStyle = colorOrder[i];
        col.fill();

    //Display name of its type
    col.font = "20px Helvetica";
        col.fillStyle = "black";
        col.fillText(nameOrder[i], x + 20, 320);

        col.beginPath();
        col.font = "25px Helvetica";
        col.fillText(percentOrder[i], x + 70, y - 10);  
        x += w + distance;
    }      
    col.beginPath();
    col.moveTo(20, 290);
    col.lineTo(930, 290);
    col.stroke();

    col.beginPath();
    col.moveTo(20, 20);
    col.lineTo(20, 290);
    col.stroke(); 
}

