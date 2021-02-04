
import styles from '../../styles/trello_board.module.scss'
import utilStyles from '../../styles/libs/utils.module.scss'
import { TrelloLogo } from '../../icons/common'



const TrelloBoard = () => {
    return (
        <>
            <div className={`${styles.container} ${utilStyles.flexCol_Centre}`}>
                <div className={`${styles.trelloHeader} ${utilStyles.flexRow_Centre}`}>
                    <div className={`${styles.trelloLogo}`}>
                        <TrelloLogo/>
                    </div>
                    <h2>Trello board</h2>
                </div>
            </div>
        </>
    )
}


export default TrelloBoard