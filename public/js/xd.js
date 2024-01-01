const Sequelize = require('sequelize');
const { Op } = require('sequelize');

function decodeCookieValue(encodedValue) {
    return decodeURIComponent(encodedValue.replace(/\+/g, ' '));
}
function getCookieByName(nombre) {
    var nombreEQ = nombre + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nombreEQ) === 0) {
            return decodeCookieValue(cookie.substring(nombreEQ.length, cookie.length));
        }
    }
    return null;
}

const getUserNameByIdFromDB = async (userId) => {
  try {
    const user = await db.User.findOne({
      attributes: ['id', 'firstName'], // Ajusta los atributos según tu modelo de usuario
      where: {
        id: userId,
      },
    });

    return user ? user.nombre : null;
  } catch (error) {
    console.error('Error al buscar el nombre de usuario en la base de datos:', error);
    throw new Error('Error al buscar el nombre de usuario en la base de datos:', error);
  }
};

const actualizarNombreUsuarioEnHTML = async () => {
    const recordarCookie = getCookieByName('recordame');
    if (recordarCookie) {
    // Si existe la cookie "recordame"
    document.getElementById('usuario').style.display = 'block';
    document.getElementById('divLogin').style.display = 'none';
    document.getElementById('divRegister').style.display = 'none';

    try {
      const { id } = JSON.parse(recordarCookie); // Parsear la cadena JSON
      const nombreUsuario = await getUserNameByIdFromDB(id);

      if (nombreUsuario) {
        // Si se encontró el nombre de usuario en la base de datos
        document.getElementById('nombreUsuario').textContent = nombreUsuario;
        document.getElementById('usuario').addEventListener('click', () => {
          window.location.href = `/users/perfil/${id}`;
        });
      }
    } catch (error) {
      console.error('Error al parsear la cookie:', error);
      throw new Error('Error al parsear la cookie:', error);
    }
  } else {
    document.getElementById('usuario').style.display = 'none';
    document.getElementById('divLogin').style.display = 'block';
    document.getElementById('divRegister').style.display = 'block';
  }
};

// Llamada a la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  actualizarNombreUsuarioEnHTML();
});
