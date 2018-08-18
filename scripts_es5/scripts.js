var consoleNode;
var consoleInput;
var viewArray;
var lastCommand;

function load() {
    setElements();
    clearConsole();
    loadRepos();
    displayLogin();
    launchHome();
    focusConsole();
}

function setElements() {
    consoleNode = document.getElementById('console');
    consoleInput = document.getElementById('consoleInput');
    viewArray = document.getElementsByClassName("contentModal");
}

function displayLogin() {
    //The next block should imitate PuTTY and it connecting to Ubuntu
    typeCommand(">ssh drakesNest");

    printLine("login:")
    typeCommand("dillon");

    printLine("dillon's password:");
    typeCommand("******************");

    printLine("Welcome to my website! ((GNU/Linux)-ish v1.0.0)");

    if (msie > 0 || ie11) {
        printLine("");
        printLine("## This site is so much cooler in a modern browser. Edge, Chrome, and Firefox are all good options. ##");
        printLine("");
    }

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