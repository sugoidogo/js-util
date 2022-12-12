/** @module AssetLoader */

/**
 * Loads a data url and returns the resulting element, font face, or when the type is unrecognized, a fetch response.
 * @param {String} dataURL
 * @param {String} id
 */
export async function loadAsset(dataURL,id=undefined){
    const type=dataURL.split(';')[0].split(':')[1]
    switch(type){
        case 'text/css':{
            const style=document.createElement('style')
            style.id=id
            style.innerHTML=atob(dataURL.split(',')[1])
            return style
        }
        case 'text/html':{
            const element=document.createElement('span')
            element.outerHTML=atob(dataURL.split(',')[1])
            element.id=id
            return element
        }
        case 'text/javascript':{
            const script=document.createElement('script')
            script.id=id
            script.innerHTML=atob(dataURL.split(',')[1])
            return script
        }
        default:{
            const mtype=type.split('/')[0]
            switch(mtype){
                case 'audio':{
                    const audio=document.createElement('audio')
                    audio.id=id
                    audio.src=dataURL
                    return audio
                }
                case 'font':{
                    return await new FontFace(id,dataURL).load()
                }
                case 'image':{
                    const img=document.createElement('img')
                    img.id=id
                    img.src=dataURL
                    return img
                }
                case 'video':{
                    const video=document.createElement('video')
                    video.id=id
                    video.src=dataURL
                }
                default:{
                    return await fetch(dataURL)
                }
            }
        }
    }
}

export default loadAsset