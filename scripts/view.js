async function materializeView(viewName) {
    var viewNode = document.getElementById(viewName);
    var i;

    viewNode.style.display = "block";
    for(i = Number(viewNode.style.opacity); i <= 1; i += .01) {
        await setElementOpacity(viewNode, i);
    }
}

async function dematerializeView(node) {
    var i;

    for(i = Number(node.style.opacity); i >= 0; i -= .01) {
        await setElementOpacity(node, i);
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