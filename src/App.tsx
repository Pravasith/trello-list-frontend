

// import { useState } from 'react'
// import DatePicker from 'react-datepicker'
import Navbar from './components/navbar'

import styles from './styles/app.module.scss'
import utilStyles from './styles/libs/utils.module.scss'

import './styles/libs/global.scss'
import TrelloBoard from './components/trelloBoard'



const App = () => {

	// const [startDate, setStartDate] = useState(new Date())

	return (
		<div className={`${styles.container} ${utilStyles.posRel}`}>
			<header className="App-header">
				<Navbar/>
			</header>

			{/* <div className={`${styles.datePick}`}>
				<DatePicker selected={startDate} onChange={date => setStartDate(date as Date)}/>
			</div> */}

			<div className={`${styles.childrenBody} ${utilStyles.flexRow_Centre}`}>
				<TrelloBoard/>
			</div>


			<footer
				className={`${utilStyles.flexRow_Centre} ${utilStyles.posAbs_NW}`}
				>
				Designed and developed by Pravasith.
			</footer>


		</div>
	)
}

export default App