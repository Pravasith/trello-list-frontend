
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
    GET_CARDS_IN_BOARD: APIS.BOARD + '/get-cards',
    CREATE_TRELLO_BOARD: APIS.BOARD + '/create-board',

    // POST
    ADD_NEW_CARD: APIS.LIST + '/add-card',

    // PUT
    UPDATE_A_CARD: APIS.LIST + '/update-card',

    // DELETE
    
}