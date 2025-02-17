import { autoClickers } from "../Data/autoClickers.js";
import { AutoClicker } from "../Models/AutoClicker.js";

class Game {
    constructor() {
        this.cookies = 0;
        this.cookiesPS = 0;
        this.autoClickers = [];

        this.init();
    }

    init() {
        autoClickers.forEach(clickerData => {
            let newClicker = new AutoClicker(
                clickerData.name, 
                0, 
                clickerData.basePrice, 
                clickerData.cookiePS
            );
            this.autoClickers.push(newClicker);
        });

        // Start auto-clickers loop
        setInterval(() => this.generateCookies(), 1000);

        // Attach click event to cookie
        document.getElementById('cookie').onclick = () => this.clickCookie();

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

    clickCookie() {
        this.cookies++;
        this.updateUI();
    }

    generateCookies() {
        this.cookies += this.cookiesPS;
        this.updateUI();
    }

    updateUI() {
        document.getElementById('cookieCount').innerText = this.cookies;
        document.getElementById('cookiePS').innerText = this.cookiesPS.toFixed(1); 
        this.autoClickers.forEach(clicker => {
            let button = document.getElementById(`buy${clicker.name}`);
            if (button) {
                button.innerText = `Buy ${clicker.name} (Cost: ${clicker.currentPrice})`;
            }
        });
    }
    
}

const game = new Game();

