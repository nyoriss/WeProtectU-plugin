const base_url = "http://localhost:5173/"


function sendToFormInNewTab() {
    window.open(base_url+ "form");
    //trouver un moyen pour renseigner l'url et le titre
}

document.addEventListener("DOMContentLoaded", () => {
    const divReportedPage = document.querySelector("div.divReportPage");
    const divReportedPageChoice = document.querySelector("div.divReportPageChoice");

    let titleReportedPage = document.getElementById("popupTitle");
    titleReportedPage.textContent = "Voulez vous reporter cette page ? : ";

    //Mettre le contenu du titre et du lien de la page
    setReportText()

    let confirmLink = document.getElementById("confirmReportPage");
    confirmLink.textContent = "Confirmer";
    confirmLink.addEventListener("click", sendToFormInNewTab);
    confirmLink.href = "./index.html"

    let reportLink = document.getElementById("cancelReportPage");
    reportLink.textContent = "Annuler";
    reportLink.href = "./index.html"

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
                    document.getElementById('ReportedPageTitre').textContent = "Nom de la page : \n" + tab.title;
                    document.getElementById('ReportedPageURL').textContent = "Lien de la page : \n" + tab.url;
                    resolve(tab); // Résolution de la promesse avec l'objet tab
                } else {
                    document.getElementById('reportPageText').textContent = "Impossible de récupérer les informations de l'onglet.";
                    reject("Propriétés 'title' ou 'url' manquantes.");
                }
            } else {
                document.getElementById('reportPageText').textContent = "Aucun onglet actif trouvé.";
                reject("Aucun onglet actif trouvé.");
            }
        });
    });
}

async function setReportText() {
    try {
        const tab = await getCurrentTab();
        if (tab) {
            // Affichage des informations de l'onglet courant dans la console
            console.log("Informations de l'onglet courant :", tab);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'onglet :", error);
    }
}
/*fetch("https://jsonplaceholder.typicode.com/todos", {
  method: "POST",
  body: JSON.stringify({
    userId: 1,
    title: "Fix my bugs",
    completed: false
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});
*/