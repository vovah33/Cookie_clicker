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
    new AutoClicker("Redbull", 0, 10, 0.5),
    new AutoClicker("Bullit", 0, 50, 5),
    new AutoClicker("Slammer", 0, 500, 50),
    new AutoClicker("Cursor", 0, 1000, 100),
    new AutoClicker("Grandma", 0, 2500, 250),
    new AutoClicker("Farm", 0, 500, 50),
    new AutoClicker("Grandma", 0, 50, 5),
    new AutoClicker("Farm", 0, 500, 50)
];
