const { Router } = require('express')
const {check} = require('express-validator');
const { getEventos , crearEvento , actualizarEvento , eliminarEventos } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router();
isDate
router.use(validarJWT); 

router.get('/' , getEventos);

router.post('/' ,
    [
        check('title' , 'El titulo es obligatorio').not().isEmpty(),
        check('start' , 'Fecha de inicio es obligatoria').custom(isDate),
        check('end' , 'Fecha de finalización es obligatoria').custom(isDate),
        check('end' , 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ] 
,crearEvento);

router.put('/:id' , actualizarEvento);

router.delete('/:id' , eliminarEventos);

module.exports = router ;