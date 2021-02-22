
const loadScripts = (document: Document, url: string) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')

        script.src = url
        script.async = true
        script.onload = () => {
            resolve('Loaded')
        }
        script.onerror = (e) => {
            reject(e)
        }

        document.body.appendChild(script)
    })
}

export default loadScripts