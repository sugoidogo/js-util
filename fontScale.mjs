/** @module fontScale */

/**
 * Scale an element's font size so that it doesn't overflow the viewport.
 * Note that some css may be required for this to work,
 * for example setting `display: flex;` on the parent element,
 * and this function relies on the element being visible.
 * If you want to keep your element invisible until font scaling finishes,
 * use `opacity: 0;`
 * @param {HTMLElement} element the element to be scaled
 * @param {Number} maxHeight maximum font size (which is equivalent to pixel hight)
 * @returns {Number} the resulting font size
 */
export function fontScale(element,maxHeight=innerHeight){
    return new Promise(function(resolve){
        function scaleup(){
            let size=parseInt(getComputedStyle(element).fontSize)
            let bounds=element.getBoundingClientRect()
            if(bounds.right<innerWidth && size<maxHeight){
                element.style.fontSize=size+1+'px'
                setTimeout(scaleup)
            }else{
                setTimeout(scaledown)
            }
            
        }
        function scaledown(){
            let size=parseInt(getComputedStyle(element).fontSize)
            let bounds=element.getBoundingClientRect()
            if(bounds.right>innerWidth || size>maxHeight){
                element.style.fontSize=size-1+'px'
                setTimeout(scaledown)
            }else{
                resolve(size)
            }
        }
        setTimeout(scaleup)
    })
}

export default fontScale