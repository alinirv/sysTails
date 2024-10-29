import { PrismaClient } from '@prisma/client';
import Campaning from '../models/campaign/Campaign.js'

const prisma = new PrismaClient();

class CampaingController {

    async createCampaign(req, res) {
        const { name, description, masterName } = req.body;
        const campaign = new Campaning(name, description, masterName)

        try {
            const newCampaign = await prisma.campaign.create({
                data: {
                    name: campaign.name,
                    description: campaign.description,
                    masterName: campaign.masterName,
                    status: campaign.status,
                    token: campaign.token,
                    userId: req.userId,
                }
            });
            return res.status(201).json(newCampaign);

        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar a campanha.' });
        }
    };

    async joinCampaign(req, res) {
        const { campaignToken, sheetName } = req.body;
        const userId = req.userId;

        try {

            const campaign = await prisma.campaign.findFirst({
                where: {
                    token: campaignToken
                },
            });

            const sheet = await prisma.sheet.findFirst({
                where: {
                    name: sheetName,
                    userId: userId,
                },
            });

            if (campaign && sheet) {

                if (campaign.status === 'CLOSED') {
                    return res.status(404).json({ message: 'Campanha encerrada.' });
                }
                await prisma.campaignSheets.create({
                    data: {
                        campaignId: campaign.id,
                        sheetId: sheet.id,
                        assignedBy: userId
                    }
                });

                return res.status(200).json({ message: 'Ficha adicionada à campanha com sucesso.' });
            }
            return res.status(404).json({ message: 'Verifique se a campanha esta aberta ou se o nome da ficha esta correto!.' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao adicionar a ficha à campanha.' });
        }
    };

    async getAllCampaignSheets(req, res) {
        const { campaignToken } = req.body;
        const userId = req.userId;

        try {
            const campaigns = await prisma.campaign.findFirst({
                where: {
                    token: campaignToken
                },
            });

            if (campaigns.length != 0) {

                const campaignSheets = await prisma.CampaignSheets.findMany({
                    where: {
                        campaignId: campaigns.id,
                    },
                });

                if (campaignSheets.length === 0) {
                    return res.status(404).json({ message: 'No sheets found for this campaign  .' });
                }

                const sheetIds = campaignSheets.map(cs => cs.sheetId);

                const sheets = await prisma.sheet.findMany({
                    where: {
                        id: { in: sheetIds },
                    },
                });

                return res.status(200).json(sheets);
            }
            return res.status(404).json({ message: 'Campaigns not found.' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching campaigns.' });
        }
    };

    async deleteCampaign(req, res) {
        const {campaignToken} = req.params;
        const userId = req.userId;

        try {
            const campaign = await prisma.campaign.findFirst({
                where: {
                    token: campaignToken,
                    userId: userId,
                },
            });

            if (campaign) {
                await prisma.campaignSheets.deleteMany({
                    where: { campaignId: campaign.id },
                });

                await prisma.campaign.delete({
                    where: {
                        id: campaign.id
                    }
                });
                return res.status(200).json({ message: 'campaign deleted successfully.' });
            }
            return res.status(404).json({ message: 'campaign not found.' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred when deleting the campaign.' });
        }
    };
    async deleteSheetCampaign(req, res) {
        const { campaignId, sheetId } = req.body;
    
        try {
            const campaignSheet = await prisma.campaignSheets.findFirst({
                where: {
                    campaignId: campaignId,
                    sheetId: sheetId,
                },
            });
    
            if (!campaignSheet) {
                return res.status(404).json({ message: 'This sheet is not associated with the campaign.' });
            }
    
            await prisma.campaignSheets.delete({
                where: {
                    campaignId_sheetId: {
                        campaignId: campaignId,
                        sheetId: sheetId,
                    },
                },
            });
    
            return res.status(200).json({ message: 'Sheet successfully removed from campaign.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while removing the sheet from the campaign.' });
        }
    }

    async updateCampaingStatus(req, res) {
        const { token } = req.params;
        const userId = req.body;

        try {
            const Campaing = await prisma.campaign.findFirst({
                where: {
                    token: token,
                },
            });

            if (Campaing) {
                const updatedCampaing = await prisma.campaign.update({
                    where: { id: Campaing.id, userId: userId },
                    data: {
                        status: 'CLOSED',
                    },
                });
                return res.status(200).json(updatedCampaing);
            } else {
                return res.status(404).json({ message: 'Campaing not found.' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while updating the Campaing parameter.' });
        }
    };

    async getUserCampaigns(req, res) {
        const userId = req.userId;
    
        try {
            const campaigns = await prisma.campaign.findMany({
                where: {
                    userId: userId, 
                },
                include: {
                    sheets: true,
                },
            });
    
            if (campaigns.length === 0) {
                return res.status(404).json({ message: 'No campaigns found for this user.' });
            }
    
            return res.status(200).json(campaigns);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching user campaigns.' });
        }
    }
}

export default CampaingController