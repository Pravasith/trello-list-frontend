import React, { useContext, useState } from "react"
import ReactDatePicker from "react-datepicker"
import fetchData from "../../factories/hitAPIs"
import urls from "../../lib/urls"
import utilStyles from "../../styles/libs/utils.module.scss"
import { Loader } from "../loader"
import { BoardContext } from "../trelloBoard"
import { ITrelloCard } from "../trelloBoard/interfaces"
import { useForm } from "../useForm"

// MARK

const Task = () => {
    const boardContext = useContext(BoardContext)
    const { GlobalState, dispatch } = boardContext

    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const [showLoading, setShowLoading] = useState(false)

    const [startDate, setStartDate] = useState<null | Date>(null)

    const initState = {
        "task-title": "",
        "task-description": "",
    }

    const [titleText, handleTitleChange] = useForm(initState)
    const [descText, handleDescChange] = useForm(initState)

    const validateAndSubmit = async () => {
        // Validates the form and submits

        setShowError(false)

        if (
            titleText["task-title"] !== "" &&
            descText["task-description"] !== "" &&
            startDate !== null
        ) {
            const data = {
                name: titleText["task-title"],
                desc: descText["task-description"],
                due: startDate.toISOString(),
            }

            setShowLoading(true)
            const trelloKey = process.env.REACT_APP_PRAVAS_MY_TRELLO_KEY

            await fetchData(
                `${urls.ADD_NEW_CARD}?trelloKey=${trelloKey}&trelloToken=${localStorage.trello_token}`,
                {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        listId: GlobalState.todoId,
                        data,
                    }),
                }
            )
                .then(res => {
                    type IRes = {
                        addedCard: ITrelloCard
                    }

                    setShowLoading(false)
                    setShowSuccess(true)

                    dispatch({
                        type: "UPDATE_BOARD",
                        payload: {
                            todoCards: [
                                ...GlobalState.todoCards,
                                (res as IRes).addedCard,
                            ],
                        },
                    })
                })
                .catch(e => console.error(e))
        } else {
            setShowError(true)
        }
    }

    if (showSuccess) {
        return (
            <h2 className="text-3xl p-2 py-1 mb-2 rounded-md text-white">
                Successfully added task
            </h2>
        )
    } else
        return (
            <div className={`${utilStyles.flexCol_Centre} py-4`}>
                <h1 className="text-3xl pb-3">Add your task</h1>
                {showError && (
                    <h2 className="text-1xl p-2 py-1 mb-2 rounded-md text-white bg-red-500">
                        All fields are mandatory
                    </h2>
                )}

                {showLoading && <Loader />}

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
                        placeholderText={"Select a due date"}
                        className={`${utilStyles.stockInput}`}
                        selected={startDate}
                        onChange={date => setStartDate(date as Date)}
                    />
                </div>

                <button
                    className={`${utilStyles.squareButton}`}
                    type="button"
                    onClick={() => validateAndSubmit()}
                >
                    Submit
                </button>
            </div>
        )
}

export default Task
