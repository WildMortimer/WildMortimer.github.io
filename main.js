let colorIdx = Math.floor(Math.random() * 2);

function toggleCoolGold() {
    if (colorIdx == 0) {
        document.documentElement.style.setProperty("--cool-gold","#8d53ff")
    }
    else if (colorIdx == 1) {
        document.documentElement.style.setProperty("--cool-gold","#29d6b9")
    }

    colorIdx = 1 - colorIdx
}

toggleCoolGold()