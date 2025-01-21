
import * as bootstrap from 'bootstrap'
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
window.addEventListener("load", function () {
  AOS.init({
    once: true,
  });
});
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


const activeHomePage = document.querySelector(".home-page");

const aboutSection = document.querySelector(".about-section");
const productSection = document.querySelector(".product-section");
const expertiseSection = document.querySelector(".expertise");
const idustrySection = document.querySelector(".industries ");
const chooseUs = document.querySelector(".choose");
const latesBlog = document.querySelector(".latestBlog");
const vh = document.querySelector(".hero");
const allLinks = document.querySelectorAll(".hero__nav__list > li > a");


var show = false;
export function triggerSections() {
  allLinks.forEach((item, index) => {
    const calcVh = vh.clientHeight;
    item.addEventListener("click", (e) => {
      e.preventDefault();

      document.body.classList.remove("showmenu");
      show = false;
      showMenu();

      for (let i = 0; i < allLinks.length; i++) {
        allLinks[i].classList.remove("active");
      }
      item.classList.add("active");

      if (index === 0) {
        window.scrollTo(0, 0);
      }
      if (index === 1) {
        window.scrollTo(0, aboutSection.offsetTop + calcVh - 100);
      }
      if (index === 2) {
        window.scrollTo(0, productSection.offsetTop + calcVh - 100);
      }
      if (index === 3) {
        window.scrollTo(0, expertiseSection.offsetTop - 100);
      }
      if (index === 4) {
        window.scrollTo(0, idustrySection.offsetTop - 100);
      }
      if (index === 5) {
        window.scrollTo(0, chooseUs.offsetTop - 150);
      }
    });
  });
}
if (window.matchMedia("(max-width: 992px)").matches && activeHomePage) {
  triggerSections();
}

//triggerSections();

//latestBlog
export function scrollNav() {
  if (window.pageYOffset > 200) {
    document.body.classList.add("fixed");
  } else {
    document.body.classList.remove("fixed");
  }
}
function removeActive() {
  for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].classList.remove("active");
  }
}

export function scrollingSections() {
  removeActive();
  const calcVh = vh.clientHeight;

  if (
    window.scrollY >= aboutSection.offsetTop + calcVh &&
    window.scrollY < productSection.offsetTop + calcVh - 150
  ) {
    document
      .querySelector(`.${aboutSection.getAttribute("data-target")}`)
      .classList.add("active");
  } else if (
    window.scrollY > productSection.offsetTop + calcVh - 200 &&
    window.scrollY < expertiseSection.offsetTop - 150
  ) {
    document
      .querySelector(`.${productSection.getAttribute("data-target")}`)
      .classList.add("active");
  } else if (
    window.scrollY >= expertiseSection.offsetTop - 150 &&
    window.scrollY < idustrySection.offsetTop - 150
  ) {
    document
      .querySelector(`.${expertiseSection.getAttribute("data-target")}`)
      .classList.add("active");
  } else if (
    window.scrollY > idustrySection.offsetTop - 150 &&
    window.scrollY < chooseUs.offsetTop - 150
  ) {
    document
      .querySelector(`.${idustrySection.getAttribute("data-target")}`)
      .classList.add("active");
  } else if (
    window.scrollY > chooseUs.offsetTop - 150 &&
    window.scrollY < latesBlog.offsetTop - 150
  ) {
    document
      .querySelector(`.${chooseUs.getAttribute("data-target")}`)
      .classList.add("active");
  } else {
    document.querySelector(".Home-Link").classList.add("active");
  }
}

/*
window.onscroll = () => {
  //scrollNav();

  if (window.matchMedia("(min-width: 994px)").matches && activeHomePage) {
    scrollingSections();
  }
};
*/

function toggleBtns(element, btn, value, classProp) {
  btn.addEventListener("click", () => {
    if (!value) {
      element.classList.add(classProp);
      value = true;
    } else {
      value = false;
      element.classList.remove(classProp);
    }
  });
}

export function showMenu() {
  const hamburgBtn = document.querySelector(".hamburgMenu");

  toggleBtns(document.querySelector("body"), hamburgBtn, show, "showmenu");
}

//get current year

document.querySelector(".currentYear").textContent = new Date().getFullYear();
//switch mode toggle menu

export function toggleMenuLight() {
  const toggleBtn = document.querySelector(".switch-mode.btn");
  let showMenu = false;
  toggleBtns(
    document.querySelector("body"),
    toggleBtn,
    showMenu,
    "showmenuLight"
  );
}

//Implement dark auto light mode

const drkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const lightMode = window.matchMedia("(prefers-color-scheme: light)").matches;

function enableLightMode() {
  document.body.classList.add("lightMode");
  document.body.classList.remove("drkMode");
}
function enableDrkMode() {
  document.body.classList.remove("lightMode");
  document.body.classList.add("drkMode");
}

const applyAutoMode = () => {
  drkMode
    ? localStorage.setItem("themeMode", "drk")
    : localStorage.setItem("themeMode", "light");
};
function applyFuctions() {
  localStorage.getItem("themeMode") === "drk"
    ? enableDrkMode()
    : enableLightMode();

  localStorage.getItem("autoTheme") == "true"
    ? document.body.classList.add("auto")
    : document.body.classList.remove("auto");
}

export function implementClick() {
  document
    .querySelectorAll(".switch-mode__list button")
    .forEach((item, index) => {
      item.addEventListener("click", () => {
        if (index === 0) {
          //auto mode
          applyAutoMode();
          localStorage.setItem("autoTheme", true);
        }
        if (index === 1) {
          //light mode
          localStorage.setItem("themeMode", "light");
          localStorage.setItem("autoTheme", false);
        }
        if (index === 2) {
          //drkMode
          localStorage.setItem("themeMode", "drk");
          localStorage.setItem("autoTheme", false);
        }
        applyFuctions();
      });
      if (localStorage.getItem("themeMode") != null) {
        applyFuctions();
      }
    });
}

//scroll to sections

//plugins
export function expertiseSwiper() {
  if (document.querySelector(".expertise .swiper-container")) {
    new Swiper(".expertise .swiper-container", {
      modules: [Navigation],
      spaceBetween: 0,
      slidesPerView: 1.6,
      centeredSlides: true,
      // slidesPerGroup :3,
      roundLengths: true,
      loop: true,

      navigation: {
        nextEl: ".expertise .swiper-button-next",
        prevEl: ".expertise .swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 1.4,
        },
      },
    });
  }
}

export function latestBlog() {
  if (document.querySelector(".latestBlog .swiper-container")) {
    new Swiper(".latestBlog .swiper-container", {
      modules: [Navigation],
      spaceBetween: 20,
      slidesPerView: 1.6,
      centeredSlides: true,
      loop: true,
      roundLengths: true,
      loop: true,
      //  loopAdditionalSlides: 30,

      navigation: {
        nextEl: ".latestBlog .swiper-button-next",
        prevEl: ".latestBlog .swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 1.5,
        },
        991: {
          // slidesPerView: 1.5,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
        },
        2700: {
          slidesPerView: 3,
        },
      },
    });
  }
}

export function ourLocation() {
  if (document.querySelector(".ourlocations  .swiper-container")) {
    new Swiper(".ourlocations  .swiper-container", {
      modules: [Pagination],
      spaceBetween: 0,
      slidesPerView: 1,

      loop: true,

      navigation: {
        nextEl: ".ourlocations .swiper-button-next",
        prevEl: ".ourlocations .swiper-button-prev",
      },
      pagination: {
        el: ".ourlocations .swiper-pagination",
        dynamicBullets: true,
        clickable: true,
      },
    });
  }
}
//run functions

latestBlog();
ourLocation();
expertiseSwiper();
implementClick();
toggleMenuLight();
showMenu();

//event scroll

window.addEventListener("scroll", () => {
  scrollNav();
  if (window.matchMedia("(min-width: 994px)").matches && activeHomePage) {
    scrollingSections();
  }
});
