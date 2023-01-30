
// Codigo para quando receber mensagem da main page
chrome.runtime.onMessage.addListener((req) => {
    if(req.script3 == true)
        RemoveBanner()
})

// Ao carregar a pagina verifica se ON está ativo para executar
window.onload = () => {
    chrome.storage.local.get('Opcoes', (data) => {
        if(data.Opcoes.check[2] == true)
            RemoveBanner()
    })
}



const RemoveBanner = () => {
const Target = document.getElementsByClassName('header-logo')[1];
if(Target != undefined)
    Target.children[1].remove();
}
