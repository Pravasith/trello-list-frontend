
export const be = 'http://localhost:8000'

export const baseAPI = be + '/api'
export const APIS = {
    BOARD: baseAPI + '/boards',
    LIST: baseAPI + '/lists'
}

export default {
    // GET
    GET_TRELLO_BOARD: APIS.BOARD + '/get-board',
    GET_LISTS_IN_BOARD: APIS.BOARD + '/get-lists',
    // POST
    CREATE_TRELLO_BOARD: APIS.BOARD + '/create-board',
    // PUT
    // DELETE
}