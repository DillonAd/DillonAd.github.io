function consoleCommand(event, newLine = true) {
    lastCommand = consoleInput.value;

    if(event.keyCode === 13){
        consoleInput.disabled = true;

        if(newLine) {
            printLine(lastCommand);
        } else {
            print(lastCommand);
        }
        
        //clear command input
        consoleInput.value = "";

        var result = parseCommand(lastCommand);

        if(result) {
            printLine(result);
        }
        consoleInput.disabled = false;                                                                  
    }

    consoleInput.focus();
}

function parseCommand(command) {
    var result;
    var helpMsg = "You must need the help menu. Type 'help' or '?' for instructions.";
    var cmd = command.toLowerCase().split(" ")[0];

    switch(cmd) {
        case "?":
        case "help": result = getHelpMenu(); closeCommand(); break;
        case "ls":
        case "dir": result = "No file system available"; break;
        case "ifconfig":
        case "ipconfig": result = "Use your own ip address"; break;
        case "del":
        case "rm":
        case "rmdir": result = "You aren't deleting anything!"; break;
        case "cls":
        case "clear": clearConsole(); result = ""; break;
        case "exit": exitCommand(); break;
        case "launch": launchCommand(command); break;
        case "close": closeCommand(); break;
        default: dematerializeView(getOpenView()); result = helpMsg;
    }

    return (result);
}

function getHelpMenu() {
    return "---HELP MENU--- \n \
    I intended to support the most common Unix/Windows commands by default \n \
    but that is a task that is far beyond the effort that should be exerted \n \
    for such a simple website. There is only a few valid commands: \n \
    \t launch - launches an information panel \n \
        \t\t valid options: \n \
            \t\t\t --home    - displays home information \n \
            \t\t\t --repos    - displays all of my github repos \n \
            \t\t\t --contact - displays all of the ways that you can contact me \n \
    \t close - closes the current panel \n \
    \t exit - exits the current tab/window"
}

async function launchCommand(command) {
    var viewName = command.substr(command.indexOf("--") + 2);
    var isAvailableView = false;
    var viewItem;
    var i;

    for(i = 0; i < viewArray.length; i++) {
        viewItem = viewArray[i];
        await dematerializeView(viewItem);
        
        if(viewItem.id === viewName) {
            isAvailableView = true;
        }
    }

    if(isAvailableView === true) {
        await materializeView(viewName);
    } else {
        printLine(getHelpMenu());
    }
}

function closeCommand() {
    for(i = 0; i < viewArray.length; i++) {
        dematerializeView(viewArray[i]);
    }
}

function exitCommand() {
    var result = confirm("Are you sure you want to exit the tab/window?")

    if(result) {
        window.close();
    }
}