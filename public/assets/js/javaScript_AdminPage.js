/*$('input[type="checkbox"]').on('change', function(){
    $('input[type="checkbox"]').not(this).prop('checked', false);
});*/

var expandArray = [];
if(expandArray.length == 0) {
    {{isExpanded: 0}};
} else{
    {{isExpanded: 1}};
}

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
            expandArray.push(nameClass);
        } else {
            items[i].style.display = "none";
        }
    }
}

function returnToPreviousPage() {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
}

function validateForm() {
    var name = document.getElementById('_name').value;
    var id = document.getElementById('_id').value;
    var brand = document.getElementById('_brandID').value;
    var cat = document.getElementById('_cat').value;
    var price = document.getElementById('_price').value;
    var stock = document.getElementById('_stock').value;
    var img = document.getElementById('proImg').value;
    var intFields = document.getElementsByClassName('isNumber');

    var existNaN = false;
    var existEmpty = false;

    for (var i = 0; i < intFields.length; i++) {
        if (isNaN(intFields[i].value)){
            existNaN = true;
            break;
        }
    }
    
    if (name === null || id === null || brand === null || cat === null || price === null || stock === null){
        existEmpty = true           
    }   
        
    if(existEmpty && existNaN==false) {
        alert("There is empty fields. Please fulfill all requires");
        returnToPreviousPage();
        return false;
    } else if (existEmpty==false && existNaN) {
        alert("All these fields - Product Price, Product Stock - must be number. Please refill the right format");
        returnToPreviousPage();
        return false;
    } else if (existEmpty && existNaN) {
        alert("Invalid input!\nThere is empty fields, and  Product Price, Product Stock are number fields.");
        returnToPreviousPage();
        return false;
    } else{
        modal.style.display = "none";
        return true;
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
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    
}

function editSingle() {

    var modal = document.getElementById('editModal');
    var icon = document.getElementsByClassName("editClose")[0];
    var editBtn = document.getElementById('editBtn');
    modal.style.display = "block";
    icon.onclick = function() {
        modal.style.display = "none";
    }
    editBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function randomColor(lengthArr) {
    var arrColor = [];
    for(var i = 0; i < lengthArr; i++) {
        arrColor.push("#"+((1<<24)*Math.random()|0).toString(16));
    }
    return arrColor;
}

function getChartOfBrand(nameBrand, percentBrand) {
    var totalBrand = nameBrand.length;
    var ele = document.getElementById("brandCanvas");
    var col = ele.getContext("2d");
    var x = 20 + 910 / (totalBrand*8), h, y = 290 - h; //x, y are coordinates and h is height of collumn
    var w = (3*910) / (4*totalBrand) //width of a collumn
    var distance =  910 / (totalBrand*4);                    //(440 - w*totalBrand) / (totalBrand + 1);
    //var colorBrand = ["#00ff00", "#b30000", "#cc00cc", "#008ae6", "#008ae6"];
    var colorBrand = randomColor(totalBrand);
    var percentStr = [];
    for (var i = 0; i < totalBrand; i++) {
        percentStr.push(percentBrand[i] + "%");
    }

    for (var i = 0; i < totalBrand; i++) {
        h = 290 * percentBrand[i] /100;
        //h = heightBrand[i];
        y = 290 - h;
        //Display collumn statistic
        col.beginPath();
        col.rect(x, y, w, h);
        col.stroke();
        col.fillStyle = colorBrand[i];
        col.fill();

        //Display name of its brand
        col.font = "20px Helvetica";
        col.fillStyle = "black";
        col.fillText(nameBrand[i], x + w/4, 320);

        //Display percentage of its brand
        col.beginPath();
        col.font = "25px Helvetica";
        col.fillText(percentStr[i], x + w/4, y - 10);  

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

    //rangeWidth: 910, rangeHeight: 270
}

//*******************  STATISTIC OF NUMBER OF PRODUCTS IN TYPES ********************
function getChartOfType(nameType, percentType) {
    var totalType = nameType.length;
    var ele = document.getElementById("typeCanvas");
    var col = ele.getContext("2d");
    var x = 20 + 440 / (totalType*8), h, y = 240 - h; //x, y are coordinates and h is height of collumn
    var w = (3*440) / (4*totalType) //width of a collumn
    var distance =  440 / (totalType*4);   //distance between two columns
    //var colorType = ["#ff6600", "#0099ff", "#00b300"];
    var colorType = randomColor(totalType);
    var percentStr = [];
    for (var i = 0; i < totalType; i++) {
        percentStr.push(percentType[i] + "%");
    }

    for (var i = 0; i < 3; i++) {
        h = 240 * percentType[i] /100;
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
        col.fillText(percentStr[i], x + w/3, y - 10);  
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

    //rangeWidth: 440, rangeHeight: 220
}


/*******************  STATISTIC OF NUMBER OF PRODUCTS IN ORDERS ********************/
function getChartOfOrders(nameOrder, percentOrder) { 
    var numTypeOrder = nameOrder.length;
    ele = document.getElementById("orderCanvas");
    col = ele.getContext("2d");
    var x = 20 + 440 / (numTypeOrder*8), h, y = 240 - h; //x, y are coordinates and h is height of collumn
    var w = (3*440) / (4*numTypeOrder) //width of a collumn
    var distance =  440 / (numTypeOrder*4);   //distance between two columns
    var colorOrder = randomColor(numTypeOrder);
    var percentStr = [];
    for (var i = 0; i < numTypeOrder; i++) {
        percentStr.push(percentOrder[i] + "%");
    }

    for (var i = 0; i < 3; i++) {
        h = 240 * percentOrder[i] /100;
        y = 240 - h;
        col.beginPath();
        col.rect(x, y, w, h);
        col.stroke();
        col.fillStyle = colorOrder[i];
        col.fill();

        //Display name of its order 
        col.font = "20px Helvetica";
        col.fillStyle = "black";
        col.fillText(nameOrder[i], x, 270);

        col.beginPath();
        col.font = "25px Helvetica";
        col.fillText(percentStr[i], x + w/4, y - 10);  
        x += w + distance;
    }      
    //Đường hoành độ
    col.beginPath();
    col.moveTo(20, 240);
    col.lineTo(460, 240);
    col.stroke();

    //Đường tung độ
    col.beginPath();
    col.moveTo(20, 20);
    col.lineTo(20, 240);
    col.stroke();

    //rangeWidth: 440, rangeHeight: 220
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

function call() {
    alert("here");
}


