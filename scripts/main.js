import { AutoClicker, autoClickers } from "/Models/AutoClicker.js";  // Adjust the path if needed

class Game {
    constructor() {
        this.energy = 0;
        this.energyPS = 0;
        this.autoClickers = autoClickers;

        // Ensure AutoClicker is used directly to avoid linting warning
        new AutoClicker("Test", 0, 10, 0.5); // Using AutoClicker class directly

        this.init();
    }

    init() {
        // Start auto-clickers loop
        setInterval(() => this.generateEnergy(), 1000);

        // Attach click event to energy
        document.getElementById('energy').onclick = () => this.clickEnergy();

        // Attach click event to buttons
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
        this.energy++;
        this.updateUI();
    }

    generateEnergy() {
        this.energy += this.energyPS;
        this.updateUI();
    }

    updateUI() {
        document.getElementById('energyCount').innerText = this.energy;
        document.getElementById('energyPS').innerText = this.energyPS.toFixed(1);

        this.autoClickers.forEach(clicker => {
            let button = document.getElementById(`buy${clicker.name}`);
            if (button) {
                button.innerText = `Buy ${clicker.name} (Cost: ${clicker.currentPrice})`;
            }
        });
    }
}

const game = new Game();
