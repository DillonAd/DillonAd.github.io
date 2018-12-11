const converter = new showdown.Converter();
const title = "Automate The Planet!";

async function query(url, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => callback(xhttp.response);
    xhttp.onerror = (err) => console.error(err);
    xhttp.open("GET", url, true);
    await xhttp.send();
}

async function loadContent(name, url) {
    await query(url, (content) => {
        const newTitle = title + " - " + name;
        document.title = newTitle;

        const markdown = converter.makeHtml(content);
        document.getElementById("content").innerHTML = markdown;
    });
}

async function start() {
    document.getElementById("header").innerText = title;

    await getPostList();
    await loadContent("Home", "https://raw.githubusercontent.com/DillonAd/DillonAd.github.io/master/Home.md");
}

async function getPostList() {
    const url = "https://api.github.com/repos/DillonAd/DillonAd.github.io/contents/posts";
    await query(url, populatePostList)
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