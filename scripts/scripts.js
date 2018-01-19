var consoleNode;
var consoleInput;
var viewArray;
var lastCommand;

async function load() {
    setElements();
    clearConsole();
    loadRepos();
    await displayLogin();
    launchHome();
    focusConsole();
}

function setElements() {
    consoleNode = document.getElementById('console');
    consoleInput = document.getElementById('consoleInput');
    viewArray = document.getElementsByClassName("contentModal");
}

async function displayLogin() {
    //The next block should imitate PuTTY and it connecting to Ubuntu
    await typeCommand(">ssh buckbeaksNest");

    printLine("login:")
    await typeCommand("dillon");

    printLine("dillon's password:");
    await typeCommand("******************");

    printLine("Welcome to my website! ((GNU/Linux)-ish v1.0.0)");
    printLine("To get a list of commands type '?' or 'help'");
    printLine("");
}

function launchHome() {
    var launchHomeCmd = "launch --home";
    printLine(launchHomeCmd);
    launchCommand(launchHomeCmd);
}

function focusConsole() {
    consoleInput.focus();
}