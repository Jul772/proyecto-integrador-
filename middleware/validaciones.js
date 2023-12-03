const {body, check}=require('express-validator')
const path=require('path')
const db=require('../database/models')

const validator={
   usersValidatorLogin:[
      body('email')
         .notEmpty()
         .withMessage('Agrega un email por favor')
         .bail()
         .isEmail()
         .withMessage('Debes completar con un email valido'),
      body('password')
         .notEmpty()
         .withMessage('Agrega una contraseña')
   ],


   usersValidatorRegister:[
      body('firstName')
      .notEmpty().withMessage('Debe escribir su nombre').bail()
         .isLength({min:2}).withMessage('Tu nombre necesita tener al menos 2 caracteres'),

      body('lastName')
      .notEmpty().withMessage('Debe escribir su apellido').bail()
         .isLength({min:2}).withMessage('Tu apellido necesita tener al menos 2 caracteres'),

      body('username')
      .notEmpty().withMessage('Debe escribir un nombre de usuario'),

      body('email')
         .notEmpty().withMessage('Tienes que escribir tu correo electrónico').bail()
         .isEmail().withMessage('Por favor ingresa un correo valido')
         .custom(async (value) => {
            const existeEmail = await db.User.findOne({ where: { email:value } });
            if (existeEmail) {
            throw new Error('Este email ya está registrado, Deseas iniciar sesión?');
            }
            return true
         }),

      body('password')
      .notEmpty().withMessage('Debe escribir una contraseña').bail()
      .isLength( {min:8}).withMessage('Tu contraseña debe tener al menos 8 caracteres'),

      body('birthdate')
      .notEmpty().withMessage('Ingrese su fecha de Nacimiento'),

      body('avatar').custom((value, { req }) => {
           if (req.file) { // Verificar si se ha cargado un archivo
            let fileExtension = path.extname(req.file.originalname);
            let acceptedExtensions = ['.jpg', '.png','jpeg','gif'];
            if (!acceptedExtensions.includes(fileExtension)) {
               throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
         }
           // Si no se ha cargado un archivo, simplemente continúa sin errores.
         return true;
      })
   ],


   productsValidatorUpdate:[
      body("name")
         .notEmpty().withMessage("Debes completar el nombre")
         .isLength({min:5}).withMessage("El nombre debe tener al menos 5 caracteres"),
      body('price')
         .notEmpty().withMessage("Debes completar el precio")
         .custom((value) => {
            if (parseFloat(value) <= 0) {
               throw new Error("El precio debe ser mayor que 0");
            }
            return true;
         }),
      body('discount')
         .notEmpty().withMessage("Debes completar el descuento")
         .isInt({ min: 0, max: 100 }).withMessage("El descuento debe estar entre 0 y 100"),
      body("description").notEmpty().withMessage("Debes completar la descripción").bail()
      .isLength({min:20}).withMessage('Tu descripción debe tener al menos 20 caracteres'),
      body("category").notEmpty().withMessage("Debes poner una categoría"),
      body('productImg').custom((value, { req }) => {
         let file = req.file;
         let acceptedExtensions = ['.jpg', '.png','jpeg','gif'];
         if(file){
         let fileExtension = path.extname(file.originalname);
         if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
         }
      }
   
         return true;
      })
   ],


   productsValidatorCreate:[
      body("name")
         .notEmpty().withMessage("Debes completar el nombre")
         .isLength({min:5}).withMessage("el nombre debe tener al menos 5 caracteres"),
      body('price')
         .notEmpty().withMessage("Debes completar el precio")
         .custom((value) => {
            if (parseFloat(value) <= 0) {
               throw new Error("El precio debe ser mayor que 0");
            }
            return true;
         }),
      body('discount')
         .notEmpty().withMessage("Debes completar el descuento")
         .isInt({ min: 0, max: 100 }).withMessage("El descuento debe estar entre 0 y 100"),
      body("description").notEmpty().withMessage("Debes completar la descripción"),
      body("category").notEmpty().withMessage("Debes poner una categoría"),
      body('productImg').custom((value, { req }) => {
         let file = req.file;
         let acceptedExtensions = ['.jpg', '.png','.jpeg','.gif'];
      if(!file){
         throw new Error('Debes subir una imagen')
      } else {
         let fileExtension = path.extname(file.originalname);
         if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
         }
      }
         return true;
      })
   ]
}
module.exports=validator