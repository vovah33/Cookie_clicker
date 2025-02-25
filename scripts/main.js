import { AutoClicker, autoClickers } from "/Models/AutoClicker.js";  // Adjust the path if needed

class Game {
    constructor() {
        this.energy_score = 0;
        this.energyPS = 0;
        this.autoClickers = [];

        this.init();
    }

    init() {
        autoClickers.forEach(clickerData => {
            let newClicker = new AutoClicker(
                clickerData.name,
                0,
                clickerData.basePrice,
                clickerData.energyPSPS
            );
            this.autoClickers.push(newClicker);
        });


        setInterval(() => this.generateEnergy(), 1000);


        document.getElementById('energy').onclick = () => this.clickEnergy();


        this.autoClickers.forEach(clicker => {
            let button = document.getElementById(`buy${clicker.name}`);
            if (button) {
                button.onclick = () => {
                    clicker.buy(this);
                    this.updateUI();
                };
            }
        });

        this.updateUI();
    }

    clickEnergy() {
        this.energy_score++;
        this.updateUI();
    }

    generateEnergy() {
        this.energy_score += this.energyPS;
        this.updateUI();
    }

    updateUI() {
        document.getElementById('energyCount').innerText = this.energy_score;
        document.getElementById('energyPS').innerText = this.energyPS.toFixed(1);
        this.autoClickers.forEach(clicker => {
            let button = document.getElementById(`buy${clicker.name}`);
            if (button) {
                button.innerText = `Buy ${clicker.name} (Cost: ${clicker.currentPrice})`;
            }
            this.createFloatEnergy(event);

        });
    }
}
class Effects {
    constructor() {
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener("click", (event) => this.createFloatEnergy(event));
    }

    createFloatEnergy(event) {
        let floatEnergy = document.createElement("span");
        floatEnergy.textContent = "⚡";
        floatEnergy.classList.add("energy-float");
        document.body.appendChild(floatEnergy);

        floatEnergy.style.left = `${event.pageX - 25}px`;
        floatEnergy.style.top = `${event.pageY - 25}px`;

        setTimeout(() => floatEnergy.remove(), 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const effects = new Effects();
});

const game = new Game();
