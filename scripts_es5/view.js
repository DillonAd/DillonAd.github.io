function materializeView(viewName) {
    var viewNode = document.getElementById(viewName);
    var i;

    viewNode.style.display = "block";
    for(i = Number(viewNode.style.opacity); i <= 1; i += .01) {
        setElementOpacity(viewNode, i);
    }
}

function dematerializeView(node) {
    var i;

    for(i = Number(node.style.opacity); i >= 0; i -= .01) {
        setElementOpacity(node, i);
    }

    node.style.display = "none";
}

function setElementOpacity(node, opacity) {
    setTimeout(
        function() { 
            node.style.opacity = opacity;
        }
    , 10 * opacity);
}