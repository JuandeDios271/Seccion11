const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearProducto, ObtenerProducto, actualizarProducto, borraProducto, ObtenerProductos } = require('../controllers/productos');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { borraCategoria } = require('../controllers/categorias');

const router = Router();



//ENDPOINDS
//obtener todas las categorias - publico
router.get('/', ObtenerProductos );

//obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
    
], ObtenerProducto);

//crear categoria - privado- cualquier persona con un token valido
router.post('/',[ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un ID de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
 ], crearProducto);

//Actualizar-privado-cualquier token valido
router.put('/:id',[
    validarJWT,
    //check('categoria','No es un ID de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
    
], actualizarProducto );

//Borrar una categoria -admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo').isMongoId(),
    
    check('id').custom(existeProductoPorId),
    validarCampos

],borraProducto);


module.exports = router;