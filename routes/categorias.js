const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria,ObtenerCategorias, ObtenerCategoria, actualizarCategoria, borraCategoria } = require('../controllers/categorias');

const { existeUsuarioPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();



//ENDPOINDS
//obtener todas las categorias - publico
router.get('/', ObtenerCategorias );

//obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
    
], ObtenerCategoria);

//crear categoria - privado- cualquier persona con un token valido
router.post('/',[ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ], crearCategoria);

//Actualizar-privado-cualquier token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
    
], actualizarCategoria );

//Borrar una categoria -admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo').isMongoId(),
    
    check('id').custom(existeCategoriaPorId),
    validarCampos

],borraCategoria);


module.exports = router;