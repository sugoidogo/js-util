/**
 * On import, sets the global css variable `--random` to `Math.random()` before each draw
 * @module CSSRandom
 */
(function CSSRandom() {
    document.documentElement.style.setProperty('--random', Math.random())
    requestAnimationFrame(CSSRandom)
})()