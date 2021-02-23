import { useContext, useEffect, useState } from 'react'

import styles from './trello_board.module.scss'
import utilStyles from '../../styles/libs/utils.module.scss'

import { AddNewTask, AddToDo, MarkDone, TrelloLogo } from '../../icons/common'
import { ITrelloBoard, ITrelloCard } from './interfaces'

import fetchData from '../../factories/hitAPIs'

import Modal from '../modal'
import loadScripts from '../../factories/loadScripts'
import Task from '../task'
import urls from '../../lib/urls'
import Cards from '../cards'
import { BoardContext } from '.'






const TrelloBoard = () => {

    const trelloKey = process.env.REACT_APP_PRAVAS_MY_TRELLO_KEY


    const [showTaskModal, setShowTaskModal] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(
        !localStorage.trello_token
    )


    const boardContext = useContext(BoardContext)
    const { GlobalState, dispatch } = boardContext

    // useEffect(() => {
    //     console.log(GlobalState)
    // }, [GlobalState])


    const authenticationSuccess = async () => {
        setShowAuthModal(false)

        let boardData = {
            ...GlobalState
        }

        // Get a board named 'pravas-board' (creates the board if it doesn't exist)
        await fetchData(
            `${urls.GET_TRELLO_BOARD}?trelloKey=${trelloKey}&trelloToken=${localStorage.trello_token}`,
            {
                method: 'get',
            }
        )
        .then((res) => {
            type IRes = {
                pravasBoard: ITrelloBoard
            }

            const responseData = res as IRes
            const { name, id } = responseData.pravasBoard

            boardData = {
                ...boardData,
                name,
                id
            }

        })
        .catch(e => console.error(e))

        // Get lists in the board 'pravas-board'
        await fetchData(
            `${urls.GET_CARDS_IN_BOARD}?boardId=${boardData.id}&trelloKey=${trelloKey}&trelloToken=${localStorage.trello_token}`,
            {
                method: 'get',
            }
        )
        .then(res => {

            const responseData = res as {
                todoCards: ITrelloCard[],
                doneCards: ITrelloCard[]
            }

            boardData = {
                ...boardData,
                ...responseData
            }

            // setBoard(boardData)

            dispatch({
                type: 'UPDATE_BOARD',
                payload: boardData
            })

        })
        .catch(e => console.error(e))

    }

    const authenticationFailure = () => {
        // console.log('Failed authentication')
        setShowAuthModal(true)
    }


    const configureTrello = async (document: Document, firstTime?: boolean) => {

        // JQuery
        await loadScripts(document, 'https://code.jquery.com/jquery-3.3.1.min.js')
        // Auth-ing using clientJS 
        // #see https://developer.atlassian.com/cloud/trello/guides/client-js/getting-started-with-client-js/
        await loadScripts(document, `https://trello.com/1/client.js?key=${trelloKey}`)

        interface IWindow extends Window {
            Trello?: any
        }

        return (window as IWindow).Trello.authorize(
            {
                type: 'redirect',
                name: 'Getting Started Application',
                scope: {
                    read: 'true',
                    write: 'true'
                },
                // expiration: 'never',
                success: authenticationSuccess,
                error: authenticationFailure,
                interactive: firstTime
            }
        )

    }


    useEffect(() => {

        const checkForAuth = async () => {
            await configureTrello(document, false)
        }

        checkForAuth()
    }, [])

    return (
        <>
            <div className={`w-full h-full pt-8 ${styles.container} ${utilStyles.flexCol_N}`}>
                <div className={`${utilStyles.flexRow_Centre}`}>
                    <div className={`w-8 mr-2 mb-1`}>
                        <TrelloLogo />
                    </div>

                    <h2 className={`text-lg text-fl-blue font-medium`}>{GlobalState.name}</h2>
                </div>

                <div className={`my-8 ${utilStyles.flexRow_N}`}>
                    <div className={`mx-4 ${utilStyles.flexCol_Centre}`}>

                        <div className={`mb-4 ${utilStyles.flexRow_Centre}`}>
                            <h2 className={`text-lg text-fl-blue font-medium`}>Todos</h2>
                            <button
                                className={`${utilStyles.roundSVGButton}`}
                                onClick={() => setShowTaskModal(true)}
                            >
                                <AddNewTask />
                            </button>
                        </div>

                        <div className={`${styles.scrollWrap} ${utilStyles.flexCol_N}`}>
                            {
                                GlobalState.todoCards.length === 0
                                    ?
                                    <div className={`${styles.bgdImageWrap}`}>
                                        <AddToDo />
                                    </div>
                                    :
                                    // <Cards cardsList={props.todos} />
                                    <Cards cardsList={GlobalState.todoCards} />

                            }
                        </div>
                    </div>

                    <div className={`mx-4 ${utilStyles.flexCol_Centre}`}>
                        <h2 className={`text-lg mb-4 text-fl-green font-medium`}>Done</h2>

                        <div className={`${styles.scrollWrap} ${utilStyles.flexCol_N}`}>
                            {
                                GlobalState.doneCards.length === 0
                                ?
                                <div className={`${styles.bgdImageWrap} ${styles.bgdDone}`}>
                                    <MarkDone />
                                </div>
                                :
                                // <Cards cardsList={props.todos} />
                                <Cards cardsList={GlobalState.doneCards} />

                            }
                        </div>
                    </div>
                </div>


            </div>

            {
                showTaskModal && (<Modal modalCloses={{ closeModal: () => setShowTaskModal(false) }} children={<Task/>} />)
            }

            {
                showAuthModal && (<Modal children={
                    <div className={`${utilStyles.flexCol_Centre}`}>
                        <h1 className={`text-3xl text-white text-center`}>Hi! To see your Trello board, <br /> please authorize this application.</h1>

                        <button
                            className={`${utilStyles.squareButton}`}
                            type='button'
                            onClick={() => configureTrello(document)}
                        >
                            Authorize
                        </button>
                    </div>
                } />)
            }
        </>
    )
}


export default TrelloBoard