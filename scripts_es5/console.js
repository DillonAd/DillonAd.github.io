function typeCommand(text) {
    consoleInput.disabled = true;

    print(text);

    consoleInput.disabled = false;
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