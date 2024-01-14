// gets header and footer height and adds it to main top and bottom margins
document.addEventListener('DOMContentLoaded', (e) => {
    const header = document.getElementById('mainHeader');
    const headerHeight = header.offsetHeight;
    const footer = document.getElementById('mainFooter');
    const footerHeight = footer.offsetHeight;

    const mainContent = document.getElementById('mainContent');
    mainContent.style.marginTop = headerHeight + 'px';
    mainContent.style.marginBottom = footerHeight + 'px';
});

// adds right margin to logo -> aligns title
document.addEventListener('DOMContentLoaded', (e) => {
    const headerButton = document.querySelector('.header__menu--button');
    const headerLogo = document.querySelector('.header__a');
    const buttonHeight = headerButton.offsetWidth;
    const logoHeight = headerLogo.offsetWidth;

    headerLogo.style.marginRight = (buttonHeight - logoHeight) + 'px';
});

// adds current year in the footer
document.addEventListener('DOMContentLoaded', (e) => {
    const year = document.getElementById("year");
    const thisYear = new Date().getFullYear();
    year.setAttribute("datetime", thisYear);
    year.textContent = thisYear;
});

const form = document.getElementById("contact__form");
form.addEventListener('submit', (e) => {
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

/*
document.getElementById("contact__form").addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);
    fetch("http://127.0.0.1:5500", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log("Form submission successful:", data);
    })
    .catch(error => {
        console.error("There was a problem with the form submission:", error);
    });
});
*/