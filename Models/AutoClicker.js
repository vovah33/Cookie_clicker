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
        if (game.energy >= this.currentPrice) {
            game.energy -= this.currentPrice;
            this.amount++;
            this.updatePrice();
            game.energyPS += this.energyPS;
            game.updateUI();
        }
    }


    updatePrice() {
        this.currentPrice = Math.floor(this.basePrice * Math.pow(this.priceMultiplier, this.amount));
    }
}


export const autoClickers = [
    new AutoClicker("Redbull", 0, 10, 1),
    new AutoClicker("Bullit", 0, 50, 5),
    new AutoClicker("Slammer", 0, 200, 50),
    new AutoClicker("Monster", 0, 500, 100),
    new AutoClicker("Prime", 0, 1000, 250),
    new AutoClicker("Qush", 0, 2500, 500),
    new AutoClicker("Vital 4U", 0, 5000, 1000),
    new AutoClicker("AA Drink", 0, 10000, 2500)
];
