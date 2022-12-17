/** @module AssetLoader */

/**
 * Loads a data url and returns the resulting element, font face, or when the type is unrecognized, a fetch response.
 * @param {String} dataURL
 * @param {String} id
 * @param {Boolean} unsafe load assets directly into the DOM
 */
export async function loadAsset(dataURL,id=undefined,unsafe=false){
    const type=dataURL.split(';')[0].split(':')[1]
    switch(type){
        case 'text/css':{
            const style=document.createElement('style')
            style.id=id
            style.innerHTML=atob(dataURL.split(',')[1])
            if(unsafe){
                return document.body.appendChild(style)
            }
            return style
        }
        case 'text/html':{
            const element=document.createElement('span')
            element.innerHTML=atob(dataURL.split(',')[1])
            element.id=id
            if(unsafe){
                for(const script of element.querySelectorAll('script')){
                    import('data:text/javascript,'+script.innerHTML)
                }
                return document.body.appendChild(element)
            }
            return element
        }
        case 'text/javascript':{
            const script=document.createElement('script')
            script.id=id
            script.innerHTML=atob(dataURL.split(',')[1])
            if(unsafe){
                import('data:text/javascript,'+script.innerHTML)
            }
            return script
        }
        default:{
            const mtype=type.split('/')[0]
            switch(mtype){
                case 'audio':{
                    const audio=document.createElement('audio')
                    audio.id=id
                    audio.src=dataURL
                    if(unsafe){
                        return document.body.appendChild(audio)
                    }
                    return audio
                }
                case 'font':{
                    if(unsafe){
                        document.fonts.add(await new FontFace(id,dataURL).load())
                    }
                    return new FontFace(id,dataURL)
                }
                case 'image':{
                    const img=document.createElement('img')
                    img.id=id
                    img.src=dataURL
                    if(unsafe){
                        return document.body.appendChild(img)
                    }
                    return img
                }
                case 'video':{
                    const video=document.createElement('video')
                    video.id=id
                    video.src=dataURL
                    if(unsafe){
                        return document.body.appendChild(video)
                    }
                    return video
                }
                default:{
                    if(unsafe){
                        window[id]=await fetch(dataURL)
                    }
                    return await fetch(dataURL)
                }
            }
        }
    }
}

export default loadAsset