
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom" 


import Navbar from './components/navbar'

import styles from './styles/app.module.scss'
import utilStyles from './styles/libs/utils.module.scss'

import './styles/libs/global.scss'


import { IProps } from './components/trelloBoard/interfaces'
import TrelloBoard from './components/trelloBoard'
import { useEffect } from "react"



const data: IProps = {
	todos: [
		{
			type: 'TODO',
			title: 'Wash up',
			id: 'todo-1',

			dueDate: new Date(),
			description: "You need to wash clothes",
		},
		{
			type: 'TODO',
			title: 'Eat cheese',
			id: 'todo-2',

			dueDate: new Date(),
			description: "You need to eat cheese",
		},
		{
			type: 'TODO',
			title: 'Get up',
			id: 'todo-3',

			dueDate: new Date(),
			description: "You need to get up",
		},
		{
			type: 'TODO',
			title: 'Make love',
			id: 'todo-4',

			dueDate: new Date(),
			description: "You need to make love",
		},
		{
			type: 'TODO',
			title: 'Wash up',
			id: 'todo-21',

			dueDate: new Date(),
			description: "You need to wash clothes",
		},
		{
			type: 'TODO',
			title: 'Eat cheese',
			id: 'todo-22',

			dueDate: new Date(),
			description: "You need to eat cheese",
		},
		{
			type: 'TODO',
			title: 'Get up',
			id: 'todo-23',

			dueDate: new Date(),
			description: "You need to get up",
		},
		{
			type: 'TODO',
			title: 'Make love',
			id: 'todo-24',

			dueDate: new Date(),
			description: "You need to make love",
		},

		{
			type: 'TODO',
			title: 'Wash up',
			id: 'todo-221',

			dueDate: new Date(),
			description: "You need to wash clothes",
		},
		{
			type: 'TODO',
			title: 'Eat cheese',
			id: 'todo-222',

			dueDate: new Date(),
			description: "You need to eat cheese",
		},
		{
			type: 'TODO',
			title: 'Get up',
			id: 'todo-223',

			dueDate: new Date(),
			description: "You need to get up",
		},
		{
			type: 'TODO',
			title: 'Make love',
			id: 'todo-224',

			dueDate: new Date(),
			description: "You need to make love",
		},
	],

	done: [
		{
			type: 'DONE',
			title: 'Eat Pizza',
			id: 'done-1',

			dueDate: new Date(),
			description: "You need to eat pizza",
		},
		{
			type: 'DONE',
			title: 'Drive car',
			id: 'done-2',

			dueDate: new Date(),
			description: "You need to drive car",
		},
		{
			type: 'DONE',
			title: 'Do yoga',
			id: 'done-3',

			dueDate: new Date(),
			description: "You need to do yoga",
		},
		{
			type: 'DONE',
			title: 'Sleep well',
			id: 'done-4',

			dueDate: new Date(),
			description: "You need to sleep well",
		},
	]
}




const Home = () => (

	<div className={`${styles.container} ${utilStyles.posRel}`}>
		<header className="App-header">
			<Navbar />
		</header>

		<div className={`${styles.childrenBody} ${utilStyles.flexRow_Centre}`}>
			<TrelloBoard {...data} />
		</div>


		<footer
			className={`${utilStyles.flexRow_Centre} ${utilStyles.posAbs_NW}`}
			>
			Designed and developed by Pravasith.
		</footer>


	</div>

)

const App = () => {


	return (

		// For this, there is no need for a Router since
		// this is literally a single page application,
		// but I've used it anyway for best practices.
		<Router>
			<Switch>
				<Route path="/">
					<Home />
				</Route>
			</Switch>

		</Router>
	)
}

export default App