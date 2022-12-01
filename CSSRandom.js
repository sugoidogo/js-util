const style=document.body.style
function CSSRandom(){
    style.setProperty('--random',Math.random())
    const timeout=style.getPropertyValue('--random-timeout')
    if(timeout){
        setTimeout(CSSRandom,parseInt(timeout))
    }else{
        requestAnimationFrame(CSSRandom)
    }
}