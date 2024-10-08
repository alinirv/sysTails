
import Dice from '../models/dice/Dice.js';

class DiceController {
  async roll(req, res) {
    const dice = new Dice();
    const result = dice.getResult();
    res.json(result);
  }

  async rollModified(req, res) {
    const dice = new Dice();
    const modifiers = parseInt(req.params.modifiers);
    const result = dice.getResultModified(modifiers);
    res.json(result);
  }
}

export default DiceController;

