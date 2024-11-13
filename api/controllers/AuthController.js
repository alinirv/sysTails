import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import sendEmail from "../utils/sendEmail.js";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

class AuthController {
    async signup(req, res) {
        const { name, email, password } = req.body;

        // Função para cadastro de novo usuário
        try {
            // Verificar se o email já existe
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) return res.status(400).json("Email já existe!");

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: { name, email, password: hashedPassword }
            });

            const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: "1d" });
            return res.status(201).json(token);
        } catch (error) {
            res.status(500).json("Erro ao criar usuário.");
        }
    };

    // Função para login de usuário
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(404).json("Usuário não encontrado!");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json("Senha inválida!");

            const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: "1d" });
            return res.status(200).json(token);
        } catch (error) {
            res.status(500).json("Erro ao autenticar.");
        }
    }
    // Função para solicitar redefinição de senha
    async requestPasswordReset(req, res) {
        const { email } = req.body;

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(404).json("Usuário não encontrado!");

            const resetToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
            await prisma.user.update({
                where: { email },
                data: {
                    resetToken,
                    resetTokenExpiry: new Date(Date.now() + 3600000),
                },
            });

            const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
            await sendEmail(email, "Recuperação de Senha", `Clique no link: ${resetLink}`);
            
            //Avaliação de teste, retirar em produção
            res.status(200).json(`http://localhost:5173/reset-password/${resetToken}`);
        } catch (error) {
            console.log(error) 
            res.status(500).json("Erro ao solicitar redefinição.");
        }
    }

    // Função para redefinir a senha
    async resetPassword(req, res) {
        const { token, newPassword } = req.body;

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const user = await prisma.user.findFirst({
                where: {
                    email: decoded.email,
                    resetToken: token,
                    resetTokenExpiry: { gt: new Date() },
                },
            });

            if (!user) return res.status(400).json("Token inválido ou expirado.");

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: { email: decoded.email },
                data: {
                    password: hashedPassword,
                    resetToken: null,
                    resetTokenExpiry: null,
                },
            });

            res.status(200).json("Senha redefinida com sucesso.");
        } catch (error) {
            res.status(500).json("Erro ao redefinir senha.");
        }
    }

};

export default AuthController;