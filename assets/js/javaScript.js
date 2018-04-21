function showMenu() {
    var menu = document.getElementsByClassName("menuItem")
    if (menu) {
   if (menu.style.display == "none") {
        menu.style.display = "block";
   } else {
       menu.style.display = "none";
   }
    } else {
        alert("Failed");
    }
}