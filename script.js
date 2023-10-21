

$(document).ready(function () {

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  
  // Typing animation

  var typed = new Typed(".typing", {
    strings: ["Full Stack Web Developer", "UI/UX Designer", "Programmer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: ["Full Stack Web Developer", "UI/UX Designer", "Programmer"],
    typeSpeed: 99,
    backSpeed: 58,
    loop: true,
  });
});

// Email Section
function SendMail() { 
  var params = {
    from_name: document.getElementById("fullName").value,
    email_id: document.getElementById("email_id").value,
    message: document.getElementById("message").value
  }
  emailjs.send("service_n8mva3a","template_ch5lrq9",params).then(function (res) {
    alert("Thank You !");
  })
}