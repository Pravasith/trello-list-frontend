
import styles from '../../styles/trello_board.module.scss'
import utilStyles from '../../styles/libs/utils.module.scss'

import { TickMark, TimeLeft, TrelloLogo } from '../../icons/common'


const Cards = () => {

    const cards = new Array(4).fill(null)



    return (
        <div className="cardiA">
            {
                cards.map((item, i) => {
                    return (
                        <div 
                            className={`rounded-md px-4 py-2 my-2 ${styles.card} ${utilStyles.flexRow_Centre}`}
                            key={`cardiA-${i}`}
                            >
                            <div className={`w-5 h-5 mr-2 rounded-full bg-${ 'fl-green' }`}>
                                <TickMark/>
                            </div>

                            <p className={`text-fl-blue text-tiny font-medium mt-1.5 truncate ${styles.listItem}`}>Hello world</p>

                            <div className={` ${utilStyles.flexRow_Centre}`}>
                                <div className={`w-5 h-5 mr-2 rounded-full mx-1.5`}>
                                    <TimeLeft intensity={'none'}/>
                                </div>

                                <p className={`text-tiny text-gray-500 mt-1.5`}>08:00, 12 Feb 2021</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


const TrelloBoard = () => {
    return (
        <>
            <div className={`w-full h-full ${styles.container} ${utilStyles.flexCol_Centre}`}>
                <div className={`${utilStyles.flexRow_Centre}`}>
                    <div className={`w-8 mr-2 mb-1`}>
                        <TrelloLogo/>
                    </div>

                    <h2 className={`text-lg text-fl-blue`}>Trello board</h2>
                </div>

                <div className={`my-8 ${utilStyles.flexRow_Centre}`}>
                    <div className={`mx-4 ${utilStyles.flexCol_Centre}`}>
                        <h2 className={`text-lg text-fl-blue font-medium`}>Todos</h2>

                        {
                            <Cards/>
                        }
                    </div>

                    <div className={`mx-4 ${utilStyles.flexCol_Centre}`}>
                        <h2 className={`text-lg text-fl-blue font-medium`}>Todos</h2>

                        {
                            <Cards/>
                        }
                    </div>
                </div>

                
            </div>
        </>
    )
}


export default TrelloBoard