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
    const typewriter = document.querySelectorAll(".typewriter");
    const txtArr = Array.from(typewriter).map((txt) => {
        const textContent = txt.innerText;
        txt.innerText = '';
        return textContent;
    });

    let iSpeed = 100;
    let iIdx = 0;
    let itxtLen = txtArr[0].length;
    let iTextPos = 0;
    
    function typewrite() {
        typewriter[iIdx].innerHTML = txtArr[iIdx].substring(0, iTextPos) + "|";
        if (iTextPos++ == itxtLen) {
            iTextPos = 0;
            setTimeout(() => {
                typewriter[iIdx].innerHTML = txtArr[iIdx] + ".";
                iIdx++;
                if (iIdx != txtArr.length) {
                    itxtLen = txtArr[iIdx].length;
                    setTimeout(typewrite, 500);
                }
            }, 200);
        } else {
            setTimeout(typewrite, iSpeed);
        }
    }
    typewrite();
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
form.addEventListener('submit', () => {
    e.preventDefault();

    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse.length > 0) {
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
    })
    .catch((err) => console.log(err));
});