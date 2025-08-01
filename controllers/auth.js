const Usuario = require("../models/Usuario");


const crearUsuario = async(req,res) => {
    
    // const { name , email ,password } = req.body;

    const usuario = new Usuario(req.body)
    await usuario.save();
    
    res.json({
        ok:true,
        msg:'registro',
    })
}

const loginUsuario = (req,res) => {

    const { email ,password } = req.body;
    

    res.status(201).json({
        ok:true,
        msg:'login',
        email ,
        password
    })
}

const revalidarToken =  (req,res) => {
    console.log('Se solicito el /');
    res.json({
        ok:true,
        msg:'renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}