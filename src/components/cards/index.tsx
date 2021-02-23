
import styles from './cards.module.scss'
import utilStyles from '../../styles/libs/utils.module.scss'
import { ITrelloCard } from '../trelloBoard/interfaces'
import { TickMark, TimeLeft } from '../../icons/common'
import ConvertDate from '../../factories/convertDate'



const Cards = ({ cardsList }: { cardsList: ITrelloCard[] }) => {

    return (
        <div className={`${styles.container}`}>

            {
                cardsList.map((item, i) => {
                    return (
                        <div
                            className={`rounded-md px-4 py-2 m-4 ${styles.card} ${utilStyles.flexRow_W} ${item.type === 'TODO' ? styles.blueColor : styles.greenColor
                                }`}
                            key={`cardiA-${item.id}`}
                        >
                            <div className={`w-5 h-5 mr-2 rounded-full bg-${'fl-green'}`}>
                                <TickMark />
                            </div>

                            <p
                                className={`text-fl-blue text-tiny font-medium mt-1.5 truncate ${styles.listItem}`}
                            >
                                {item.name}
                            </p>

                            {
                                !!item.due && (
                                    <div className={` ${utilStyles.flexRow_Centre}`}>
                                        <div className={`w-5 h-5 mr-2 rounded-full mx-1.5`}>
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