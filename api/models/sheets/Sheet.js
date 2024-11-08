import AbilitieslegacyMap from './../utils/legacyAbilitiesMap.js';

class Sheet {
    constructor(pda, character = {}, equipment = {}, parameters = {}, combat = {}, knowledge = {}, inventory = {}, skill = {}, pointsLife, pointsEnergy) {

        this.pda = pda;
        this.character = {
            nome: character.name,
            legado: character.legacy,
            habilidadesLegado: this.getLegacyAbilities(character.legacy),
        };
        this.equipment = {
            armamento: {
                dano: 0,
                alcance: 0,
                propriedade: '',
                propMistica: ''
            },
            armadura: {
                bloqueio: 0,
                inaptidao: false,
                propMistica: ''
            },
            escudo: {
                bloqueio: 0,
                inaptidao: false,
                propMistica: ''
            },
            ...equipment  // Permite sobrescrever os valores padrão com os fornecidos.
        };
        this.parameters = {
            agilidade: 0,
            brutalidade: 0,
            canalizacao: 0,
            destreza: 0,
            espirito: 0,
            precisao: 0,
            vigor: 0,
            arcanismo: 0,
            ...parameters
        };
        this.combat = {
            habilidadeCombate1: '',
            habilidadeCombate2: '',
            ...combat
        };
        this.knowledge = {
            carisma: 0,
            conhecimentoMistico: 0,
            exploracao: 0,
            furtividade: 0,
            historia: 0,
            intimidacao: 0,
            intuicao: 0,
            medicina: 0,
            percepcao: 0,
            performance: 0,
            religiao: 0,
            sobrevivencia: 0,
            tecnologia: 0,
            vontade: 0,
            maestria: '',
            ...knowledge
        };
        this.inventory = {
            itens: [],
            mp: 120,
            mo: 0,
            mi: 0,
            ...inventory
        };
        this.skill =[...skill];
        this.pointsLifeMax = this.calculateLifePoints();
        this.pointsLife = pointsLife,
        this.pointsEnergy = pointsEnergy;
        this.pointsEnergyMax = this.calculatePointsEnergy();
        this.movement = this.calculateMovement();
        this.block = this.calculateBlock();
    }

    // Método para obter as habilidades do legado com base no legado fornecido.
    getLegacyAbilities(legacy) {
        const abilities = AbilitieslegacyMap[legacy] || {};
        return Object.values(abilities);
    }
    // Método para calcular os pontos maximo  de vida do personagem.
    calculateLifePoints() {
        let pointsLife = 30;
        let contLife = 0;
        for (let i = 1; i <= this.pda; i++) {
            contLife += 3 + (this.parameters.vigor || 0);
        }
        return pointsLife + contLife;
    }
    // Método para calcular os pontos de energia do personagem.
    calculatePointsEnergy() {
        return 4 + this.pda;
    }
    // Método para calcular o movimento do personagem.
    calculateMovement() {
        return 6 + Math.floor((this.parameters.agilidade || 0) / 2);
    }
    // Método para calcular o bloqueio do personagem.
    calculateBlock() {
        return (this.equipment.armadura.bloqueio || 0) + (this.equipment.escudo.bloqueio || 0);
    }
}

export default Sheet;


