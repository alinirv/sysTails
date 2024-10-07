import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const router = express.Router();

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

export default router;