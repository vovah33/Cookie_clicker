import { AutoClicker, autoClickers } from "/Models/AutoClicker.js";
import { Upgrade, upgrades } from "/Models/upgrade.js";

class Game {
    constructor() {
        this.energy_score = parseFloat(localStorage.getItem('energyCount')) || 0;
        this.energyPS = parseFloat(localStorage.getItem('energyPS')) || 0;
        this.clickPower = parseFloat(localStorage.getItem('clickPower')) || 1;
        this.autoClickers = parseFloat(localStorage.getItem('autoClickers')) || 0;
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
                    this.updateEnergyPS();
                    this.updateUI();
                };
            }
        });

        this.upgrades = upgrades.map(upgrade => {
            const copy = upgrade.copy();
            const isPurchased = localStorage.getItem(`upgrade_${copy.name}`) === "true";
            if (isPurchased) {
                copy.purchased = true;
                copy.applyEffect(this);
            }
            return copy;
        });

        this.upgrades.forEach((upgrade, index) => {
            const button = document.getElementById(`upgrade${index}`);
            if (button) {
                if (upgrade.purchased) {
                    button.disabled = true;
                    button.innerText = `${upgrade.name} (Purchased)`;
                } else {
                    button.onclick = () => {
                        upgrade.buy(this);
                        button.disabled = true;
                        button.innerText = `${upgrade.name} (Purchased)`;
                    };
                }
            }
        });

        this.updateUI();
    }
    
    reset() {

        this.energy_score = 0;
        this.energyPS = 0;
        this.clickPower = 1;
        

        localStorage.setItem('clickPower', this.clickPower);


        this.autoClickers.forEach(clicker => {
            clicker.amount = 0;
            clicker.currentPrice = clicker.basePrice;
            clicker.save();
        });
    

        this.upgrades.forEach((upgrade, index) => {
            upgrade.purchased = false;
            const button = document.getElementById(`upgrade${index}`);
            if (button) {
                button.disabled = false;
                button.innerText = `${upgrade.name} (⚡ ${upgrade.basePrice})`;
            }
            localStorage.removeItem(`upgrade_${upgrade.name}`);
        });
    

        localStorage.setItem('energyCount', this.energy_score.toFixed(1));
        localStorage.setItem('energyPS', this.energyPS.toFixed(1));
        

        this.updateUI();
    }

    clickEnergy() {
        this.energy_score += this.clickPower;
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

        const upgradeImageMap = {
            "Stronger Click": "stronger-clicker.png",
            "Efficient Clickers": "efficient-clickers.png",
            "Auto Click Boost": "auto click boost.png",
            "Battery Pack": "battery-pack.png",
            "Double Tap": "double-tap.png"
        };

        this.upgrades.forEach((upgrade, index) => {
            const button = document.getElementById(`upgrade${index}`);
            if (button) {
                const imageFilename = upgradeImageMap[upgrade.name] || "default-upgrade.png";
                button.innerHTML = `
                    <img src="assets/images/${imageFilename}" alt="${upgrade.name}" class="upgrade-image">
                    <span class="upgrade-name">${upgrade.name}</span>
                    <span class="upgrade-cost">⚡ ${upgrade.basePrice}</span>
                `;
                button.disabled = upgrade.purchased;
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
    const game = new Game();

    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            game.reset();
        });
    }

    new Effects();
});

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