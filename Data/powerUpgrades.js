this.clickPowerUpgradeButton.addEventListener("click", () => {
    const clickPowerCost = Math.floor(15 * Math.pow(1.5, this.clickPower - 1));
    if (this.score >= clickPowerCost) {
        this.score -= clickPowerCost;
        this.clickPower++;
        localStorage.setItem("cookieScore", this.score);
        localStorage.setItem("clickPower", this.clickPower);
        this.updateDisplay();
    }
});