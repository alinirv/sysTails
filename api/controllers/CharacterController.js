import Character from '../models/character/Character.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CharacterController {

  async createCharacter(req, res) {
    const { name, legacy, parameters, combat, knowledge } = req.body;
    const character = new Character(name, legacy, parameters, combat, knowledge);

    try {
      const newCharacter = await prisma.character.create({
        data: {
          name: character.name,
          legacy: character.legacy,
          legacyAbilities: character.legacyAbilities,
          parameters: character.parameters,
          combat: character.combat,
          knowledge: character.knowledge,
          userId: req.userId,
        }
      })
      res.status(201).json(newCharacter); //modificar depois******
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to create character' });
    }
  };

  async getCharacter(req, res) {
    const { name } = req.params;
    const userId = req.userId;
    try {
      const character = await prisma.character.findFirst({
        where: {
          name: name,
          userId: userId,
        },
      });
      res.status(200).json(character);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the character.' });
      throw error;
    }
  };

  async getAllCharacters(req, res) {
    const userId = req.userId;
    try {
      const characters = await prisma.character.findMany({
        where: {
          userId: userId,
        },
      });

      if (characters.length === 0) {
        return res.status(404).json({ message: 'No characters found for this user.' });
      }
      res.status(200).json(characters);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching characters.' });
    }
  };

  async updateCharacterParameter(req, res) {
    const { name } = req.params;
    const userId = req.userId;
    const { parameter, value } = req.body;
    try {
      const character = await prisma.character.findFirst({
        where: {
          name: name,
          userId: userId,
        },
      });
      if (character) {
        const updatedCharacter = await prisma.character.update({
          where: { id: character.id, userId: userId },
          data: {
            parameters: {
              ...character.parameters,
              [parameter]: value
            }
          }
        });
        return res.status(200).json(updatedCharacter);
      } else {
        return res.status(404).json({ message: 'Character not found.' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the character parameter.' });
    }
  };

  async updateCharacterKnowledge(req, res) {
    const { name } = req.params;
    const userId = req.userId;
    const { knowledge, value } = req.body;
    try {
      const character = await prisma.character.findFirst({
        where: {
          name: name,
          userId: userId,
        },
      });
      if (character) {
        const updatedCharacter = await prisma.character.update({
          where: { id: character.id, userId: userId },
          data: {
            knowledge: {
              ...character.knowledge,
              [knowledge]: value
            }
          }
        });
        return res.status(200).json(updatedCharacter);
      } else {
        return res.status(404).json({ message: 'Character not found.' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the character parameter.' });
    }
  };

  async deleteCharacter(req, res) {
    const { name } = req.params;
    const userId = req.userId;
    try {
      const character = await prisma.character.findFirst({
        where: {
          name: name,
          userId: userId,
        },
      });
      if (character) {
        await prisma.character.delete({
          where: {
            id: character.id
          }
        });
        return res.status(200).json({ message: 'Character deleted successfully.' });
      } else {
        return res.status(404).json({ message: 'Character not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the character parameter.' });
    }
  };


}

export default CharacterController;

