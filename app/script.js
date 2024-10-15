function openInNewTab() {
    console.log("ok ici");
    window.open("http://localhost:5173/");
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
    //link.addEventListener("click", openInNewTab);
    link.setAttribute("class", "link");
    link.setAttribute("href", "http://localhost:5173/");

    // Report the user from the profile page
    let reportLink = document.getElementById("reportUserFromAccountPage");
    reportLink.textContent = "Reporter cet utilisateur";
    reportLink.addEventListener("click", reportUserFromAccountPage);
    reportLink.setAttribute("class", "link");

    // Ajoute reportLink au DOM si ce n'est pas déjà fait
    document.querySelector("div.div2").appendChild(reportLink);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tab = tabs[0];
            document.getElementById('reportUserText').textContent = `Titre : ${tab.title}\nURL : ${tab.url}`;
            resolve(tab);
        } else {
            document.getElementById('reportUserText').textContent = "Aucun onglet actif trouvé.";
            reject("Aucun onglet actif trouvé.");
        }
    });
});

function getCurrentTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const tab = tabs[0];

                // Log pour vérifier si l'onglet contient bien les bonnes propriétés
                console.log("Onglet récupéré :", tab);

                if (tab.title && tab.url) {
                    // Mise à jour du texte de l'élément HTML
                    document.getElementById('reportUserText').textContent = `Titre : ${tab.title}\nURL : ${tab.url}`;
                    resolve(tab); // Résolution de la promesse avec l'objet tab
                } else {
                    document.getElementById('reportUserText').textContent = "Impossible de récupérer les informations de l'onglet.";
                    reject("Propriétés 'title' ou 'url' manquantes.");
                }
            } else {
                document.getElementById('reportUserText').textContent = "Aucun onglet actif trouvé.";
                reject("Aucun onglet actif trouvé.");
            }
        });
    });
}

async function reportUserFromAccountPage() {
    try {
        const tab = await getCurrentTab();
        if (tab) {
            // Affichage des informations de l'onglet courant dans la console
            console.log("Informations de l'onglet courant :", tab);
            console.log("Titre de l'onglet :", tab.title || "Titre non disponible");
            console.log("URL de l'onglet :", tab.url || "URL non disponible");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'onglet :", error);
    }
}
