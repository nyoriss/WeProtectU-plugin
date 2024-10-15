const base_url = "http://localhost:5173/"


function openSiteInNewTab() {
    window.open(base_url);
}

document.addEventListener("DOMContentLoaded", () => {
    // Set elements of the plugin
    const div1 = document.querySelector("div.div1");
    const div2 = document.querySelector("div.div2");

    // Set the text of the plugin
    let text = document.createElement("p");
    text.textContent = "Bienvenue dans notre plugin";
    text.setAttribute("id", "paragraph");

    // Set the link of our website
    let link = document.getElementById("linkToWebSite");
    link.textContent = "Visitez notre site";
    link.addEventListener("click", openSiteInNewTab);

    // Report the user from the profile page
    let reportLink = document.getElementById("reportThisPage");
    reportLink.textContent = "Reporter ce site ou cet utilisateur";
    reportLink.href = "./reportPage.html"

    // Ajoute reportLink au DOM si ce n'est pas déjà fait
    document.querySelector("div.div2").appendChild(reportLink);
});