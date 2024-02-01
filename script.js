// get header height and add it to all main section top padding
document.addEventListener("DOMContentLoaded", () => {
   const header = document.getElementById("mainHeader");
   const headerHeight = header.offsetHeight;
   const mainSec = document.querySelectorAll(".section");
   mainSec.forEach((sec) => {
      sec.style.paddingTop = headerHeight + "px";
   });
});

// add right margin to logo -> aligns title
document.addEventListener("DOMContentLoaded", () => {
   const headerButton = document.querySelector(".header__menu--button");
   const headerLogo = document.querySelector(".header__a");
   const buttonHeight = headerButton.offsetWidth;
   const logoHeight = headerLogo.offsetWidth;

   headerLogo.style.marginRight = buttonHeight - logoHeight + "px";
});

// typewriter effect to home section content
document.addEventListener("DOMContentLoaded", () => {
   const typewriter1 = document.querySelector(".home__typewriter1");
   const typewriter1Items = document.querySelectorAll(
      ".home__typewriter1--item"
   );

   const txtArr = Array.from(typewriter1Items).map((ele) => {
      const textContent = ele.innerText;
      ele.innerText = "";
      return textContent;
   });

   let iSpeed = 80;
   let iIdx = 0;
   let itxtLen = txtArr[0].length;
   let iTextPos = 0;
   let delta;

   const typewrite = async () => {
      return new Promise((resolve) => {
         typewriter1Items[iIdx].classList.remove("stopAnimation");
         typewriter1Items[iIdx].innerHTML = txtArr[iIdx].substring(0, iTextPos);
         delta = Math.random() * 25;

         if (iTextPos++ === itxtLen) {
            iTextPos = 0;
            setTimeout(() => {
               typewriter1Items[iIdx].innerHTML = txtArr[iIdx] + ".";
            }, 125 + delta); // control final char '.' insert delay

            setTimeout(() => {
               typewriter1Items[iIdx].classList.add("stopAnimation");
               iIdx++;
               if (iIdx !== txtArr.length) {
                  itxtLen = txtArr[iIdx].length;
                  typewrite().then(resolve);
               } else {
                  resolve();
               }
            }, 400 + delta);
         } else {
            setTimeout(() => {
               typewrite().then(resolve);
            }, iSpeed + delta); // control typing speed
         }
      });
   };

   setTimeout(() => {
      typewrite().then(() => {
         setTimeout(() => {
            introFadeChanges();

            function TxtType(ele, txt) {
               this.ele = ele;
               this.txt = txt;
               this.loopNum = 0;
               this.isDeleting = false;
               this.write = "";
               this.tick();
            }
            TxtType.prototype.tick = function () {
               let i = this.loopNum % this.txt.length;
               let fullTxt = this.txt[i];

               if (this.isDeleting) {
                  this.write = fullTxt.substring(0, this.write.length - 1);
               } else {
                  this.write = fullTxt.substring(0, this.write.length + 1);
               }
               this.ele.innerHTML =
                  '<span class="wrap">' + this.write + "</span>";

               let that = this;
               let delta = 100 - Math.random() * 50;

               if (this.isDeleting) {
                  delta /= 2;
               }

               if (!this.isDeleting && this.write === fullTxt) {
                  setTimeout(() => {
                     this.isDeleting = true;
                  }, 400);
               } else if (this.isDeleting && this.write === "") {
                  this.isDeleting = false;
                  this.loopNum++;
                  delta = 500;
               }
               setTimeout(() => {
                  that.tick();
               }, delta);
            };

            const typewriter2 = document.querySelectorAll(".home__typewriter2");
            const typewriter2Items = document.querySelectorAll(
               ".home__typewriter2--item"
            );
            const txtArr = Array.from(typewriter2Items).map((ele) => {
               const textContent = ele.innerText;
               ele.remove();
               return textContent;
            });
            for (let i = 0; i < typewriter2.length; i++) {
               new TxtType(typewriter2[i], txtArr);
            }
         }, 500); // add delay to home__p & intro__fade
      });
   }, 1500); // add delay to typing -> for longer blinking animation

   const introFadeChanges = () => {
      const header = document.getElementById("mainHeader");
      const intro = document.querySelector(".intro");
      const home = document.getElementById("home");
      const homeButton = document.querySelector(".home__button");

      header.style.top = "0";
      intro.classList.add("intro__fade");
      homeButton.classList.remove("hide");

      // get showBody transition time and apply to home for correct element stack
      const showBodyTime = getComputedStyle(
         document.documentElement
      ).getPropertyValue("--SHOW-BODY");
      const timeRegex = /(\d+(?:\.\d+)?)[sms]/;
      const match = showBodyTime.match(timeRegex);
      const timeValue = parseFloat(match[1]);

      setTimeout(() => {
         home.style.zIndex = 0;
         document.body.style.overflow = "auto";
      }, timeValue * 900);
   };
});

// add current year in the footer
document.addEventListener("DOMContentLoaded", () => {
   const year = document.getElementById("year");
   const thisYear = new Date().getFullYear();
   year.setAttribute("datetime", thisYear);
   year.textContent = thisYear;
});

// scroll triggered animation
document.addEventListener("DOMContentLoaded", () => {
   const scrollTrigger = (selector, options = {}) => {
      let els = document.querySelectorAll(selector);
      els = Array.from(els);
      els.forEach((el) => {
         addObserver(el, options);
      });
   };
   const addObserver = (el, options) => {
      // Check if `IntersectionObserver` is supported
      if (!("IntersectionObserver" in window)) {
         if (options.cb) {
            options.cb(el);
         } else {
            el.classList.add("active");
         }
         return;
      }
      let observer = new IntersectionObserver((entries, observer) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               if (options.cb) {
                  options.cb(el);
               } else {
                  entry.target.classList.add("active");
               }
               observer.unobserve(entry.target);
            }
         });
      }, options);
      observer.observe(el);
   };

   scrollTrigger(".scroll-reveal", {
      rootMargin: "-200px",
   });
});

// add reCAPTCHA check to form; set default state after submission; forward message to gmail
const form = document.getElementById("contact__form");
form.addEventListener("submit", async (e) => {
   e.preventDefault();

   document.querySelector(".contact__form--submit").style.display = "none";
   document.querySelector(".contact__form--sendMessage").style.display =
      "block";

   try {
      const fd = new FormData(e.target);
      const params = new URLSearchParams(fd);
      const url = "https://slug-cummerbund.cyclic.app/upload";

      const response = await fetch(url, {
         method: "POST",
         body: params,
      });

      const data = await response.json();

      if (data.captchaSuccess) {
         const serviceID = "service_7uoc47m";
         const templateID = "template_2d9if46";
         const parameters = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
         };

         const emailResponse = await emailjs.send(
            serviceID,
            templateID,
            parameters
         );

         // Clear form fields and reset reCAPTCHA
         document.getElementById("name").value = "";
         document.getElementById("email").value = "";
         document.getElementById("message").value = "";
         grecaptcha.reset();

         alert("Message sent successfully!");
      } else {
         alert("CAPTCHA incomplete!");
      }
   } catch (err) {
      alert(err);
   } finally {
      document.querySelector(".contact__form--submit").style.display = "block";
      document.querySelector(".contact__form--sendMessage").style.display =
         "none";
   }
});
