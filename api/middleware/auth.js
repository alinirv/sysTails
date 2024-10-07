import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next)=>{

    const token = req.headers.authorization;

    console.log(token)

    if(!token){
        res.status(401).json('Credenciais inválida');
    }

    try{
        const decoded = jwt.verify(token.replace('Bearer ',''), JWT_SECRET);
        next();

    }catch{
        res.status(401).json('Token inválido!');
    }

}

export default auth;