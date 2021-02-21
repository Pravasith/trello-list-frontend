
import styles from './trello_board.module.scss'
import utilStyles from '../../styles/libs/utils.module.scss'

import { AddNewTask, TickMark, TimeLeft, TrelloLogo } from '../../icons/common'
import { Card, IProps } from './interfaces'
import { useState } from 'react'
import Modal from '../modal'





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

    const [showModal, setShowModal] = useState(false)
    
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
                                onClick={() => setShowModal(true)}
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
                showModal && (<Modal closeModal={setShowModal} />)
            }
        </>
    )
}


export default TrelloBoard