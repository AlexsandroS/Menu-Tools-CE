// Executado em todas as paginas
// Rotaticiona todas as imagens que estiver em tag <img> e salva no elemento para poder seguir um logica de rotação
chrome.runtime.onMessage.addListener(
    function(request) {
        if(request.cImgData)
        {
            cImg(request.cImgData)
        }
});


const AllOri = ['0deg', '90deg', '180deg', '270deg'];

var rotate = {
    fmtTransform: function(elem) {
        let hasTrans = elem.style.transform;
        let i = 99;
            if(hasTrans != null && hasTrans.length > 0)
            {
                let _deg = hasTrans.split('(')[1].replace(')','')
                i = AllOri.indexOf(_deg) ? AllOri.indexOf(_deg) : 0
            }
        return i
    },
    loopLog: function(n,cDir){
        let _i = AllOri.length -1;
        if(n === 99){ // primeira vez
            switch(cDir){
                case "_left":
                    n = 3;
                    break
                case "_right":
                    n = 1;
                    break;
                default:
                    n = 1;
                    break;
            }
        }
        else{
            switch(cDir){
                case "_left":
                    n -= 1;
                    break;
                case "_right":
                    n += 1;
                    break;
                default:
                    n += 1;
                    break;
            }
            if(n > _i)
                n = 0;  
            else if(n < 0)
                n = 3;
        }
        return n
    }
}

function cImg(_orien)
{
    var getImg = document.getElementsByTagName('img')
    if(getImg.length == 0)
        return

    for(let i = 0; i < getImg.length; i++)
    {
        let cElem = getImg[i]
        let cUr = rotate.loopLog(rotate.fmtTransform(cElem),_orien)
        cElem.style.transform = 'rotate('+AllOri[cUr]+')' 
    }
}