
import styles from './cards.module.scss'
import utilStyles from '../../styles/libs/utils.module.scss'
import { ITrelloCard } from '../trelloBoard/interfaces'
import { TickMark, TimeLeft } from '../../icons/common'
import ConvertDate from '../../factories/convertDate'
import fetchData from '../../factories/hitAPIs'
import urls from '../../lib/urls'
import { useContext, useState } from 'react'
import { BoardContext } from '../trelloBoard'
import { Loader } from '../loader'



const Cards = ({ cardsList }: { cardsList: ITrelloCard[] }) => {

    const [ showLoading, setShowLoading ] = useState(false)

    const boardContext = useContext(BoardContext)
    const { GlobalState, dispatch } = boardContext

    const moveCard = async (card: ITrelloCard) => {
        // API Handling - Update Card
        const trelloKey = process.env.REACT_APP_PRAVAS_MY_TRELLO_KEY

        setShowLoading(true)

        await fetchData(
            `${urls.UPDATE_A_CARD}?id=${card.id}&trelloKey=${trelloKey}&trelloToken=${localStorage.trello_token}`,
            {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    listId: card.type === 'TODO' ? GlobalState.doneId : GlobalState.todoId
                })
            }
        )
        .then((res) => {
            type IRes = {
                updatedCard: ITrelloCard
            }

            // const responseData = res as IRes
            // const { name, id } = responseData.pravasBoard

            console.log(res)

            // dispatch({
            //     type: 'UPDATE_BOARD',
            //     payload: {
            //         todoCards: [
            //             ...GlobalState.todoCards,
            //             (res as IRes).updatedCard
            //         ]
            //     }
            // })

        })
        .catch(e => console.error(e))

        setShowLoading(false)
    }

    return (
        <div className={`${styles.container}`}>
            {
                showLoading && <Loader/>
            }

            {
                cardsList.map((item, i) => {
                    return (
                        <div
                            className={`rounded-md px-4 py-2 m-4 ${styles.card} ${utilStyles.flexRow_W} ${item.type === 'TODO' ? styles.blueColor : styles.greenColor}`}
                            key={`cardiA-${item.id}`}
                        >
                            {
                                <button
                                    className={`w-5 h-5 mr-3 rounded-full ${styles.tickMark} ${styles['tickMark-' + item.type]}`}
                                    onClick={() => {
                                        moveCard(item)
                                    }}
                                >
                                    <TickMark />
                                </button>
                            }
                            

                            <p
                                className={`text-fl-blue text-tiny font-medium mt-1.5 truncate ${styles.listItem}`}
                            >
                                {item.name}
                            </p>

                            {
                                !!item.due && (
                                    <div className={` ${utilStyles.flexRow_Centre}`}>
                                        <div className={`w-4 h-4 mr-2 rounded-full mx-1.5`}>
                                            <TimeLeft intensity={'none'} />
                                        </div>

                                        <p className={`text-tiny text-gray-500 mt-1.5`}>{ConvertDate(new Date(item.due))}</p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Cards