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
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

timelineItems.forEach((item) => observer.observe(item));

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

let sections = document.querySelectorAll("section");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    console.log(offset);
    let height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      sec.classList.add("show-animate");
    }
    // if want to use repeating animation
    else {
      sec.classList.remove("show-animate");
    }
  });
};

const navMenu = document.querySelector(".nav nav");
const navLinks = document.querySelectorAll(".nav nav a");

function toggleMenu() {
  navMenu.classList.toggle("open");
}

// Close menu when clicking any link (mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

const toggleBtn = document.getElementById("ai-toggle");
const chatBox = document.getElementById("ai-chat");
const closeBtn = document.getElementById("ai-close");
const sendBtn = document.getElementById("ai-send");
const input = document.getElementById("ai-input");
const messages = document.getElementById("ai-messages");

toggleBtn.onclick = () => (chatBox.style.display = "flex");
closeBtn.onclick = () => (chatBox.style.display = "none");

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
  const wrapper = document.createElement("div");
  wrapper.className = `msg ${sender}`;

  const icon = document.createElement("div");
  icon.className = "icon";
  icon.innerHTML =
    sender === "user"
      ? "👤"
      : '<img src="favicon.ico" alt="AI" style="width:16px; height:16px;">';

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = text;

  wrapper.appendChild(icon);
  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);

  messages.scrollTop = messages.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  addMessage(
    "Hi I'm Himanshika’s AI Assistant. You can ask me about her skills, projects, experience, or achievements.",
    "bot"
  );
});

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("You: " + text, "user");
  input.value = "";

  addMessage("Typing…", "ai");

  const res = await fetch("https://portfolio-ai-khaki.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  });

  const data = await res.json();
  messages.lastChild.remove();
  addMessage("AI: " + data.reply, "ai");
}
