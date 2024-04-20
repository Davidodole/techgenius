const button = document.querySelector("nav button"),
        navbar = document.getElementById("navbar"),
        close = document.getElementById("close"),
        loginUser = document.getElementById("usersForm"),
        preloader = document.getElementById("preloader"),
        user = document.getElementById("userLogin");

button.addEventListener("click",()=>{
    navbar.classList.toggle("open");
});
user.addEventListener("click", ()=>{
    loginUser.classList.add("show")
});
close.addEventListener("click",
function closeUser(){
    loginUser.classList.remove("show")
});

// PRELOADER
window.addEventListener("load",()=>{
    preloader.style.display = "none";
});