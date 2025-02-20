export class AutoClicker {
    constructor(name, amount, basePrice, energyPS) {
        this.name = name;
        this.amount = amount;
        this.basePrice = basePrice;
        this.currentPrice = basePrice;
        this.energyPS = energyPS;
        this.priceMultiplier = 1.3;
    }

    // Handle the purchase logic for an AutoClicker
    buy(game) {
        if (game.energy >= this.currentPrice) {
            game.energy -= this.currentPrice;  // Subtract cost from energy
            this.amount++;  // Increase the amount of this AutoClicker
            this.updatePrice();  // Update price based on multiplier
            game.energyPS += this.energyPS;  // Increase CPS based on this AutoClicker
            game.updateUI();  // Update the game UI
        }
    }

    // Update the price of the AutoClicker
    updatePrice() {
        this.currentPrice = Math.floor(this.basePrice * Math.pow(this.priceMultiplier, this.amount));
    }
}

// Create instances of AutoClicker directly in the array
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
