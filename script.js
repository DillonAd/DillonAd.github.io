async function query(url, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => callback(xhttp.response);
    xhttp.onerror = (err) => console.error(err);
    xhttp.open("GET", url, true);
    await xhttp.send();
}

async function loadContent(url) {
    query(url, (markdown) => document.getElementById("content").innerHTML = markdown);
}

async function start() {
    await getPostList();
    await loadContent("https://raw.githubusercontent.com/DillonAd/DillonAd.github.io/master/Home.md");
}

async function getPostList() {
    const url = "https://api.github.com/repos/DillonAd/DillonAd.github.io/contents/posts";
    await query(url, populatePostList)
}

async function populatePostList(response) {
    const list = JSON.parse(response);
    const postList = document.getElementById("post-list");

    list.forEach(element => {
        const link = document.createElement("a");
        link.href = "#";
        link.innerText = element.name.replace(".md", "");
        link.onclick = () => loadContent(element.download_url);

        const post = document.createElement("li");
        post.appendChild(link);
        postList.appendChild(post);

        console.log(element);
    });
}