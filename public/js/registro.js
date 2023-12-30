window.addEventListener("load", function () {
    let formulario = document.querySelector('.formulario');
    let firstName = document.querySelector('.firstName');
    let errorFirstName = document.querySelector('.errorFirstName');
    let lastName = document.querySelector('.lastName');
    let errorLastName = document.querySelector('.errorLastName');
    let email = document.querySelector('.email');
    let errorEmail = document.querySelector('.errorEmail');
    let password = document.querySelector('.password');
    let errorPassword = document.querySelector('.errorPassword');
    let img = document.querySelector('.avatar');
    let errorImg = document.querySelector('.errorAvatar');

    function agregarError(elemento, mensaje) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
    }

    function quitarError(elemento) {
        elemento.textContent = '';
        elemento.style.display = 'none';
    }

    function validarCampo(campo, errorContainer, mensajeError, validación) {
        campo.addEventListener("blur", function () {
            if (!validación(campo.value)) {
                agregarError(errorContainer, mensajeError);
                campo.classList.add('errorsInput');
            } else {
                quitarError(errorContainer);
                campo.classList.remove('errorsInput');
            }
        });
    }

    function validarImagen() {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = img.value.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            agregarError(errorImg, 'El archivo de imagen debe ser JPG, JPEG, PNG o GIF.');
            img.classList.add('errorsInput');
            return false;
        } else {
            quitarError(errorImg);
            img.classList.remove('errorsInput');
            return true;
        }
    }

    validarCampo(firstName, errorFirstName, 'El valor debe tener al menos 2 caracteres.', value => value.length >= 2);
    validarCampo(lastName, errorLastName, 'El valor debe tener al menos 2 caracteres.', value => value.length >= 2);
    validarCampo(email, errorEmail, 'Debe ingresar un correo electrónico válido.', validator.isEmail);
    validarCampo(password, errorPassword, 'La contraseña es débil, necesita mayúsculas, minúsculas y números', value => {
        const options = {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        };
        return validator.isStrongPassword(value, options);
    });

    img.addEventListener("blur", validarImagen);

    formulario.addEventListener("submit", function (event) {
        let errores = [];

        if (firstName.value.length < 2) {
            let mensaje = 'El nombre debe tener al menos 2 caracteres.';
            agregarError(errorFirstName, mensaje);
            errores.push(mensaje);
        } else {
            quitarError(errorFirstName);
        }

        if (lastName.value.length < 2) {
            let mensaje = 'El valor debe tener al menos 2 caracteres.';
            agregarError(errorLastName, mensaje);
            errores.push(mensaje);
        } else {
            quitarError(errorLastName);
        }

        if (!validator.isEmail(email.value)) {
            let mensaje = 'Debe ingresar un correo electrónico válido.';
            agregarError(errorEmail, mensaje);
            errores.push(mensaje);
        } else {
            quitarError(errorEmail);
        }

        const options = {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        };

        if (!validator.isStrongPassword(password.value, options)) {
            let mensaje = 'La contraseña es débil, necesita mayúsculas, minúsculas y números';
            agregarError(errorPassword, mensaje);
            errores.push(mensaje);
        } else {
            quitarError(errorPassword);
        }

        if (!validarImagen()) {
            errores.push('El archivo de imagen debe ser JPG, JPEG, PNG o GIF.');
        }

        if (errores.length > 0) {
            event.preventDefault();
            alert(errores.join('\n'));
        }
        console.log(errores)
    });
});
