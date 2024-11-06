import { PrismaClient } from '@prisma/client';
import Sheet from '../models/sheets/Sheet.js';

const prisma = new PrismaClient();

class SheetsController {

  // Método para criar uma nova ficha
  async createSheet(req, res) {
    const { pda, character, equipment, parameters, combat, knowledge, inventory, skill, pointsLife } = req.body;
    const userId = req.userId;
    const userName = req.userName;

    try {
      // Cria uma nova instância de Sheet com os dados recebidos
      const sheet = new Sheet(parseInt(pda), character, equipment, parameters, combat, knowledge, inventory,skill,parseInt(pointsLife));

      // Cria a nova ficha no banco de dados usando Prisma
      const newSheet = await prisma.sheet.create({
        data: {
          pda: sheet.pda,
          character: sheet.character,
          equipment: sheet.equipment,
          parameters: sheet.parameters,
          combat: sheet.combat,
          knowledge: sheet.knowledge,
          inventory: sheet.inventory,
          skill: sheet.skill,
          pointsLifeMax:sheet.pointsLifeMax,
          pointsLife: sheet.pointsLife,
          pointsEnergy: sheet.pointsEnergy,
          movement: sheet.movement,
          block: sheet.block,
          player: userName,
          userId: userId

        }
      });
      // Retorna a ficha criada com status 201
      return res.status(201).json(newSheet);
    } catch (error) {
      // Retorna erro caso algo dê errado
      return res.status(500).json('Erro ao criar ficha.');
    }
  };

 // Método para obter uma ficha específica pelo ID
  async getSheet(req, res) {
    const id  = req.params;

    try {
      // Busca a ficha no banco de dados
      const sheet = await prisma.sheet.findFirst({
        where: {
          id: id,
        },
      });
      // Verifica se a ficha foi encontrada
      if (!sheet) {
        return res.status(404).json('Ficha não encontrada!');

      }
      return res.status(200).json(sheet);
    } catch (error) {
      // Retorna erro caso algo dê errado
      res.status(500).json(' Ocorreu um erro ao obter a ficha.');
    }
  };

  // Método para obter todas as fichas de um usuário
  async getAllSheets(req, res) {
    const userId = req.userId;

    try {
      // Busca todas as fichas do usuário no banco de dados
      const sheets = await prisma.sheet.findMany({
        where: {
          userId: userId,
        },
      });
      // Verifica se foram encontradas fichas, caso não encontre retorna 404. No caso de existir fichas retorna elas.
      if (sheets.length === 0) {
        return res.status(404).json(' Não foram encontradas fichas para este usuário.');
      }
      res.status(200).json(sheets);

    } catch (error) {
      // Retorna erro caso algo dê errado
      console.error(error);
      res.status(500).json(' Ocorreu um erro ao obter fichas.');
    }
  };
 //revisar
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
  //revisar
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

