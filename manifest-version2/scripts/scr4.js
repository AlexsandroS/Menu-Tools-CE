
// Script para execução de Custom CSS
// Se for uma das urls autorizadas, irá enviar um comando para o background


console.log('Custom CSS')

chrome.storage.local.get('check4', (data) => {
    if(data.check4 == true)
        chrome.runtime.sendMessage({scr4frmcs: true})
})

