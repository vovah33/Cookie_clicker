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
            this.save();  
        }
    }

    updatePrice() {
        this.currentPrice = Math.floor(this.basePrice * Math.pow(this.priceMultiplier, this.amount));
    }

    save() {
        
        localStorage.setItem(`clicker_${this.name}_quantity`, this.amount);
        localStorage.setItem(`clicker_${this.name}_price`, this.currentPrice);
    }

    copy() {
        const copy = new AutoClicker(this.name, this.amount, this.basePrice, this.energyPS);
        
        copy.amount = parseInt(localStorage.getItem(`clicker_${copy.name}_quantity`)) || 0;
        copy.currentPrice = parseFloat(localStorage.getItem(`clicker_${copy.name}_price`)) || copy.basePrice;
        return copy;
    }
}


export const autoClickers = [
    new AutoClicker("Redbull", 0, 10, 1),
    new AutoClicker("Bullit", 0, 50, 5),
    new AutoClicker("Slammer", 0, 200, 50),
    new AutoClicker("Monster", 0, 500, 100),
    new AutoClicker("Rockstar", 0, 1000, 250),
    new AutoClicker("Qush", 0, 2500, 500),
    new AutoClicker("Vital4U", 0, 5000, 1000),
    new AutoClicker("Viking", 0, 10000, 2500)
];
