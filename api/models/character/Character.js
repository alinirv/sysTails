import AbilitieslegacyMap from './../utils/legacyAbilitiesMap.js';

class Character {

    constructor(name, legacy, parameters = {}, combat = {}, knowledge = {}) {
        this.name = name;
        this.legacy = legacy;
        this.legacyAbilities = this.getLegacyAbilities(legacy);
        this.parameters = {
            agility: 0,
            brutality: 0,
            channeling: 0,
            dexterity: 0,
            spirit: 0,
            precision: 0,
            strength: 0,
            ...parameters 
        };
        this.combat = {
            habilidadeCombate1: '',
            habilidadeCombate2: '',
            ...combat
        };
        this.knowledge = {
            charisma: 0,
            knowledgeMysticism: 0,
            exploration: 0,
            stealth: 0,
            history: 0,
            intimidation: 0,
            intuition: 0,
            medicine: 0,
            perception: 0,
            performance: 0,
            religion: 0,
            survival: 0,
            technology: 0,
            will: 0,
            mastery: '',
            ...knowledge
        };
    }

    getLegacyAbilities(legacy) {
        const abilities = AbilitieslegacyMap[legacy];
        console.log(abilities)
        return Object.values(abilities);
    }

    setParameter(parameterName, value) {
        if (parameterName in this.parameters) {
            this.parameters[parameterName] = value;
        } else {
            throw new Error(`Parameter not found: ${parameterName}`);
        }
    }

    getParametro(parameterName) {
        if (parameterName in this.parameters) {
            return this.parameters[parameterName];
        } else {
            throw new Error(`Parameter not found: ${parameterName}`);
        }
    }

    setKnowledgeSkill(skillName, value) {
        if (skillName in this.knowledge) {
            this.knowledge[skillName] = value;
        } else {
            throw new Error(`Knowledge skill not found: ${skillName}`);
        }
    }

    getKnowledgeSkill(skillName) {
        if (skillName in this.knowledge) {
            return this.knowledge[skillName];
        } else {
            throw new Error(`Knowledge skill not found: ${skillName}`);
        }
    }

    getCombatAbility(abilityName) { //verificar
        if (abilityName in this.combat) {
            return this.combat[abilityName];
        } else {
            throw new Error(`Combat ability not found: ${abilityName}`);
        }
    }
}

export default Character;