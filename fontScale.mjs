/** @module fontScale */

/**
 * Scale an element's font size to fit inside the given width.
 * @param {HTMLElement} element 
 * @param {Int} width defaults to `window.innerWidth`
 * @returns {Promise<Int>} resulting font size in px
 */
export function fontScale(element,width=innerWidth){
    return new Promise(function(resolve){
        let fontSize=0
        element.style.fontSize=fontSize+'px'
        width-=element.clientWidth
        function down(){
            if(element.clientWidth>=width){
                fontSize-=1
                element.style.fontSize=fontSize+'px'
                requestAnimationFrame(down)
            }else{
                resolve(fontSize)
            }
        }
        function up(){
            if(element.clientWidth<width){
                fontSize+=10
                element.style.fontSize=fontSize+'px'
                requestAnimationFrame(up)
            }else{
                requestAnimationFrame(down)
            }
        }
        requestAnimationFrame(up)
    })
}

export default fontScale