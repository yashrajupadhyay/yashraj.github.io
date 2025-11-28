// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const navbar = document.getElementById("navbar");

mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenuBtn.querySelector("i").classList.toggle("fa-bars");
    mobileMenuBtn.querySelector("i").classList.toggle("fa-times");
});

// Close menu when clicking a link
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
        }
    });
});

// Intersection Observer Animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible"));
}, { threshold: 0.1, rootMargin: "-50px 0px" });

document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right")
    .forEach(el => observer.observe(el));

// Navigation Active Highlight + Navbar Background
window.addEventListener("scroll", () => {
    navbar.style.background = window.scrollY > 50 ? "rgba(10,10,10,0.95)" : "rgba(255,255,255,0.05)";

    document.querySelectorAll("section[id]").forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            document.querySelectorAll(".nav-link").forEach(link =>
                link.classList.toggle("active", link.getAttribute("href") === `#${section.id}`)
            );
        }
    });
});

// Typing Effect
function typeWriter(el, text, speed = 80) {
    let i = 0;
    el.innerHTML = "";
    (function typing() {
        if (i < text.length) {
            el.innerHTML += text[i++];
            setTimeout(typing, speed);
        }
    })();
}
window.addEventListener("load", () => {
    const heroTitle = document.querySelector("#home h1 span");
    if (heroTitle) setTimeout(() => typeWriter(heroTitle, heroTitle.textContent), 500);
});

// Parallax Effect
window.addEventListener("scroll", () => {
    const hero = document.querySelector("#home");
    if (hero) hero.style.transform = `translateY(${window.pageYOffset * 0.3}px)`;
});

// Particle System
function createParticle() {
    const particle = document.createElement("div");
    particle.style.cssText = `
        position:fixed;width:6px;height:6px;border-radius:50%;
        background:linear-gradient(45deg,#667eea,#764ba2);
        pointer-events:none;z-index:1;opacity:0.8;animation:float 8s linear infinite;
        left:${Math.random() * innerWidth}px;top:${innerHeight}px;
    `;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 8000);
}

document.head.insertAdjacentHTML("beforeend", `
<style>
@keyframes float {
    to { transform:translateY(-100vh) rotate(720deg); opacity:0; }
}
</style>
`);

setInterval(createParticle, 3000);

// Cursor Trail
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;
document.addEventListener("mousemove", e => [mouseX, mouseY] = [e.clientX, e.clientY]);

(function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;

    let trail = document.querySelector(".cursor-trail");
    if (!trail) {
        trail = document.createElement("div");
        trail.className = "cursor-trail";
        trail.style.cssText = `
            position:fixed;width:20px;height:20px;border-radius:50%;
            background:radial-gradient(circle,rgba(102,126,234,0.3),transparent);
            pointer-events:none;z-index:9999;
        `;
        document.body.appendChild(trail);
    }
    trail.style.left = `${trailX - 10}px`;
    trail.style.top = `${trailY - 10}px`;

    requestAnimationFrame(animateTrail);
})();
// End of script.js
