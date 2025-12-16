const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearErrors();

    let isValid = true;

    if (email.value.trim() === "") {
        showError(email, "Email eshte i detyrueshem");
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, "Email nuk eshte valid");
        isValid = false;
    }

    if (password.value.trim() === "") {
        showError(password, "Fjalekalimi eshte i detyrueshem");
        isValid = false;
    }

    if (isValid) {
        successMessage.textContent = "Hyrja u realizua me sukses!";
        form.reset();
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector(".error-message");
    errorDiv.textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".error-message").forEach(err => {
        err.textContent = "";
    });
    successMessage.textContent = "";
}

function isValidEmail(email) {
    if (!email || typeof email !== 'string') 
        return false;
    if (email.indexOf(' ') !== -1) 
        return false;
    const parts = email.split('@');
    if (parts.length !== 2) 
        return false;
    const [local, domain] = parts;
    if (!local || !domain) 
        return false;
    if (domain.indexOf('.') === -1) 
        return false;
    return true;
}
