import AbilitieslegacyMap from './../utils/legacyAbilitiesMap.js';

class Sheet {
    constructor(pda, character = {}, equipment = {}, parameters = {}, combat = {}, knowledge = {}, inventory = {}) {
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
            ...equipment
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
        this.pointsLife = this.calculateLifePoints();
        this.pointsEnergy = this.calculatePointsEnergy();
        this.movement = this.calculateMovement();
        this.block = this.calculateBlock();
    }

    getLegacyAbilities(legacy) {
        const abilities = AbilitieslegacyMap[legacy] || {};
        return Object.values(abilities);
    }

    calculateLifePoints() {
        let pointsLife = 30;
        let contLife = 0;
        for (let i = 1; i <= this.pda; i++) {
            contLife += 3 + (this.parameters.vigor || 0);
        }
        return pointsLife + contLife;
    }

    calculatePointsEnergy() {
        return 4 + this.pda;
    }

    calculateMovement() {
        return 6 + Math.floor((this.parameters.agilidade || 0) / 2);
    }

    calculateBlock() {
        return (this.equipment.armadura.bloqueio || 0) + (this.equipment.escudo.bloqueio || 0);
    }
}

export default Sheet;


