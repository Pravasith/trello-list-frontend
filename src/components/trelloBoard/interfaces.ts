export type Card = {
    type: "TODO" | "DONE"
    title: string
    id: string

    dueDate: Date
    description: string
}

export interface ITrelloCard {
    name: string
    desc: string
    id: string
    due: Date
    idList: string
    type: "TODO" | "DONE"
}

export interface ITrelloList {
    name: string
    id: string
}

export interface ITrelloBoard {
    name: string
    id: string
    todoCards: ITrelloCard[]
    doneCards: ITrelloCard[]

    todoId?: string
    doneId?: string

    lists?: ITrelloList[]
}

export interface IProps {
    todos: Card[]
    done: Card[]
}
