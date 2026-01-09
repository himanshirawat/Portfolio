// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}

// Persist Theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

// Timeline Animation
const timelineItems = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

timelineItems.forEach(item => observer.observe(item));


// Email Section
function sendMail(e) {
  e.preventDefault();

  const status = document.getElementById("form-status");

  const params = {
    from_name: document.getElementById("fullName").value,
    email_id: document.getElementById("email_id").value,
    message: document.getElementById("message").value,
  };

  status.innerText = "Sending message...";

  emailjs
    .send("service_n8mva3a", "template_ch5lrq9", params)
    .then(() => {
      status.innerText = "Thanks! Your message has been sent.";
      status.style.color = "green";
      document.querySelector(".contact-form").reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      status.innerText = "Failed to send message. Please try again.";
      status.style.color = "red";
    });
}



let sections = document.querySelectorAll('section');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    console.log(offset);
    let height = sec.offsetHeight ;
    
    if (top >= offset && top < offset + height) {
      sec.classList.add('show-animate');
    }
    // if want to use repeating animation
    else {
      sec.classList.remove('show-animate');
    }
  })
}


const navMenu = document.querySelector(".nav nav");
const navLinks = document.querySelectorAll(".nav nav a");

function toggleMenu() {
  navMenu.classList.toggle("open");
}

// Close menu when clicking any link (mobile)
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});


