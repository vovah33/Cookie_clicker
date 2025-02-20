export class AutoClicker {
    constructor(name, amount, basePrice, cookiePS) {
        this.name = name;
        this.amount = amount;
        this.basePrice = basePrice;
        this.currentPrice = basePrice;
        this.cookiePS = cookiePS;
        this.priceMultiplier = 1.3;
    }

    // Handle the purchase logic for an AutoClicker
    buy(game) {
        if (game.cookies >= this.currentPrice) {
            game.cookies -= this.currentPrice;  // Subtract cost from cookies
            this.amount++;  // Increase the amount of this AutoClicker
            this.updatePrice();  // Update price based on multiplier
            game.cookiesPS += this.cookiePS;  // Increase CPS based on this AutoClicker
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
    new AutoClicker("Cursor", 0, 10, 0.5),
    new AutoClicker("Grandma", 0, 50, 5),
    new AutoClicker("Farm", 0, 500, 50)
];
