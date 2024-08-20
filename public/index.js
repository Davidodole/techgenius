const button = document.getElementById("btn"),
        main = document.getElementById("main"),
        navbar = document.getElementById("navbar"),
        close = document.getElementById("close"),
        loginUser = document.getElementById("usersForm"),
        preloader = document.getElementById("preloader"),
        user = document.getElementById("userLogin"),
        // btn = document.getElementById("submit"),
        // popup = document.querySelector(".popup"),
        scroll = document.getElementById("scroll"),
        btnIcon = document.querySelectorAll("bar")
        cards = document.querySelectorAll(".card_animate"),
        scroll_animation = document.querySelectorAll("h1");


  //Adding Evenlistener to the variables declear

button.addEventListener("click",()=>{
    navbar.classList.toggle("open");
});
document.addEventListener("click", function (e) {
  if (!navbar.contains(e.target) && e.target !== button) {
    navbar.classList.remove("open");
  }
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




