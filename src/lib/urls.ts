
export const be = 'http://localhost:8000'

export const baseAPI = be + '/api'
export const APIS = {
    BOARD: baseAPI + '/boards'
}

export default {
    // GET
    GET_TRELLO_BOARD: APIS.BOARD + '/get-board',
    // POST
    CREATE_TRELLO_BOARD: APIS.BOARD + '/create-board',
    // PUT
    // DELETE
}