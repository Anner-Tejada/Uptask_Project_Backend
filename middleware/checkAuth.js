import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js';

const checkAuth = async (req, res, next) =>{
    let token;
    //Colocaremos un if revisar si esta la utorizacion 
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //de esta forma obtenemos el id del usuario que viene del token
            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v")

            return next();

        }catch(error){
            return res.status(404).json({msg:"Hubo un error"})
        }

        //si el usuario no manda un token
        if(!token){
            const error = new Error('Token no valido')
            return res.status(401).json({msg: error.message})

        }

    }

    next()
}

export default checkAuth