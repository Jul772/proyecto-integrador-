window.addEventListener("load", function () {

    let formulario = document.querySelector('.formulario');
    let email = document.querySelector('.email');
    let password = document.querySelector('.password');
    let errorEmail = document.querySelector('.errorEmail');
    let errorPassword = document.querySelector('.errorPassword');
    let errores = []; 

    function agregarError(elemento, mensaje) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
    }

    function quitarError(elemento) {
        elemento.textContent = '';
        elemento.style.display = 'none';
    }

    function validarCampo(campo, errorContainer, mensajeError, validación) {
        campo.addEventListener("blur", function() {
            if (!validación(campo.value)) {
                agregarError(errorContainer, mensajeError);
                campo.classList.add('errorsInput');
            } else {
                quitarError(campo.name);
                campo.classList.remove('errorsInput');
            }
        });

    }

    validarCampo(email, errorEmail, 'El campo email es obligatorio y debe ser válido.', validator.isEmail);

    validarCampo(password, errorPassword, 'El campo contraseña es obligatorio.', value => value !== '');

    formulario.addEventListener("submit", function (event) {
        errores = [];

        if (!validator.isEmail(email.value)) {
            let mensaje='El nombre debe tener al menos 5 caracteres.'
            agregarError(errorEmail, mensaje)
            errores.push(mensaje);
        }

        if (password.value === '') {
            let mensaje='El campo contraseña es obligatorio.'
            agregarError(errorPassword, mensaje);
            errores.push(mensaje)
        }

        if (errores.length > 0) {
            event.preventDefault();
            alert(errores.join('\n'));
        }
    });
});
