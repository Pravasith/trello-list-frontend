import { useEffect, useState } from 'react'

import styles from './trello_board.module.scss'
import utilStyles from '../../styles/libs/utils.module.scss'

import { AddNewTask, TickMark, TimeLeft, TrelloLogo } from '../../icons/common'
import { Card, IProps } from './interfaces'

import fetchData from '../../factories/hitAPIs'

import Modal from '../modal'
import loadScripts from '../../factories/loadScripts'
import Task from '../task'
import urls from '../../lib/urls'




const Cards = ({ cardsList }: { cardsList: Card[] }) => {

    return (
        <div className="cardiA">

            {
                cardsList.map((item, i) => {
                    return (
                        <div 
                            className={`rounded-md px-4 py-2 m-4 ${styles.card} ${utilStyles.flexRow_Centre} ${
                                item.type === 'TODO' ? styles.blueColor : styles.greenColor
                            }`}
                            key={`cardiA-${item.id}`}
                            >
                            <div className={`w-5 h-5 mr-2 rounded-full bg-${ 'fl-green' }`}>
                                <TickMark/>
                            </div>

                            <p 
                                className={`text-fl-blue text-tiny font-medium mt-1.5 truncate ${styles.listItem}`}
                                >
                                { item.title }
                            </p>

                            <div className={` ${utilStyles.flexRow_Centre}`}>
                                <div className={`w-5 h-5 mr-2 rounded-full mx-1.5`}>
                                    <TimeLeft intensity={'none'}/>
                                </div>

                                <p className={`text-tiny text-gray-500 mt-1.5`}>{ 'item.dueDate' }</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


const TrelloBoard = (props: IProps) => {

    const trelloKey = 'ffb9322b726e5e17b0eac594b73dc931'

    const [ showTaskModal, setShowTaskModal ] = useState(false)
    const [ showAuthModal, setShowAuthModal ] = useState(
        !localStorage.trello_token
    )


    const configureTrello = async (document: Document, firstTime?: boolean) => {

        // JQuery
        await loadScripts(document, 'https://code.jquery.com/jquery-3.3.1.min.js')
        // Auth-ing using clientJS 
        // #see https://developer.atlassian.com/cloud/trello/guides/client-js/getting-started-with-client-js/
        await loadScripts(document, `https://trello.com/1/client.js?key=${ trelloKey }`)


        const authenticationSuccess = async () => {
            // console.log('Successful authentication')
            setShowAuthModal(false)


            // console.log(auth)
            await fetchData(
                `${urls.GET_TRELLO_BOARD}?trelloKey=${trelloKey}&trelloToken=${localStorage.trello_token}`,
                {
                    method: 'get'
                }
            )

            .then((res) => {
                console.log(res)
            })
        }

        const authenticationFailure = () => {
            // console.log('Failed authentication')
            setShowAuthModal(true)
        }


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

            <div className={`w-full h-full ${styles.container} ${utilStyles.flexCol_Centre}`}>
                <div className={`${utilStyles.flexRow_Centre}`}>
                    <div className={`w-8 mr-2 mb-1`}>
                        <TrelloLogo/>
                    </div>

                    <h2 className={`text-lg text-fl-blue`}>Trello board</h2>
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

                        <div className={`${styles.scrollWrap}`}>
                            {
                                <Cards cardsList={ props.todos } />
                            }
                        </div>
                    </div>

                    <div className={`mx-4 ${utilStyles.flexCol_Centre}`}>
                        <h2 className={`text-lg mb-4 text-fl-green font-medium`}>Done</h2>

                        <div className={`${styles.scrollWrap}`}>
                            {
                                <Cards cardsList={ props.done } />
                            }
                        </div>
                    </div>
                </div>

                
            </div>

            {
                showTaskModal && (<Modal modalCloses={{ closeModal: setShowTaskModal}} children={<Task />} />)
            }

            {
                showAuthModal && (<Modal children={
                    <div className={`${utilStyles.flexCol_Centre}`}>
                        <h1 className={`text-3xl text-white text-center`}>Hi! To see your Trello board, <br/> please authorize this application.</h1>

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