(function CSSRandom(){
    document.body.style.setProperty('--random',Math.random())
    requestAnimationFrame(CSSRandom)
})()