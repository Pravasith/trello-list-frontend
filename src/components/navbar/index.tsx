

import styles from './navbar.module.scss'
import utilStyles from '../../styles/libs/utils.module.scss'

import { Logo } from '../../icons/common'


const Navbar = () => {

    return (
        <div className={ `${styles.container}` }>
            <nav className={ `${utilStyles.flexRow_Centre}` }>
                <div 
                    className={ `${utilStyles.flexRow_Centre} ${styles.logo}` }
                    >
                    <a
                        href="/"
                        className={ `${utilStyles.flexCol_Centre}` }
                        >
                        <Logo/>
                    </a>
                </div>
            </nav>

        </div>
    )
}

export default Navbar