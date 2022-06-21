export interface fetchOptions {
    method: "get" | "put" | "post" | "delete"
    body?: Body
    headers?: string[][] | { [key: string]: string } | Headers
}

// const fetchData = (url: string, options: RequestInit) => {
//     const { method } = options

//     if(method === 'get') return handleGET(url, options)
//     else return handlePOST(url, options)

//     // else return
// }

const fetchData = <T>(url: string, options: RequestInit): Promise<T> => {
    return fetch(url, options).then(res => res.json() as Promise<T>)
}

// const handleGET = <T>(url: string, options: RequestInit): Promise<T>=> {
//     return fetch(
//             url,
//             options
//         )
//         .then((res) => res.json() as Promise<T>)
// }

export default fetchData
