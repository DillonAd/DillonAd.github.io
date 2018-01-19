async function typeCommand(text, delay=50) {
    consoleInput.disabled = true;
    
    for(i = 0; i < text.length + 1; i++) {
        await typeCharacter(text.charAt(i), delay);
    }

    consoleInput.disabled = false;
}

function typeCharacter(character, delay=50) {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(print(character));
        }, delay);
    });
}

function consoleNewLine() {
    consoleNode.textContent += "\r\n>";
}

function print(text) {
    consoleNode.textContent += text;
}

function printLine(text) {
    consoleNewLine();
    print(text);
    lineFeed();
}

function lineFeed() {
    //keep the latest output on the bottom of the screen
    consoleNode.scrollTop = consoleNode.scrollHeight;
}

function clearConsole() {
    consoleNode.innerText = "";
}