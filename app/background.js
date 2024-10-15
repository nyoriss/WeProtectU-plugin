chrome.action.onClicked.addListener((tab) => {
    // Cette fonction sera appelée lorsque l'extension est cliquée
    console.log("Onglet courant :", tab);
    alert(`Titre de l'onglet courant : ${tab.title}\nURL : ${tab.url}`);
});