    let apples = 0;
    let applesPerSecond = 0;
    let rebirths = 0;
    let multiplier = 1;

    function saveGame() {
        localStorage.setItem("appleClickerSave", JSON.stringify({
            apples,
            applesPerSecond,
            rebirths,
            multiplier
        }));
    }

    function loadGame() {
        const data = localStorage.getItem("appleClickerSave");
        if (!data) return;
        const save = JSON.parse(data);
        apples = save.apples || 0;
        applesPerSecond = save.applesPerSecond || 0;
        rebirths = save.rebirths || 0;
        multiplier = save.multiplier || 1;
        updateDisplay();
    }

    function clickApple() {
        apples += 1 * multiplier;
        updateDisplay();
        spawnApple();
        saveGame();
    }

    function buyUpgrade(type) {
        const costs = [0, 10, 50, 100, 200];
        const gains = [0, 1, 5, 10, 20];
        if (apples >= costs[type]) {
            apples -= costs[type];
            applesPerSecond += gains[type];
            updateDisplay();
            saveGame();
        }
    }

    function rebirth() {
        if (apples >= 100000) {
            rebirths++;
            multiplier = 1 + rebirths * 0.5;
            apples = 0;
            applesPerSecond = 0;
            updateDisplay();
            saveGame();
        }
    }

    function updateDisplay() {
        document.getElementById("apples").textContent = Math.floor(apples);
        document.getElementById("rebirths").textContent = rebirths;
        document.getElementById("multiplier").textContent = multiplier.toFixed(1);
        document.getElementById("rebirthBtn").style.display =
            apples >= 100000 ? "block" : "none";
    }

    setInterval(() => {
        apples += applesPerSecond * multiplier;
        updateDisplay();
    }, 1000);

    setInterval(saveGame, 5000);

    window.onload = loadGame;