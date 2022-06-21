import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Navbar from "./components/navbar"

import styles from "./styles/app.module.scss"
import utilStyles from "./styles/libs/utils.module.scss"

import "./styles/libs/global.scss"

import TrelloBoard from "./components/trelloBoard"

const Home = () => (
    <div className={`${styles.container} ${utilStyles.posRel}`}>
        <header className="App-header">
            <Navbar />
        </header>

        <div className={`${styles.childrenBody} ${utilStyles.flexRow_Centre}`}>
            <TrelloBoard />
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
