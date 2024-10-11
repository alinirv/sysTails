import { PrismaClient } from '@prisma/client';
import Sheet from '../models/sheets/Sheet.js';

const prisma = new PrismaClient();

class SheetsController {

    async createSheet(req, res) {
        const { name, pda, character, equipment, inventory } = req.body;
        // Verificar se o email já existe
        const existingSheetsName = await prisma.sheet.findUnique({
            where: {
                name: name,
                userId: req.userId,
            },
        });

        if (existingSheetsName) {
            return res.status(400).json('Esse nome já existe. Por favor escolha outro!');

        }
        try {
            const sheet = new Sheet(name, parseInt(pda), character, equipment, inventory);
            const newSheet = await prisma.sheet.create({
                data: {
                    name: sheet.name,
                    pda: sheet.pda,
                    pointsLife: sheet.pointsLife,
                    pointsEnergy: sheet.pointsEnergy,
                    movement: sheet.movement,
                    block: sheet.block,
                    equipment: sheet.equipment,
                    inventory: sheet.inventory,
                    userId: req.userId,
                    characterId: sheet.characterId
                },
            });
            return res.status(201).json(newSheet);
        } catch (error) {
            console.error('Erro ao criar ficha:', error);
            return res.status(500).json({ message: 'Erro ao criar ficha', error });
        }
    }

}

export default SheetsController;

