async function loadRepos() {
    var repoURL = 'https://api.github.com/users/dillonad/repos';

    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() { parseRepos(xhttp.response); };
    xhttp.onerror = reportError;
    xhttp.open("GET", repoURL, true);
    xhttp.send();
}

async function loadReadMe(repo) {
    var url = "https://raw.githubusercontent.com/DillonAd/" + repo.name + "/master/README.md"
    console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() { parseReadMe(repo, xhttp.response); };
    xhttp.onerror = reportError;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function parseRepos(response) {
    var response = JSON.parse(response);
    var repo;
    var repos = new Array();

    for(var i = 0; i < response.length; i++) {
        if(!(response[i].fork == true))
        {
            repo = new Object();
            repo.name = response[i].name;
            repo.html_url = response[i].html_url;
            repos.push(repo);
        }
    }

    displayReposReult(repos);
}

function parseReadMe(repo, response) {
    displayReadMe(repo, response);
}

function reportError(err) {
    console.error(err);
}

function displayReposReult(repos) {
    var repoContentNode = document.getElementById("reposContent");

    var repoNode;
    var nameNode;
    var linkNode;

    for(var i = 0; i < repos.length; i++) {
        repoNode = document.createElement("div");
        repoNode.id = repos[i].name;
        repoNode.className = "repoItem";

        nameNode = document.createElement("h3");
        nameNode.textContent = repos[i].name;

        linkNode = document.createElement("a");
        linkNode.href = repos[i].html_url;
        linkNode.appendChild(nameNode);

        repoNode.appendChild(linkNode);
        repoContentNode.appendChild(repoNode);

        loadReadMe(repos[i]);
    }
}

function displayReadMe(repo, content) {
    var repoNode = document.getElementById(repo.name);

    var descriptionNode = document.createElement("p");
    descriptionNode.innerHTML = micromarkdown.parse(content);

    repoNode.appendChild(descriptionNode);
}