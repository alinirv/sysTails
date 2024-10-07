import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';


const router = express.Router();
const prisma = new PrismaClient();


router.get('/home', async (req, res) => {
    try {
        const user = await prisma.user.findMany()
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json('Error no servidor, tente mais tarde!');

    }
});

export default router