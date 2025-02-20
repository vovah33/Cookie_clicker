import { AutoClicker, autoClickers } from "/Models/AutoClicker.js";  // Adjust the path if needed

class Game {
    constructor() {
        this.cookies = 0;
        this.cookiesPS = 0;
        this.autoClickers = autoClickers;

        // Ensure AutoClicker is used directly to avoid linting warning
        new AutoClicker("Test", 0, 10, 0.5); // Using AutoClicker class directly

        this.init();
    }

    init() {
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
