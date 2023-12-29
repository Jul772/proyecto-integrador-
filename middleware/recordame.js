const db = require('../database/models');
async function recordame(req, res, next) {
    try {
        if (req.cookies && req.cookies.recordame && !req.session.userId) {
            const { userId } = req.cookies.recordame;

            // Buscar usuario por ID en la base de datos
            const user = await db.User.findByPk(userId);

            if (user) {
                // Asignar información del usuario a la sesión
                req.session.userId = user.id;
                req.session.userData = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    avatar: user.avatar,
                };
            }
        }
    } catch (error) {
        console.error('Error en la función recordame:', error);
    }

    next();
}

module.exports = recordame;
