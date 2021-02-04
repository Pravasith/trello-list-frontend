import { ReactNode } from "react"
// import Navbar from "../navbar"

import styles from "../../assets/scss/layout/layout.module.scss"

type Props = {
    children: ReactNode
}


const Layout = ( props: Props ) => {
    const { children } = props

    const PageContent = () => (
        <div
            className={ `${ styles.container }` }
            >
            {/* <Navbar/> */}
            <main className = "main">
                {
                    children
                }
            </main>
        </div>
    )

    return (
        <>
            <PageContent/>
        </>
    )
}

export default Layout