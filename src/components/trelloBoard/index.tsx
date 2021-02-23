import { createContext, useReducer } from 'react'


import { ITrelloBoard } from './interfaces'

import TrelloBoard from './trelloBoard'



export interface IContextProps {
    GlobalState: ITrelloBoard
    dispatch: (
        { type, payload }: {
            type: string,
            payload: any
        }
    ) => void
}

const initialState = {
    name: 'Trello Board',
    id: '',
    todoCards: [],
    doneCards: []
}


export const BoardContext = createContext({} as IContextProps)


export const trelloReducer = (
    state: any,
    action: {
        type: string,
        payload: any
    }
) => {
    switch (action.type) {
        case 'UPDATE_BOARD':
            // console.log(action.payload)
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

const Index = () => {

    const [ state, dispatch ] = useReducer(trelloReducer, {
        ...initialState
    })

    return (
        <BoardContext.Provider
            value={
                {
                    GlobalState: state,
                    dispatch
                }
            }
            >
            <TrelloBoard/>
        </BoardContext.Provider>
    )
}

export default Index