import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
    try {
        const user = req.body;

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(user.password, salt);

        const userdb = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword
            }

        })
        res.status(201).json(userdb);
    } catch (err) {
        res.status(500).json('Error no servidor, tente mais tarde!');

    }
});

router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body;

        //find user in database
        const user = await prisma.user.findUnique({
            where: { email: userInfo.email },
        })

        // check if the user exists
        if (!user) {
            res.status(404).json('Usuário não encontrado!');
        }

        //validate that the password is correct
        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if (!isMatch) {
            return res.status(400).json('Senha inválida!')
        }

        //generate token
        const payload ={
            id: user.id,
            name: user.name
        };
        const token = jwt.sign(payload, JWT_SECRET,{expiresIn:'1m'})
        
        res.status(200).json(token);

    } catch (err) {
        res.status(500).json('Error no servidor, tente mais tarde!');
    }

})

export default router;