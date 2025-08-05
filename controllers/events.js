const { response } = require("express")
const Evento = require("../models/Evento")




const getEventos = async(req , res = response) => {

    const eventos = await Evento.find().populate('user','name');

    res.status(200).json({
        ok:true,
        msg:'getEventos',
        eventos
    })


}

const crearEvento = async(req , res = response) => {

    const evento = new Evento (req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.json({
            ok:true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

const actualizarEvento = async(req , res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {
        const evento = await Evento.findById(eventoId)

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'El evento con este ID no existe'
            })
        }

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:'No tienes privilegios para cambiar este evento'
            })
        }

        const nuevoEvento =  {
            ...req.body,
            user: uid 
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId , nuevoEvento , { new:true})

        res.json({
            ok:true,
            evento : eventoActualizado
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg : 'Hable con el Administrador'
        })
    }

}

const eliminarEventos = async(req , res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {
        const evento = await Evento.findById(eventoId)

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'El evento con este ID no existe'
            })
        }

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:'No tienes privilegios para cambiar este evento'
            })
        }

        const nuevoEvento =  {
            ...req.body,
            user: uid 
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId , nuevoEvento)

        res.json({
            ok:true,
            msg : 'Evento Eliminado',
            eventoEliminado
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg : 'Hable con el Administrador'
        })
    }

}


module.exports = {
    getEventos,   
    crearEvento,   
    actualizarEvento,   
    eliminarEventos
}