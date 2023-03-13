const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const passInput = document.getElementById("password");
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




//chequeamos la validez del password
const checkPassword = () => {
    let valid = false;
    const password = passInput.value.trim();
console.log(password);
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




const isEmpty = (value) => value === "";

const isBetween = (length, min, max) => {
    return length < min || length > max ? false : true;
};



const securePass = (pass) =>{
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return re.test(pass);
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
    let isPasswordValid = checkPassword();
    let isformValid = isUsernameValid && isPasswordValid;

    if (isformValid) {
        msgSuccess.classList.add("active");
        setTimeout(() => {
            msgSuccess.classList.remove("active");    
        }, 500);
        form.submit();
    }
}
);

form.addEventListener(
    "input",
     debounce((e) => {
    switch (e.target.id) {
        case "username":
        checkUsername();
        break;
        case "password":
        checkPassword();
        break;
        
    }
})
);