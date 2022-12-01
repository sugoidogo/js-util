/** @module FormDataDeep */

/**
 * Usage: `Array<HTMLElement>.filter(removeChildren)`
 * 
 * Removes elements from the array which are children of other elements in the array.
 */
export function removeChildren(element,index,array){
    for(const sibling of array){
        if(!sibling.isSameNode(element) && sibling.contains(element)){
            return false
        }
    }
    return true
}
/**
 * Appends a new value onto an existing key inside an object, or adds the key if it does not already exist.
 * @param {Object} object 
 * @param {String} name 
 * @param {*} value 
 */
export function append(object,name,value){
    if(name in object){
        if(object[name] instanceof Array){
            object[name].push(value)
        }else{
            object[name]=[formDataDeep[name],value]
        }
    }else{
        object[name]=value
    }
}
/**
 * Get `form` data as an object, including nested forms.
 * @param {HTMLFormElement} form
 * @param {Boolean} primitives whether to convert string values to primitives. Defaults `false`.
 */
export function getFormDataDeep(form,primitives=false){
    const formDataDeep={}
    const formData=new FormData(form)
    for(const name of formData.keys()){
        const value=formData.getAll(name)
        if(value.length==0){
            continue
        }
        if(primitives){
            for(let i=0;i<value.length;i++){
                if(!isNaN(+value[i])){
                    value[i]=+value[i]
                }
                if(value[i]=='on'){
                    value[i]=true
                }
            }
        }
        if(value.length==1){
            formDataDeep[name]=value[0]
        }else{
            formDataDeep[name]=value
        }
    }
    for(const child of [...form.querySelectorAll('form')].filter(removeChildren)){
        const value=getFormDataDeep(child,primitives)
        if(Object.keys(value)==0){
            continue
        }
        const name=child.name
        append(formDataDeep,name,value)
    }
    return formDataDeep
}
/**
 * Convenience class to have a similar interface to FormData
 */
export class FormDataDeep extends FormData {
    /**
     * Get `form` data as an object, including nested forms.
     * @param {HTMLFormElement | Object} form the root form element, or a JSON Object containing form data.
     * @param {Boolean} primitives whether to convert string values to primitives. Defaults `false`.
     */
    constructor(form,primitives=false){
        if(form instanceof HTMLFormElement){
            Object.assign(this,getFormDataDeep(form,primitives))
        }else{
            Object.assign(this,form)
        }
    }
    append(name,value,filename=undefined){
        if(filename!==undefined){
            value=new File([value],filename)
        }
        append(this,name,value)
    }
    delete(name){
        delete this[name]
    }
    entries(){
        return Object.entries(this).filter((value)=>!value instanceof Function)
    }
    get(name){
        if(this[name] instanceof Array){
            return this[name].at(-1)
        }else{
            return this[name]
        }
    }
    getAll(name){
        if(this[name] instanceof Array){
            return this[name]
        }else{
            return [this[name]]
        }
    }
    has(name){
        return name in this
    }
    keys(){
        return this.entries().keys()
    }
    set(name,value,filename=undefined){
        if(filename!==undefined){
            value=new File([value],filename)
        }
        this[name]=value
    }
    values(){
        return this.entries().values()
    }
    /**
     * Applies the values in this object to the target form.
     * @param {HTMLFormElement} form 
     */
    apply(form){
        for(const element of form.elements){
            const name=element.name
            if(! name in this){
                continue
            }
            let value
            if(this[name] instanceof Array){
                value=this[name].shift()
            }else{
                value=this[name]
                delete this[name]
            }
            switch(element.type){
                case 'radio':
                case 'checkbox':{
                    element.checked=true
                    break
                }
                default:{
                    element.value=value
                    break
                }
            }
        }
        for(const child of [...form.querySelectorAll('form')].filter(removeChildren)){
            const name=child.name
            if(! name in this){
                continue
            }
            new FormDataDeep(this[name]).apply(form)
        }
    }
}