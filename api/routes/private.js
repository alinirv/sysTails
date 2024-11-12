import express from "express";
import { PrismaClient } from '@prisma/client';
import DiceController from '../controllers/DiceController.js';
import SheetsController from "../controllers/SheetsController.js";
import CampaingController from "../controllers/CampaingController.js";

const router = express.Router();
const prisma = new PrismaClient();
const diceController = new DiceController();
const sheetsController = new SheetsController();
const campaingController = new CampaingController

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

router.post('/sheet',  sheetsController.createSheet);

router.get('/sheet/find/:id',sheetsController.getSheet);

router.get('/sheet/findAll',sheetsController.getAllSheets);

router.delete('/sheet/delete/', sheetsController.deleteSheet);

router.put('/sheet/update/:id', sheetsController.updateSheet);

router.post('/campaing', campaingController.createCampaign);

router.post('/campaing/joinCampaign', campaingController.joinCampaign);

router.get('/campaing/findSheets', campaingController.getAllCampaignSheets);

router.get('/campaing/find', campaingController.getUserCampaigns);

router.delete('/campaing/delete/:token', campaingController.deleteCampaign);

router.delete('/campaing/deleteSheets', campaingController.deleteSheetCampaign);

router.put('/campaing/update/:token',  campaingController.updateCampaingStatus);

router.get('/campaing/find/:token', campaingController.getCampaignByToken);


export default router;
