import { AutoClicker, autoClickers } from "/Models/AutoClicker.js";

class Game {
    constructor() {
        this.energy_score = parseInt(localStorage.getItem('energyCount')) || 0;
        this.energyPS = parseFloat(localStorage.getItem('energyPS')) || 0;
        this.autoClickers = [];
        this.init();
    }

    init() {
        this.autoClickers = autoClickers.map(clicker => clicker.copy());

        setInterval(() => this.generateEnergy(), 100);

        document.getElementById('energy').onclick = () => this.clickEnergy();

        this.autoClickers.forEach(clicker => {
            let button = document.getElementById(`buy${clicker.name}`);
            if (button) {
                button.onclick = () => {
                    clicker.buy(this);
                    this.updateEnergyPS(); // Update energyPS in localStorage
                    this.updateUI();
                };
            }
        });

        this.updateUI();
    }

    clickEnergy() {
        this.energy_score++;
        this.updateEnergyCount();
        this.updateUI();
    }

    generateEnergy() {
        const increment = this.energyPS / 10;
        this.energy_score += increment;
        this.updateEnergyCount();
        this.updateUI();
    }

    updateEnergyCount() {
        localStorage.setItem('energyCount', this.energy_score.toFixed(1));
    }

    updateEnergyPS() {
        localStorage.setItem('energyPS', this.energyPS.toFixed(1));
    }

    updateUI() {
        document.getElementById('energyCount').innerText = this.energy_score.toFixed(1);
        document.getElementById('energyPS').innerText = this.energyPS.toFixed(1);

        const imageMap = {
            Redbull: "Redbull.png",
            Bullit: "Bullit.png",
            Slammer: "Slammer.png",
            Monster: "Monster.png",
            Rockstar: "Rockstar.png",
            Qush: "Qush.png",
            Vital4U: "Vital4U.png",
            Viking: "Viking.png"
        };

        this.autoClickers.forEach(clicker => {
            let button = document.getElementById(`buy${clicker.name}`);
            if (button) {
                const imageFilename = imageMap[clicker.name] || "default.png";
                button.innerHTML = `
                    <img src="assets/images/${imageFilename}" alt="${clicker.name}" class="clicker-image">
                    <span class="clicker-name">${clicker.name}</span>
                    <span class="clicker-cost">⚡ ${clicker.currentPrice}</span>
                `;
            }
        });
    }
}

class Effects {
    constructor() {
        this.addEventListeners();
    }

    addEventListeners() {
        const energyButton = document.getElementById('energy');
        if (energyButton) {
            energyButton.addEventListener("click", (event) => this.createFloatEnergy(event));
        }
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
    new Effects();
});

const gameApp = new Game();

document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (localStorage.getItem('mode') === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else {
        body.classList.add('gradient-mode');
        localStorage.setItem('mode', 'gradient');
        darkModeToggle.checked = false;
    }

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.remove('gradient-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('mode', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('gradient-mode');
            localStorage.setItem('mode', 'gradient');
        }
    });
});