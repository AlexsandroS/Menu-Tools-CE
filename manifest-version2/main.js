
const toRig = document.getElementById('toRight');
const toLef = document.getElementById('toLeft');

toRig.addEventListener('click', () => {
        send_x_Img('_right')
    });

toLef.addEventListener('click', () => {
        send_x_Img('_left')
    });

function send_x_Img(_dir)
{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {cImgData: _dir})  
    })
}

const items = document.getElementsByClassName('list')
const descri = document.getElementsByClassName('list-descr')
const _checks = document.getElementsByClassName('mcheck')
const _fColors = document.getElementsByClassName('colorbox')


var Opcoes = {check:[], // Objeto das opções de a serem salvas/lidas
    fColor: []
}

function LoadAllVars()
{
    chrome.storage.local.get('Opcoes', (data) =>{
    Object.assign(Opcoes, data.Opcoes); 
    for(let i = 0; i < _checks.length; i++)
        _checks[i].checked = data.Opcoes.check[i] ? Boolean(data.Opcoes.check[i]) : false

    _fColors[0].value = data.Opcoes.fColor[0] ? data.Opcoes.fColor[0] : '#ef5d18';
    _fColors[1].value = data.Opcoes.fColor[1] ? data.Opcoes.fColor[1] : '#943b10';
})}


function SaveAllVars(){
    chrome.storage.local.set({Opcoes});
}

for(let i = 0; i < descri.length; i++) // Criar listener de cada descrição para funcionalidade de exibição 
{
items[i].addEventListener('click', (e) => {
     if(e.srcElement.nodeName == 'INPUT')
     return;

    descri[i].toggleAttribute('hidden');
    let state = descri[i].hidden
    descri[i].classList.toggle('_active-descri', !state)
    document.getElementsByClassName('list')[i].classList.toggle('_active-item', !state)
     
 });
}


// Area de interação da main com os scripts

for(let i = 0; i < _checks.length; i++) // Trigger dos botões
{
    _checks[i].addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        
    switch(i){
        case 0:
            chrome.tabs.sendMessage(tabs[0].id, {script1: _checks[0].checked}); // Exemplo 1
            break;
        case 1:
            chrome.tabs.sendMessage(tabs[0].id, {script2: _checks[1].checked}); // Exemplo 2
            break;
        case 2:
            chrome.tabs.sendMessage(tabs[0].id, {script3: _checks[2].checked}); // Script do Redescanais
            break;
        case 3:
            chrome.runtime.sendMessage({scr4frmpg: _checks[3].checked, TabId: tabs[0].id, TabUrl: tabs[0].url}); // Custom css
            break;
    }
    Opcoes.check[i] = _checks[i].checked
    SaveAllVars()
    })
})}


const SendUpdateColor = () => {chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {ColorControl: 'update', updateVars: Opcoes})  
})}

for(let i = 0; i < _fColors.length; i++) // Trigger cores fixas
{
_fColors[i].addEventListener('change', () =>
{
    Opcoes.fColor[0] = _fColors[0].value
    Opcoes.fColor[1] = _fColors[1].value 

    SendUpdateColor()
    SaveAllVars()
})}


LoadAllVars()
// ------------//------------- //