

import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import { CloseButton } from "../../icons/common"

import utilStyles from '../../styles/libs/utils.module.scss'
import { Loader } from '../loader'
import { useForm } from '../useForm'


import styles from './modal.module.scss'

const Modal = (
    props: {
        closeModal: React.Dispatch<React.SetStateAction<boolean>>
    }
) => {


    const [ startDate, setStartDate ] = useState<null | Date>(null)
    
    const [showError, setShowError] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    
    const [ titleText, handleTitleChange ] = useForm({
        "task-title": ''
    })

    const [ descText, handleDescChange ] = useForm({
        "task-description": ''
    })


    const validateAndSubmit = () => {
        // Validates the form and submits

        setShowError(false)

        if(
            titleText['task-title'] !== '' &&
            descText['task-description'] !== '' &&
            startDate !== null
        ){
            const data = {
                title: titleText['task-title'],
                description: descText['task-description'],
                dueDate: startDate
            }


            setShowLoading(true)

            let x = setTimeout(() => {
                clearTimeout(x)
                console.log(data)

                setShowLoading(false)
            }, 2000)
        }

        else{
            setShowError(true)
        }
    }
  
    return (
        <div className={`fixed top-0 left-0 w-full h-screen ${styles.container}`}>
            <div className="relative w-full h-full">
                <button
                    className={`absolute top-0 right-0 w-10 h-10 m-6 ${utilStyles.roundSVGButton}`}
                    onClick={() => props.closeModal(false)}
                >
                    <CloseButton />
                </button>

                <div className={`${styles.modalOuterWrap} flex justify-center items-center w-full h-full`}>
                    <div className={`${styles.modalInnerWrap} ${utilStyles.flexCol_Centre} bg-fl-blue p-4 rounded-md`}>
                        <h1 className="text-3xl pb-3">Add your task</h1>
                        {
                            showError && (
                                <h2 className="text-1xl p-2 py-1 mb-2 rounded-md text-white bg-red-500">All fields are mandatory</h2>
                            )
                        }

                        {
                            showLoading && <Loader />
                        }

                        <div className={`${styles.contentWrap} ${utilStyles.flexCol_Centre}`}>
                            <input
                                onChange={handleTitleChange}
                                className={`${utilStyles.stockInput}`}
                                placeholder="Enter your title"
                                type="text"
                                name="task-title"
                            />
                            <input
                                onChange={handleDescChange}
                                className={`${utilStyles.stockInput}`}
                                placeholder="Enter a short description"
                                type="textarea"
                                name="task-description"
                            />
                        </div>

                        <div className={`${styles.datePick}`}>
                            <ReactDatePicker
                                placeholderText={'Select a due date'}
                                className={`${utilStyles.stockInput}`}
                                selected={startDate}
                                onChange={date => setStartDate(date as Date)}
                            />
                        </div>

                        <button
                            className={`${utilStyles.squareButton}`}
                            type='button'
                            onClick={() => validateAndSubmit()}
                            >
                            Submit
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Modal