window.addEventListener("load", function () {
    let formulario = document.querySelector('.formulario');

    let name = document.querySelector('.name');
    let errorName = document.querySelector('.errorName');

    let img = document.querySelector('.img');
    let errorImg = document.querySelector('.errorImg');

    let description = document.querySelector('.description');
    let errorDescription = document.querySelector('.errorDescription');

    function validarCampo(value, minLength) {
        return value.length >= minLength;
    }

    function agregarError(elemento, mensaje) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
    }

    function quitarError(elemento) {
        elemento.textContent = '';
        elemento.style.display = 'none';
    }

    name.addEventListener("blur", function () {
        if (!validarCampo(name.value, 5)) {
            agregarError(errorName, 'El nombre debe tener al menos 5 caracteres.');
            name.classList.add('errorsInput')
        } else {
            quitarError(errorName);
        }
    });

    description.addEventListener("blur", function () {
        if (!validarCampo(description.value, 20)) {
            agregarError(errorDescription, 'La descripción debe tener al menos 20 caracteres.');
            description.classList.add('errorsInput')
        } else {
            quitarError(errorDescription);
        }
    });

    img.addEventListener("blur", function () {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = img.value.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            agregarError(errorImg, 'El archivo de imagen debe ser JPG, JPEG, PNG o GIF.');
            img.classList.add('errorsInput')
        } else {
            quitarError(errorImg);
        }
    });

    formulario.addEventListener("submit", function (event) {
        let errores = [];

        if (!validarCampo(name.value, 5)) {
            errores.push('El nombre debe tener al menos 5 caracteres.');
            agregarError(errorName, 'El nombre debe tener al menos 5 caracteres.');
        } else {
            quitarError(errorName);
        }

        if (!validarCampo(description.value, 20)) {
            errores.push('La descripción debe tener al menos 20 caracteres.');
            agregarError(errorDescription, 'La descripción debe tener al menos 20 caracteres.');
        } else {
            quitarError(errorDescription);
        }

        if(img.value!=''){
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileExtension = img.value.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                errores.push('El archivo de imagen debe ser JPG, JPEG, PNG o GIF.');
                agregarError(errorImg, 'El archivo de imagen debe ser JPG, JPEG, PNG o GIF.');
            } else {
                quitarError(errorImg);
            }

        }

        if (errores.length > 0) {
            event.preventDefault(); 
            alert(errores.join('\n')); 
        }
    });
});