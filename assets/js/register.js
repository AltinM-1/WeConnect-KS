document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    const successMessage = document.querySelector('.success-message');

    function showError(input, message) {
        let err = null;
        const described = input.getAttribute && input.getAttribute('aria-describedby');
        if (described) err = document.getElementById(described);
        if (!err) err = input.parentElement && input.parentElement.querySelector('.error-message');
        if (err) err.textContent = message;
        input.classList.add('invalid');
        input.setAttribute('aria-invalid', 'true');
    }

    function clearError(input) {
        const described = input.getAttribute && input.getAttribute('aria-describedby');
        let err = null;
        if (described) err = document.getElementById(described);
        if (!err) err = input.parentElement && input.parentElement.querySelector('.error-message');
        if (err) err.textContent = '';
        input.classList.remove('invalid');
        input.removeAttribute('aria-invalid');
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    [fullName, email, password, confirmPassword].forEach(function (input) {
        input.addEventListener('input', function () { clearError(input); });
    });
    terms.addEventListener('change', function () {
        const checkboxErr = document.querySelector('.checkbox-group .error-message');
        if (checkboxErr) checkboxErr.textContent = '';
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        [fullName, email, password, confirmPassword].forEach(clearError);
        const termsErrEl = document.getElementById('termsError');
        if (termsErrEl) termsErrEl.textContent = '';

        const invalidFields = [];

        if (!fullName.value.trim()) {
            showError(fullName, 'Emri eshte i detyrueshem');
            invalidFields.push(fullName);
        }

        if (!email.value.trim()) {
            showError(email, 'Email eshte i detyrueshem');
            invalidFields.push(email);
        } else if (!isValidEmail(email.value.trim())) {
            showError(email, 'Adresa e email nuk eshte valide');
            invalidFields.push(email);
        }

        if (!password.value) {
            showError(password, 'Fjalekalimi eshte i detyrueshem');
            invalidFields.push(password);
        } else if (password.value.length < 8) {
            showError(password, 'Fjalekalimi duhet te kete te pakten 8 karaktere');
            invalidFields.push(password);
        }

        if (!confirmPassword.value) {
            showError(confirmPassword, 'Konfirmimi eshte i detyrueshem');
            invalidFields.push(confirmPassword);
        } else if (password.value && confirmPassword.value !== password.value) {
            showError(confirmPassword, 'Fjalekalimet nuk perputhen');
            invalidFields.push(confirmPassword);
        }

        if (!terms.checked) {
            if (termsErrEl) termsErrEl.textContent = 'Duhet te pranoni termat';
            invalidFields.push(terms);
        }

        if (invalidFields.length > 0) {
            
            const first = invalidFields[0];
            try { first.focus(); } catch (e) { }
            return;
        }

        successMessage.textContent = 'Llogaria u krijua me sukses!';
        successMessage.hidden = false;
        successMessage.setAttribute('tabindex', '-1');
        successMessage.focus();

        form.reset();
        [fullName, email, password, confirmPassword].forEach(function (input) {
            input.classList.remove('invalid');
            clearError(input);
        });

        fullName.focus();

        setTimeout(function () {
            successMessage.hidden = true;
            successMessage.textContent = '';
            successMessage.removeAttribute('tabindex');
        }, 3500);
    });
});