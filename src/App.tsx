

import { useState } from 'react'
import DatePicker from 'react-datepicker'

import styles from './styles/app.module.scss'
import './styles/libs/global.scss'



const App = () => {

	const [startDate, setStartDate] = useState(new Date())




	return (
		<div className={`${styles.backgroundWrap}`}>
			<header className="App-header">
				<h1>Hello World</h1>
			</header>

			<div className={`${styles.datePick}`}>
				<DatePicker selected={startDate} onChange={date => setStartDate(date as Date)}/>
			</div>
		</div>
	)
}

export default App