/** @module FileReaderAsync */

/** @class */
export class FileReaderAsync {
    /**
     * @param {String} type The return type (ArrayBuffer, BinaryString, Text, DataURL)
     * @param {Blob} blob The `Blob` to read
     * @returns {Promise<ArrayBuffer>} The `Blob` data
     */
    static readAs(type,blob){
        return new Promise((resolve,reject)=>{
            const fileReader=new FileReader()
            fileReader.onload=(event)=>resolve(event.target.result)
            fileReader.onabort=(event)=>reject(event)
            fileReader.onerror=(event)=>reject(event)
            fileReader['readAs'+type](blob)
        })
    }
    /**
     * @param {Blob} blob The `Blob` to read
     * @returns {Promise<ArrayBuffer>} The `Blob` data
     */
    readAsArrayBuffer(blob) { 
        return FileReaderAsync.readAs('ArrayBuffer',blob)
    }
    /**
     * @depreciated see https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync/readAsBinaryString
     * @param {Blob} blob The `Blob` to read
     * @returns {Promise<String>} The `Blob` data
     */
    readAsBinaryString(blob) { 
        return FileReaderAsync.readAs('BinaryString',blob)
    }
    /**
     * @param {Blob} blob The `Blob` to read
     * @returns {Promise<String>} The `Blob` data
     */
    readAsText(blob) { 
        return FileReaderAsync.readAs('Text',blob)
    }
    /**
     * @param {Blob} blob The `Blob` to read
     * @returns {Promise<String>} The `Blob` data
     */
    readAsDataURL(blob) { 
        return FileReaderAsync.readAs('DataURL',blob)
    }
}