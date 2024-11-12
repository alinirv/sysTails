import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar se o email já existe
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json('Email já existe!');
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userdb = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashPassword
            }
        });

        // Gerar token
        const payload = {
            id: userdb.id,
            name: userdb.name
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json(token);

    } catch (err) {
        res.status(500).json('Erro no servidor, tente mais tarde!');
    }
});

router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body;

        const user = await prisma.user.findUnique({
            where: { email: userInfo.email },
        })


        if (!user) {
            return res.status(404).json('Usuário não encontrado!');
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if (!isMatch) {
            return res.status(400).json('Senha inválida!')
        }

        //generate token
        const payload = {
            id: user.id,
            name: user.name
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
        const userID = user.id

        return res.status(200).json(token);


    } catch (err) {
        res.status(500).json('Error no servidor, tente mais tarde!');
    }

})

export default router;