import express from "express";
import { PrismaClient } from '@prisma/client';
import DiceController from '../controllers/DiceController.js';
import CharacterController from '../controllers/CharacterController.js'

const router = express.Router();
const prisma = new PrismaClient();
const diceController = new DiceController();
const  characterController = new CharacterController();

//teste
router.get('/home', async (req, res) => {
    try {
        const user = await prisma.user.findMany();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json('Error no servidor, tente mais tarde!');

    }
});

router.get('/roll', diceController.roll);

router.get('/roll/modified/:modifiers', diceController.rollModified);

router.post('/character',characterController.createCharacter);

router.get('/character/find/:name',characterController.getCharacter);

router.get('/character/findAll',characterController.getAllCharacters);

router.put('/characters/update-parameter/:name', characterController.updateCharacterParameter);

router.put('/characters/update-knowledge/:name', characterController.updateCharacterKnowledge);

router.delete('/characters/delete/:name', characterController.deleteCharacter);


export default router;
