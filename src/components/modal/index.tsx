

import React from 'react'

import { CloseButton } from "../../icons/common"

import utilStyles from '../../styles/libs/utils.module.scss'



import styles from './modal.module.scss'

const Modal = (
    props: {
        modalCloses?: {
            closeModal: React.Dispatch<React.SetStateAction<boolean>>,
        }
        children: React.ReactChild
    }
) => {



  
    return (
        <div className={`fixed top-0 left-0 w-full h-screen ${styles.container}`}>
            <div className="relative w-full h-full">
                {
                    props.modalCloses && (
                        <button
                            className={`absolute top-0 right-0 w-10 h-10 m-6 ${utilStyles.roundSVGButton}`}
                            onClick={() => props.modalCloses && props.modalCloses.closeModal(false)}
                        >
                            <CloseButton />
                        </button>
                    )
                }

                <div className={`${styles.modalOuterWrap} flex justify-center items-center w-full h-full`}>
                    <div className={`${styles.modalInnerWrap} ${utilStyles.flexCol_Centre} bg-fl-blue p-4 rounded-md`}>
                        {
                            props.children
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Modal