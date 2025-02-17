export class AutoClicker {
    constructor(name, amount, basePrice, cookiePS) {
        this.name = name;
        this.amount = amount;
        this.basePrice = basePrice;
        this.currentPrice = basePrice;
        this.cookiePS = cookiePS; 
        this.priceMultiplier = 1.3;
    }

    buy(game) {
        if (game.cookies >= this.currentPrice) {
            game.cookies -= this.currentPrice;
            this.amount++;
            this.currentPrice = Math.floor(this.basePrice * Math.pow(this.priceMultiplier, this.amount)); 
            game.cookiesPS += this.cookiePS; 
            game.updateUI();
        }
    }
}
