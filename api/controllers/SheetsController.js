import { PrismaClient } from '@prisma/client';
import Sheet from '../models/sheets/Sheet.js';

const prisma = new PrismaClient();

class SheetsController {

  async createSheet(req, res) {
    const { name, pda, character, equipment, inventory } = req.body;
    // Verificar se o email já existe
    const existingSheetsName = await prisma.sheet.findFirst({
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
  };

  async getSheet(req, res) {
    const { name } = req.params;
    const userId = req.userId;
    try {
      const sheet = await prisma.sheet.findFirst({
        where: {
          name: name,
          userId: userId,
        },
      });

      if (!sheet) {
        return res.status(400).json('Ficha não encontrada, verifique o nome da ficha!');

      }
      res.status(200).json(sheet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the sheet.' });
      throw error;
    }
  };

  async getAllSheets(req, res) {
    const userId = req.userId;
    try {
      const sheets = await prisma.sheet.findMany({
        where: {
          userId: userId,
        },
      });

      if (sheets.length === 0) {
        return res.status(404).json({ message: 'No sheets found for this user.' });
      }
      res.status(200).json(sheets);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching sheets.' });
    }
  };

  async deleteSheet(req, res) {
    const { name } = req.params;
    const userId = req.userId;
    try {
      const sheet = await prisma.sheet.findFirst({
        where: {
          name: name,
          userId: userId,
        },
      });
      if (sheet) {
        await prisma.sheet.delete({
          where: {
            id: sheet.id
          }
        });
        return res.status(200).json({ message: 'sheet deleted successfully.' });
      } else {
        return res.status(404).json({ message: 'sheet not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the sheet parameter.' });
    }
  };

  async updateSheet(req, res) {
    const { name } = req.params;
    const userId = req.userId;
    const { pda, pointsLife, pointsEnergy, movement, block, equipment, inventory } = req.body;

    try {
      const sheet = await prisma.sheet.findFirst({
        where: {
          name: name,
          userId: userId,
        },
      });

      if (sheet) {
        const updatedSheet = await prisma.sheet.update({
          where: { id: sheet.id, userId: userId },
          data: {
            pda: pda !== undefined ? pda : sheet.pda,
            pointsLife: pointsLife !== undefined ? pointsLife : sheet.pointsLife,
            pointsEnergy: pointsEnergy !== undefined ? pointsEnergy : sheet.pointsEnergy,
            movement: movement !== undefined ? movement : sheet.movement,
            block: block !== undefined ? block : sheet.block,
            equipment: equipment ? { ...sheet.equipment, ...equipment } : sheet.equipment,
            inventory: inventory ? { ...sheet.inventory, ...inventory } : sheet.inventory,
          },
        });
        return res.status(200).json(updatedSheet);
      } else {
        return res.status(404).json({ message: 'sheet not found.' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the sheet parameter.' });
    }
  };

}

export default SheetsController;

