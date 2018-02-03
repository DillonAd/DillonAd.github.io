//Thank you StackOverflow!
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var ie11 = ua.match(/Trident.*rv\:11\./);

var head = document.getElementsByTagName("head")[0];
var files = [ "command.js", "console.js", "repos.js", "scripts.js", "view.js" ];
var path;
var scriptNode;
var startupMessage;

if (msie > 0 || ie11) {
    path = "scripts_es5";
} else {
    path = "scripts";
}

for(var i = 0; i < files.length; i++) {
    scriptNode = document.createElement('script');
    scriptNode.src = "./" + path + "/" + files[i];
    scriptNode.type = 'text/javascript';
    console.log(head);
    head.appendChild(scriptNode);
}