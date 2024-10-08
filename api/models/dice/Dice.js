class Dice {
    constructor() { }

    // Método que rola o dado e retorna o resultado com ou sem modificadores
    roll(modifiers = 0) {
        const diceValue = Math.floor(Math.random() * 12) + 1;
        return {
            diceValue,
            result: diceValue,
            resultModified: diceValue + modifiers
        };
    }

    // Método que retorna o resultado simples
    getResult() {
        return this.roll(0);
    }

    // Método que retorna o resultado com modificadores
    getResultModified(modifiers) {
        return this.roll(modifiers);
    }
}

export default Dice;