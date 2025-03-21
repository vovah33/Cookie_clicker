export class AutoClicker {
    constructor(name, amount, basePrice, energyPS) {
        this.name = name;
        this.amount = amount;
        this.basePrice = basePrice;
        this.currentPrice = basePrice;
        this.energyPS = energyPS;
        this.priceMultiplier = 1.3;
    }

    buy(game) {
        if (game.energy_score >= this.currentPrice) {
            game.energy_score -= this.currentPrice;
            this.amount++;
            this.updatePrice();
            game.energyPS += this.energyPS;
            game.updateUI();
        }
    }

    updatePrice() {
        this.currentPrice = Math.floor(this.basePrice * Math.pow(this.priceMultiplier, this.amount));
    }

    copy() {
        return new AutoClicker(this.name, this.amount, this.basePrice, this.energyPS);
    }
}

// Base list of auto-clickers (only prototypes)
export const autoClickers = [
    new AutoClicker("Redbull", 0, 10, 1),
    new AutoClicker("Bullit", 0, 50, 5),
    new AutoClicker("Slammer", 0, 200, 50),
    new AutoClicker("Monster", 0, 500, 100),
    new AutoClicker("RockStar", 0, 1000, 250),
    new AutoClicker("Qush", 0, 2500, 500),
    new AutoClicker("Vital 4U", 0, 5000, 1000),
    new AutoClicker("Viking", 0, 10000, 2500)
];
