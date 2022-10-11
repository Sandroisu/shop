function hideSideMenu() {
    const x = document.getElementById("sideMenu");
    x.classList.add("closed")
    x.classList.remove("opened");


}

function showSideMenu() {
    const x = document.getElementById("sideMenu");
    x.classList.remove("closed");
    x.classList.add("opened")
}
