const button = document.getElementById("btn"),
        nav = document.querySelector("nav"),
        main = document.getElementById("main"),
        navbar = document.getElementById("navbar"),
        close = document.getElementById("close"),
        loginUser = document.getElementById("usersForm"),
        preloader = document.getElementById("preloader"),
        user = document.getElementById("userLogin"),
        // btn = document.getElementById("submit"),
        // popup = document.querySelector(".popup"),
        scroll = document.getElementById("scroll"),
        btnIcon = document.querySelectorAll("bar"),
        cards = document.querySelectorAll(".card_animate"),
        scroll_animation = document.querySelectorAll("h1");

// Adding fixed position to the navbar while scrolling 

window.onscroll = viewNav;

function viewNav() {
    if (window.pageYOffset > 100) {
        nav.classList.add("show-nav");
    }else {
        nav.classList.remove("show-nav");
    }
}


  //Adding Evenlistener to the variables decleared
button.addEventListener("click",()=>{
    navbar.classList.toggle("open");
    button.classList.toggle("times")
});

// closing the navigation with outside click
document.addEventListener("click", function (e) {
  if (!navbar.contains(e.target) && e.target !== button) {
    navbar.classList.remove("open");
    button.classList.remove("times")
  }
});

//for login popup
user.addEventListener("click", ()=>{
    loginUser.classList.add("show")
});
// for closing the login popup

close.addEventListener("click",
function closeUser(){
    loginUser.classList.remove("show")
});

// PRELOADER
 window.addEventListener("load",()=>{
    preloader.style.display = "none";
  });
  
// ANIMATION 
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add("animation");
        }
    })
}
);
scroll_animation.forEach(animate=>{
    observer.observe(animate)
})
cards.forEach(card=>{
    observer.observe(card)
})




