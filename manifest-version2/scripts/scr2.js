
// Codigo para quando receber mensagem da main page
chrome.runtime.onMessage.addListener((msg) => {
   if(msg.script2 == 'true')
        Exemplo()
})

// Ao carregar a pagina verifica se o botão salvo com ON para executar
window.onload = () => {
   chrome.storage.local.get('check2', (data) => {
       if(data.check2 == true)
       Exemplo();
   })
}



function Exemplo(){ 
   // code
}