import { PrismaClient } from '@prisma/client';
import Sheet from '../models/sheets/Sheet.js';

const prisma = new PrismaClient();

class SheetsController {

  async createSheet(req, res) {
    const { pda, character, equipment, parameters, combat, knowledge, inventory } = req.body;
    const userId = req.userId;
    const userName = req.userName;

    try {
      const sheet = new Sheet(parseInt(pda), character, equipment, parameters, combat, knowledge, inventory);

      const newSheet = await prisma.sheet.create({
        data: {
          pda: sheet.pda,
          character: sheet.character,
          equipment: sheet.equipment,
          parameters: sheet.parameters,
          combat: sheet.combat,
          knowledge: sheet.knowledge,
          inventory: sheet.inventory,
          pointsLife: sheet.pointsLife,
          pointsEnergy: sheet.pointsEnergy,
          movement: sheet.movement,
          block: sheet.block,
          player: userName,
          userId: userId

        }
      });

      return res.status(201).json(newSheet);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Erro ao criar ficha.');
    }
  };


  async getSheet(req, res) {
    const { id } = req.params;
    try {
      const sheet = await prisma.sheet.findFirst({
        where: {
          id: id,
        },
      });

      if (!sheet) {
        return res.status(404).json('Ficha não encontrada!');

      }
      return res.status(200).json(sheet);
    } catch (error) {
      console.error(error);
      res.status(500).json(' Ocorreu um erro ao obter a ficha.');
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
        return res.status(404).json(' Não foram encontradas fichas para este usuário.');
      }
      res.status(200).json(sheets);

    } catch (error) {
      console.error(error);
      res.status(500).json(' Ocorreu um erro ao obter fichas.');
    }
  };

  async deleteSheet(req, res) {
    const { id } = req.params;
    try {
      await prisma.sheet.findFirst({
        where: {
          id: id,
        },
      });
      return res.status(200).json('Ficha deletada com sucesso.');

    } catch (error) {
      console.error(error);
      res.status(500).json('Ocorreu um erro ao deletar a ficha.');
    }
  };

  async updateSheet(req, res) {
    const { id } = req.params;
    const userId = req.userId;
    const { pda, pointsLife, pointsEnergy, movement, block, equipment, inventory } = req.body;

    try {
      const updatedSheet = await prisma.sheet.update({
        where: { id: id, userId: userId },
        data: {
          pda: pda !== undefined ? pda : pda,
          pointsLife: pointsLife !== undefined ? pointsLife : pointsLife,
          pointsEnergy: pointsEnergy !== undefined ? pointsEnergy : pointsEnergy,
          movement: movement !== undefined ? movement : movement,
          block: block !== undefined ? block : block,
          equipment: equipment ? { ...equipment, ...equipment } : equipment,
          inventory: inventory ? { ...inventory, ...inventory } : inventory,
        },
      });
      return res.status(200).json(updatedSheet);

    } catch (error) {
      console.error(error);
      res.status(500).json(' Ocorreu um erro ao atualizar os parâmetros da ficha.');
    }
  };

}

export default SheetsController;

