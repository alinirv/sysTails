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
        const { campaignToken, sheetId } = req.body;
        const userId = req.userId;

        try {

            const campaign = await prisma.campaign.findFirst({
                where: {
                    token: campaignToken
                },
            });

            const sheet = await prisma.sheet.findFirst({
                where: {
                    id: sheetId,
                    userId: userId,
                },
            });

            if (campaign && sheet) {

                if (campaign.status === 'CLOSED') {
                    return res.status(404).json({ message: 'Campanha encerrada.' });
                }
                // Verificar se a ficha já está associada à campanha
                const existingEntry = await prisma.campaignSheets.findFirst({
                    where: {
                        campaignId: campaign.id,
                        sheetId: sheet.id,
                    },
                });
                if (existingEntry) {
                    return res.status(400).json({ message: 'Ficha já está associada a esta campanha.' });
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

                const campaignSheets = await prisma.campaignSheets.findMany({
                    where: {
                        campaignId: campaigns.id,
                    },
                });

                if (campaignSheets.length === 0) {
                    return res.status(404).json('No sheets found for this campaign .');
                }

                const sheetIds = campaignSheets.map(cs => cs.sheetId);

                const sheets = await prisma.sheet.findMany({
                    where: {
                        id: { in: sheetIds },
                    },
                });

                return res.status(200).json(sheets);
            }
            return res.status(404).json('Campaigns not found.');

        } catch (error) {
            console.error(error);
            res.status(500).json('An error occurred while fetching campaigns.');
        }
    };

    async deleteCampaign(req, res) {
        const { campaignToken } = req.params;
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
                return res.status(404).json('Ficha não encontrada ou associada a essa campanha.');
            }

            await prisma.campaignSheets.delete({
                where: {
                    id: campaignSheet.id
                },
            });

            return res.status(200).json('Ficha removida da campanha com sucesso');
        } catch (error) {
            console.error(error);
            res.status(500).json('Ocorreu um erro ao remover a ficha da campanha.');
        }
    }

    async updateCampaingStatus(req, res) {
        const { token } = req.params;
        const userId = req.body;

        try {
            const campaing = await prisma.campaign.findFirst({
                where: {
                    token: token,
                    userId: userId,
                },
            });

            if (!campaing) {
                return res.status(404).json('Campanha não encontrada.');
            }

            // Atualizar o status da campanha
            const updatedCampaign = await prisma.campaign.update({
                where: { id: campaing.id },
                data: {
                    status: 'CLOSED',
                },
            });

            return res.status(200).json(updatedCampaign);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while updating the Campaing parameter.' });
        }
    };

    async getUserCampaigns(req, res) {
        const userId = req.userId;

        try {
            const campaigns = await prisma.campaign.findMany({
                where: {
                    userId: userId,
                },
            });

            if (campaigns.length === 0) {
                return res.status(404).json('No campaigns found for this user.');
            }

            return res.status(200).json(campaigns);
        } catch (error) {
            console.error(error);
            res.status(500).json('An error occurred while fetching user campaigns.');
        }
    }
    async getCampaignByToken(req, res) {
        const { token } = req.params;
        try {
            const campaign = await prisma.campaign.findFirst({
                where: {
                    token: token,
                },
                include: {
                    sheets: {
                        include: {
                            sheet: true
                        }
                    }
                },
            });

            if (!campaign) {
                return res.status(404).json({ message: 'Campanha não encontrada.' });
            }

            return res.status(200).json(campaign);
        } catch (error) {
            console.error('Erro ao buscar campanha:', error);
            res.status(500).json({ message: 'Erro ao buscar a campanha.' });
        }
    }

}

export default CampaingController