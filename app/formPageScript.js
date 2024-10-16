function getCurrentTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const tab = tabs[0];
                // Log pour vérifier si l'onglet contient bien les bonnes propriétés
                console.log("Onglet récupéré :", tab);

                if (tab.title && tab.url) {
                    // Mise à jour du texte de l'élément HTML
                    document.getElementById("url").value = tab.url;
                    resolve(tab); // Résolution de la promesse avec l'objet tab
                } else {
                    document.getElementById("url").value = "Impossible de récupérer les informations de l'onglet.";
                    reject("Propriétés 'title' ou 'url' manquantes.");
                }
            } else {
                document.getElementById("url").value = "Aucun onglet actif trouvé.";
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

document.addEventListener("DOMContentLoaded", () => {
    console.log("ok c'est bon1")
    setReportText()
    console.log("ok c'est bon2")
});
