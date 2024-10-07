import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next)=>{

    const token = req.headers.authorization;

    if(!token){
        res.status(401).json('Credenciais inválida');
    }

    try{
        const decoded = jwt.verify(token.replace('Bearer ',''), JWT_SECRET);

        req.userId = decoded.id;
        req.userName = decoded.name;

        console.log(req)
        next();

    }catch{
        res.status(401).json('Token inválido!');
    }

}

export default auth;