document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const closeNav = document.getElementById("closeNav");

  // Open mobile nav
  navToggle.addEventListener("click", () => {
    mobileNav.classList.add("open");
  });

  // Close mobile nav
  closeNav.addEventListener("click", () => {
    mobileNav.classList.remove("open");
  });

  // Handle dropdowns in mobile nav
  const dropdownLinks = mobileNav.querySelectorAll(".dropdown > a");

  dropdownLinks.forEach(link => {
    let firstClick = false;

    link.addEventListener("click", (e) => {
      const parent = link.parentElement;

      // If dropdown is not open yet
      if (!parent.classList.contains("open")) {
        e.preventDefault(); // stop page navigation on first click

        // Close other open dropdowns
        document.querySelectorAll(".mobile-nav .dropdown.open").forEach(openItem => {
          if (openItem !== parent) openItem.classList.remove("open");
        });

        parent.classList.add("open"); // open this dropdown
        firstClick = true;

        // Reset firstClick after short time
        setTimeout(() => (firstClick = false), 800);
      } else {
        // Second click → allow normal navigation
        parent.classList.remove("open");
        mobileNav.classList.remove("open"); // close menu after navigating
      }
    });
  });

  // Close dropdowns if clicking outside mobile nav
  document.addEventListener("click", (e) => {
    if (mobileNav.classList.contains("open")) {
      const isClickInside = mobileNav.contains(e.target) || navToggle.contains(e.target);
      if (!isClickInside) {
        document.querySelectorAll(".mobile-nav .dropdown.open").forEach(openItem => {
          openItem.classList.remove("open");
        });
      }
    }
  });

  // Close mobile menu when any non-dropdown link is clicked
  mobileNav.querySelectorAll("a:not(.dropdown > a)").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
    });
  });
});

// ==========================
// AOS INIT
// ==========================
AOS.init({
  duration: 800,
  once: true
});

// ==========================
// SMOOTH SCROLL
// ==========================
document.querySelectorAll('.actions a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ==========================
// ABOUT COUNTER
// ==========================
function animateCounter(element, target, duration) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16)); // ~60fps
  const counter = setInterval(() => {
    start += step;
    if (start >= target) {
      element.textContent = target + "+";
      clearInterval(counter);
    } else {
      element.textContent = start + "+";
    }
  }, 16);
}

document.addEventListener("DOMContentLoaded", () => {
  const counterEl = document.querySelector(".stat-circle .num");
  if (!counterEl) return;

  const target = 250;
  let started = false;

  window.addEventListener("scroll", () => {
    const section = document.querySelector("#about");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (!started && rect.top < window.innerHeight - 100) {
      animateCounter(counterEl, target, 1500);
      started = true;
    }
  });
});

// ==========================
// TRACK RECORD COUNTERS
// ==========================
function runCounter(counter, target, duration = 1500) {
  let start = 0;
  let step = Math.ceil(target / (duration / 16));
  let timer = setInterval(() => {
    start += step;
    if (start >= target) {
      counter.textContent = target;
      clearInterval(timer);
    } else {
      counter.textContent = start;
    }
  }, 16);
}

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("#track-record .counter");
  let started = false;

  window.addEventListener("scroll", () => {
    const section = document.querySelector("#track-record");
    if (!section) return;
    const rect = section.getBoundingClientRect();

    if (!started && rect.top < window.innerHeight - 100) {
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        runCounter(counter, target, 2000);
      });
      started = true;
    }
  });
});

// ==========================
// FAQ ACCORDION
// ==========================
const faqItems = document.querySelectorAll('#faq .faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-q');
  if (question) {
    question.addEventListener('click', () => {
      faqItems.forEach(i => i.classList.remove('active'));
      item.classList.toggle('active');
    });
  }
});

// ==========================
// BACK TO TOP BUTTON
// ==========================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================
// HERO SLIDER (example for About Page)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll("body.about-page .hero-slide");
  const slider = document.querySelector("body.about-page .hero-slider-section");
  if (!slides.length || !slider) return;

  let current = 0;
  let interval;
  const dots = [];

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      if (dots[i]) dots[i].classList.toggle("active", i === index);
    });
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startInterval() {
    interval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }


  // create dots
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "hero-slider-dots";
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      showSlide(i);
      resetInterval();
    });
    dots.push(dot);
    dotsContainer.appendChild(dot);
  });
  slider.appendChild(dotsContainer);

  showSlide(current);
  startInterval();
});

  // Auto highlight current page link
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll("header nav ul li a").forEach(link => {
    if(link.getAttribute("href") === currentPage){
      link.classList.add("active");
    }
  });

  document.querySelectorAll("header nav ul li.dropdown > a")
  .forEach(dropdownToggle => {
    dropdownToggle.addEventListener("click", function (e) {
      if (window.innerWidth < 768) {
        e.preventDefault(); // stop link navigation
        this.parentElement.classList.toggle("active");
      }
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("blog-page")) return;

  const slides = document.querySelectorAll(".blog-hero-slides .slide");
  const dots = document.querySelectorAll(".blog-dots .dot");
  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i].classList.remove("active");
    });
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  // Auto-slide every 4 seconds
  let slideInterval = setInterval(nextSlide, 4000);

  // Dots click
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 4000);
    });
  });

  // Init
  showSlide(currentIndex);
});


// webp img convert
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Input and output folders
const inputFolder = "./assets/images";       // Replace with your folder
const outputFolder = "./webp_images"; // Folder to save WebP images

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Supported image extensions
const extensions = [".jpg", ".jpeg", ".png", ".bmp", ".tiff",".cms"];

// Read files from input folder
fs.readdirSync(inputFolder).forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (extensions.includes(ext)) {
        const inputPath = path.join(inputFolder, file);
        const outputFileName = path.parse(file).name + ".webp";
        const outputPath = path.join(outputFolder, outputFileName);

        sharp(inputPath)
            .webp({ quality: 80 }) // Adjust quality (0-100)
            .toFile(outputPath)
            .then(() => console.log(`Converted: ${file} → ${outputFileName}`))
            .catch(err => console.error(`Error converting ${file}:`, err));
    }
});

console.log("Batch conversion started...");

