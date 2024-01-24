// get header height and add it to main top margins
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('mainHeader');
    const headerHeight = header.offsetHeight;

    const mainContent = document.getElementById('mainContent');
    mainContent.style.marginTop = headerHeight + 'px';
});

// add right margin to logo -> aligns title
document.addEventListener('DOMContentLoaded', () => {
    const headerButton = document.querySelector('.header__menu--button');
    const headerLogo = document.querySelector('.header__a');
    const buttonHeight = headerButton.offsetWidth;
    const logoHeight = headerLogo.offsetWidth;

    headerLogo.style.marginRight = (buttonHeight - logoHeight) + 'px';
});

// typewriter effect to home section content
document.addEventListener('DOMContentLoaded', () => {
    const typewriter1 = document.querySelector(".home__typewriter1");
    const typewriter1Items = document.querySelectorAll(".home__typewriter1--item");

    const txtArr = Array.from(typewriter1Items).map((ele) => {
        const textContent = ele.innerText;
        ele.innerText = '';
        return textContent;
    });

    let iSpeed = 125;
    let iIdx = 0;
    let itxtLen = txtArr[0].length;
    let iTextPos = 0;
    let delta;
    
    const typewrite = async () => {
    return new Promise((resolve) => {
        typewriter1Items[iIdx].classList.remove('stopAnimation');
        typewriter1Items[iIdx].innerHTML = txtArr[iIdx].substring(0, iTextPos);
        delta = Math.random() * 50;

        if (iTextPos++ === itxtLen) {
            iTextPos = 0;
            setTimeout(() => {
                typewriter1Items[iIdx].innerHTML = txtArr[iIdx] + ".";
            }, 300 + delta); // control final char '.' insert delay

            setTimeout(() => {
                typewriter1Items[iIdx].classList.add('stopAnimation');
                iIdx++;
                if (iIdx !== txtArr.length) {
                    itxtLen = txtArr[iIdx].length;
                    typewrite().then(resolve);
                } else {
                    resolve();
                }
            }, 500 + delta);
        } else {
            setTimeout(() => { typewrite().then(resolve); }, iSpeed + delta); // control typing speed
        }
    });
    };
    
    setTimeout(() => {
    typewrite().then(() => {

    setTimeout(() => {    
    introFadeChanges();

    function TxtType (ele, txt) {
        this.ele = ele;
        this.txt = txt;
        this.loopNum = 0;
        this.isDeleting = false;
        this.write = '';
        this.tick();
    };
    TxtType.prototype.tick = function() {
        let i = this.loopNum % this.txt.length;
        let fullTxt = this.txt[i];

        if (this.isDeleting) {
            this.write = fullTxt.substring(0, this.write.length - 1);
        } else {
            this.write = fullTxt.substring(0, this.write.length + 1);
        }
        this.ele.innerHTML = '<span class="wrap">'+this.write+'</span>';

        let that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.write === fullTxt) {
            setTimeout(() => {
                this.isDeleting = true;
            }, 500);
        } else if (this.isDeleting && this.write === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        setTimeout(() => {
            that.tick();
        }, delta);
    };

    const typewriter2 = document.querySelectorAll('.home__typewriter2');
    const typewriter2Items = document.querySelectorAll('.home__typewriter2--item');
    const txtArr = Array.from(typewriter2Items).map((ele) => {
        const textContent = ele.innerText;
        ele.remove();
        return textContent;
    });
    for (let i = 0; i < typewriter2.length; i++) {
        new TxtType(typewriter2[i], txtArr);
    }
    }, 1000); // add delay to home__p & intro__fade

    });
    }, 2500); // add delay to typing -> for longer blinking animation

    const introFadeChanges = () => {
        const header = document.getElementById('mainHeader');
        const intro = document.querySelector(".intro");
        const home = document.getElementById("home");
        const homeButton = document.querySelector(".home__button");

        intro.classList.add("intro__fade");
        homeButton.classList.remove("hide");
        header.style.top = '0';

        // get showBody transition time and apply to home for correct element stack
        const showBodyTime = getComputedStyle(document.documentElement).getPropertyValue('--SHOW-BODY');
        const timeRegex = /(\d+(?:\.\d+)?)[sms]/;
        const match = showBodyTime.match(timeRegex);
        const timeValue = parseFloat(match[1]);

        setTimeout(() => {
            home.style.zIndex = 0;
            document.body.style.overflow = 'auto';
        }, timeValue * 900);
    }
});

// add current year in the footer
document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById("year");
    const thisYear = new Date().getFullYear();
    year.setAttribute("datetime", thisYear);
    year.textContent = thisYear;
});

// add reCAPTCHA check to form; set default state after submission; forward message to gmail
const form = document.getElementById("contact__form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(document.querySelector(".contact__form--captchaContainer").style)
    console.log(document.querySelector(".contact__form--captchaContainer").style.display)

    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse.length > 0 && document.querySelector(".contact__form--captchaContainer").style.display !== 'none') {
        throw new Error("Captcha not complete");
    }

    const paramaters = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    const serviceID = "service_7uoc47m";
    const templateID = "template_2d9if46";

    emailjs
    .send(serviceID, templateID, paramaters)
    .then((res) => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        grecaptcha.reset();
        console.log("Message sent");
    })
    .catch((err) => console.log(err));
});