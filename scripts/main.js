import { AutoClicker, autoClickers } from "/Models/AutoClicker.js";  // Adjust the path if needed

class Game {
    constructor() {
<<<<<<< HEAD
        this.energy = 0;
        this.energyPS = 0;
        this.autoClickers = autoClickers;

        // Ensure AutoClicker is used directly to avoid linting warning
        new AutoClicker("Test", 0, 10, 0.5); // Using AutoClicker class directly
=======
        this.energy_score = 0;
        this.energyPS = 0;
        this.autoClickers = [];
>>>>>>> origin/main

        this.init();
    }

    init() {
<<<<<<< HEAD
        // Start auto-clickers loop
        setInterval(() => this.generateEnergy(), 1000);

        // Attach click event to energy
        document.getElementById('energy').onclick = () => this.clickEnergy();
=======
        autoClickers.forEach(clickerData => {
            let newClicker = new AutoClicker(
                clickerData.name,
                0,
                clickerData.basePrice,
                clickerData.cookiePS
            );
            this.autoClickers.push(newClicker);
        });


        setInterval(() => this.generateCookies(), 1000);

>>>>>>> origin/main

        document.getElementById('energy').onclick = () => this.clickCookie();


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

<<<<<<< HEAD
    clickEnergy() {
        this.energy++;
        this.updateUI();
    }

    generateEnergy() {
        this.energy += this.energyPS;
=======
    clickCookie() {
        this.energy_score++;
        this.updateUI();
    }

    generateCookies() {
        this.energy_score += this.energyPS;
>>>>>>> origin/main
        this.updateUI();
    }

    updateUI() {
<<<<<<< HEAD
        document.getElementById('energyCount').innerText = this.energy;
        document.getElementById('energyPS').innerText = this.energyPS.toFixed(1);

=======
        document.getElementById('energyCount').innerText = this.energy_score;
        document.getElementById('energyPS').innerText = this.energyPS.toFixed(1);
>>>>>>> origin/main
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
        floatEnergy.textContent = "🍪";
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
