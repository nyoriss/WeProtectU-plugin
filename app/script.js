function openInNewTab() {
    open("http://localhost:5173/")
}

document.addEventListener("DOMContentLoaded", () => {
    //set elements of the plugin
    const div1 = document.querySelector("div.div1")


    //set the text of the plugin
    let text = document.createElement("p");
    text.textContent=("Bienvenue dans notre plugin")
    text.setAttribute("id", "paragraph");
    text.setAttribute("width", "140")
    text.setAttribute("height", "30")

    div1.appendChild(text)

    //Set the link of our website
    let link = document.createElement("a");
    link.textContent=("Visitez notre site")
    link.href=""
    link.addEventListener("click", openInNewTab);
    link.setAttribute("id", "linkToWebSite");
    link.setAttribute("width", "140")
    link.setAttribute("height", "30")

    div1.appendChild(link)
})