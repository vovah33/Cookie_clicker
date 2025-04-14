export class Upgrade {
    constructor(name, basePrice, effect, applyEffect) {
        this.name = name;
        this.basePrice = basePrice;
        this.purchased = false;
        this.effect = effect;
        this.applyEffect = applyEffect;
    }
    
    buy(game) {
        if (!this.purchased && game.energy_score >= this.basePrice) {
            game.energy_score -= this.basePrice;
            this.purchased = true;
            this.applyEffect(game);
            localStorage.setItem(`upgrade_${this.name}`, "true");
            
            game.updateUI();
        }
    }
    
    copy() {
        return new Upgrade(this.name, this.basePrice, this.effect, this.applyEffect);
    }
}

export const upgrades = [
    new Upgrade("Stronger Click", 100, "+1 per click", (game) => {
        game.clickPower += 1;
        localStorage.setItem('clickPower', game.clickPower);
    }),
    
    new Upgrade("Efficient Clickers", 500, "+50% EPS", (game) => {
        game.energyPS *= 1.5;
    }),
    
    new Upgrade("Auto Click Boost", 1000, "+1 EPS", (game) => {
        game.energyPS += 1;
    }),
    
    new Upgrade("Battery Pack", 2000, "+10% EPS", (game) => {
        game.energyPS *= 1.1;
    }),
    
    new Upgrade("Double Tap", 5000, "Double click energy", (game) => {
        game.clickPower *= 2;
        localStorage.setItem('clickPower', game.clickPower);
    }),
];