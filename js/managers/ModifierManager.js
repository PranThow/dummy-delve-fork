export default class ModifierManager {
    constructor() {
        this.modifiers = [];
    }

    addModifier(modifier) {
        this.modifiers.push(modifier);
    }

    applyModifiers(target, stat) {
        let value = target[stat];

        for (const modifier of this.modifiers) {
            if (modifier.stat === stat) {
                switch (modifier.operation) {
                    case "add":
                        value += modifier.value;
                        break;
                    case "multiply":
                        value *= modifier.value;
                        break;
                    case "set":
                        value = modifier.value;
                        break;
                }
            }
        }

        return value;
    }

    getModifiersForStat(stat) {
        return this.modifiers.filter(m => m.stat === stat);
    }
}
