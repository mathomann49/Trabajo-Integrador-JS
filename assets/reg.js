
const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const password2Input = document.getElementById("password2");
const terms = document.getElementById("terms");
const msgSuccess = document.getElementById("modal__success");


//chequeamos la validez del usuario
const checkUsername = () => {
    let valid = false;
    const min = 3;
    const max = 15;
    const username = nameInput.value.trim();

    if (isEmpty(username)) {
        showError(nameInput, "Debes ingresar un usuario");
    } else if (!isBetween(username.length, min, max)) {
        showError(nameInput, `El nombre debe tener entre 
        ${min} y ${max} caracteres`);
    } else {
        showSuccess(nameInput);
        valid = true;
    }
    return valid;
};

//chequeamos la validez del email

const checkMail = () => {
    let valid = false;
    const emailValue = emailInput.value.trim();

    if (isEmpty(emailValue)) {
        showError(emailInput, "Debes ingresar un email");
    } else if (!isEmailValid(emailValue)) {
        showError(emailInput, "El email ingresado no es válido");
    } else {
        showSuccess(emailInput);
        valid = true;
    }
    return valid;
};


//chequeamos la validez del password
const checkPassword = () => {
    let valid = false;
    const password = passInput.value.trim();

    if (isEmpty(password)) {
        showError(passInput, "Debes ingresar una contraseña");
    } else if (!securePass(password)) {
        showError(passInput, "La contraseña debe contener 8 caracteres, al menos una mayuscula, una minuscula y un simbolo");
    }
     else {
        showSuccess(passInput);
        valid = true;
    }
    return valid;
};

//chequeamos la validez del password2
const checkPassword2 = () => {
    let valid = false;
    const password2 = password2Input.value.trim();
    const password = passInput.value.trim();

    if (isEmpty(password2)) {
        showError(password2Input, "Debes repetir la contraseña ingresada");
    } else if (password !== password2) {
        showError(password2Input, "Las contraseñas no coinciden");
    }
     else {
        showSuccess(password2Input);
        valid = true;
    }
    return valid;
};


const isEmpty = (value) => value === "";

const isBetween = (length, min, max) => {
    return length < min || length > max ? false : true;
};

const isEmailValid = (email) => {
    const RegEx = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
    return RegEx.test(email);
};

const securePass = (pass) =>{
    const Re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return Re.test(pass);
};


const showError = (input, message) => {
    const formSec = input.parentElement;
    formSec.classList.remove("success");
    formSec.classList.add("error");
    const error = formSec.querySelector("small");
    error.textContent = message;
};

const showSuccess = (input) => {
    const formSec = input.parentElement;
    formSec.classList.remove("error");
    formSec.classList.add("success");
    const error = formSec.querySelector("small");
    error.textContent = "";
};

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isUsernameValid = checkUsername();
    let isEmailValid = checkMail();
    let isPasswordValid = checkPassword();
    let isPassword2Valid = checkPassword2();
    let isformValid = isUsernameValid && isEmailValid && isPasswordValid && isPassword2Valid;

    if (isformValid) {
        msgSuccess.classList.add("active");
        setTimeout(() => {
            msgSuccess.classList.remove("active");    
        }, 500);
        form.submit();
    }
}
);

form.addEventListener("input", debounce((e) => {
    switch (e.target.id) {
        case "username":
        checkUsername();
        break;
        case "email":
        checkMail();
        break;
        case "password":
        checkPassword();
        break;
        case "password2":
        checkPassword2();
        break;
    }
}
)
);