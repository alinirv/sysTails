
class Sheet {
    constructor(name,pda, character, equipment = {}, inventory={}) {
        this.name = name;
        this.pda = pda;
        this.character = character;
        this.equipment = {
            armament: {
                damage: 0,
                range: 0,
                property: '',
                propMystic: ''
            },
            armor: {
                block: 0,
                disable: false, //altera para true dependendo da armadura
                propMystic: ''
            },
            shield: {
                block: 0,
                disable: false,
                propMystic: ''
            },
            ...equipment
        };
        this.inventory = {
            itens: [],
            mp: 120, // modificar valaro func soma ou subtrai
            mo: 0,
            mi: 0,
            ...inventory
        };
        this.pointsLife = this.calculateLifePoints();
        this.pointsEnergy = this.calculatePointsEnergy();
        this.movement = this.calculateMovement();
        this.block = this.calculateBlock();
        this.characterId = character.id;
    }
    calculateLifePoints() { // corrigir para somar apenas o novo valor do pda preseva o ja existente
        let  pointsLife = 30
        let contLife = 0
        for (let i = 1; i <= this.pda; i++) {
           contLife += 3 + this.character.parameters.vigor;
        }
        return pointsLife + contLife;
    }

    calculatePointsEnergy() { 
        return 4 + this.pda;
    }

    calculateMovement() {
        return 6 + Math.floor(this.character.parameters.agility / 2); // aredonda para baixo
    }

    calculateBlock() {
        return this.equipment.armor.block + this.equipment.shield.block || 0;
    }
}

export default Sheet;

