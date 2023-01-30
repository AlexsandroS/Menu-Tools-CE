


// Codigo para quando receber mensagem da main page
chrome.runtime.onMessage.addListener((msg) => {
   if(msg.script1 == 'true')
        Exemplo()
})

// Ao carregar a pagina verifica se o botão salvo com ON para executar
window.onload = function () {
   chrome.storage.local.get('check1', (data) => {
       if(data.check1 == true)
       Exemplo();
   })
}



const Exemplo = () => { 
   // code
}