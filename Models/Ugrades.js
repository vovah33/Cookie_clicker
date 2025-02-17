class Upgrade {
    constructor(name, price, effect) {
        this.name = name;
        this.price = price;
        this.effect = effect;
    }

    buy() {
        if (game.cookies >= this.price) {
            game.cookies -= this.price;
            this.effect();
            game.updateUI();
        }
    }
}