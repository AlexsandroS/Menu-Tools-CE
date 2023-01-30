
// Script de background utilizado para poder executar funções que content script não podem por segurança


var urlCompa = ['tecmundo.com','ead.datacom.com.br'] // Endereços que deseja aplicar seu css
//A ordem do index defino no ApplyCSS -> Switch case o arquivo a ser executado

const deBugMode = false;

var customCSS = {
    ApplyCSS: function(tabId, type)
    {
        switch(type)
        {
            case 0:
                chrome.tabs.insertCSS(tabId,{file: "./css/cTecmundo.css"})
                break;
            case 1:
                chrome.tabs.insertCSS(tabId,{file: "./css/cDatacom.css"})
                break;
            case 99:
                if(deBugMode)console.log('[ERRO] Url compativel não identificada')
                break;
            default:
                if(deBugMode) console.log('[FATAL ERROR]')
                break;
        }
    },

    getTypeId: function(url)
    {
        for(let i = 0; i < urlCompa.length; i++)
        {
            if(url.toString().includes(urlCompa[i]))
                return i
        }
        return 99
    }
}

chrome.runtime.onMessage.addListener((msg, source) => {
     
        if(msg.scr4frmcs == true) // requisição do script quando executado na pagina(ao entrar ou em reload)
            customCSS.ApplyCSS(source.tab.id, customCSS.getTypeId(source.tab.url))

        if(msg.scr4frmpg == true) // requisão a partir da main com enable/disable da opção
            customCSS.ApplyCSS(msg.TabId, customCSS.getTypeId(msg.TabUrl))
})


