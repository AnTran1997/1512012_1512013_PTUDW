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
        //modal.style.display = "none";
        window.location.href = "../../pages/AdminPages/addNewProduct.html";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
