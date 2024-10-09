import Character from '../models/character/Character.js';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

class CharacterController {

  async teste(req, res) {
    const { name, legacy, parameters, combat, knowledge } = req.body;
    const  character = new Character(name,legacy,parameters,combat,knowledge);

    try {
      const newCharacter = await prisma.character.create({
        data: {
          name: character.name,
          legacy: character.legacy,
          legacyAbilities:character.legacyAbilities,
          parameters: character.parameters,
          combat:character.combat,
          knowledge:character.knowledge,
          userId: req.userId, 
        }
      })
      res.status(201).json(newCharacter); //modificar depois******
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to create character' });
    }
  }

}

export default CharacterController;