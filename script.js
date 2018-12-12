const title = "Automate The Planet!";

async function http(method, url, callback, requestBody) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => callback(xhttp.response);
    xhttp.onerror = (err) => console.error(err);
    xhttp.open(method, url, true);
    await xhttp.send(JSON.stringify(requestBody));
}

async function query(url, callback, requestBody) {
    await http("GET", url, callback, requestBody);
}

async function push(url, callback, requestBody) {
    await http("POST", url, callback, requestBody);
}

async function loadContent(name, url) {
    await query(url, async (content) => {
        document.title = title + " - " + name;
        await push("https://api.github.com/markdown", 
            (response) => document.getElementById("content").innerHTML = response,
            { text: content, mode: "markdown", context: "" });
    });
}

async function start() {
    document.getElementById("header").innerText = title;

    await getPostList();
    await loadContent("Home", url + "https://raw.githubusercontent.com/DillonAd/DillonAd.github.io/master/Home.md");
}

async function getPostList() {
    await query(url + "https://api.github.com/repos/DillonAd/DillonAd.github.io/contents/posts", populatePostList)
}

async function populatePostList(response) {
    const list = JSON.parse(response);
    const postList = document.getElementById("post-list");

    list.forEach(element => {
        const linkName = element.name.replace(".md", "");
        const link = document.createElement("a");
        link.href = "#" + linkName;
        link.innerText = linkName;
        link.onclick = () => loadContent(linkName, element.download_url);

        const post = document.createElement("li");
        post.appendChild(link);
        postList.appendChild(post);

        console.log(element);
    });
}