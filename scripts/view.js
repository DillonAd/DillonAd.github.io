async function materializeView(viewName) {
    var viewNode = document.getElementById(viewName);
    var i;

    viewNode.style.display = "block";
    for(i = Number(viewNode.style.opacity); i <= 1; i += .01) {
        await setElementOpacity(viewNode, i);
    }
}

async function dematerializeView(node) {
    for(let idx = Number(node.style.opacity); idx >= 0; idx -= .01) {
        await setElementOpacity(node, idx);
    }

    node.style.display = "none";
}

function setElementOpacity(node, opacity) {
    return new Promise(resolve => { 
        setTimeout(
            function() { 
                resolve(node.style.opacity = opacity);
            }
        , 10);
    });
}

function getOpenView() {
    var views = document.getElementsByClassName("contentModal");
    var array = Array.prototype.slice.call(views, 0);
    var elements = array.filter(function (element) { return window.getComputedStyle(element).display === "block"; });

    return elements[0];
}