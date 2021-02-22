import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import utilStyles from '../../styles/libs/utils.module.scss'
import { Loader } from '../loader'
import { useForm } from '../useForm'

// MARK

const Task = () => {

    const [showError, setShowError] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    const [startDate, setStartDate] = useState<null | Date>(null)


    const [titleText, handleTitleChange] = useForm({
        "task-title": ''
    })

    const [descText, handleDescChange] = useForm({
        "task-description": ''
    })


    const validateAndSubmit = () => {
        // Validates the form and submits

        setShowError(false)

        if (
            titleText['task-title'] !== '' &&
            descText['task-description'] !== '' &&
            startDate !== null
        ) {
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

        else {
            setShowError(true)
        }
    }

    return (

        <div className={`${utilStyles.flexCol_Centre} py-4`}>
            <h1 className="text-3xl pb-3">Add your task</h1>
            {
                showError && (
                    <h2 className="text-1xl p-2 py-1 mb-2 rounded-md text-white bg-red-500">All fields are mandatory</h2>
                )
            }

            {
                showLoading && <Loader />
            }

            <div className={`${utilStyles.flexCol_Centre}`}>
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

            <div>
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

    )
}


export default Task