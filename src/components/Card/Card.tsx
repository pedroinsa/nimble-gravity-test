import { useState, type ChangeEventHandler, type SubmitEventHandler } from "react"
import type { Item } from "../../interfaces/interfaces"
import { ApplyJob } from "../../services/items/items"
import { find_input_error } from "../../services/validation/validation"
import styles from "./Card.module.css"

function Card({ title, id }: Item) {

    const [input, setInput] = useState("")
    const [InputError, setInputError] = useState(true)
    const [applySuccess, setApplySuccess] = useState<null | Boolean>(null)

    const sendForm: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setApplySuccess(null)
        try {
            const { ok } = await ApplyJob(input, id)
            setInput("")
            if (ok) {
                setApplySuccess(ok)
            }


        } catch (error) {
            if (error instanceof Error) {
                setApplySuccess(false)
            }
        }

    }
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setApplySuccess(null)
        setInput(e.target.value)
        setInputError(find_input_error(e.target.value))
    }



    return (
        <div className={styles.card_style}>
            <h3>{title}</h3>
            <form onSubmit={sendForm}>
                <div className={styles.description_input}>
                    <label>Insert your github repository url</label>
                    <input value={input} onChange={onChange} />
                </div>
                <button disabled={InputError}>Apply!</button>
            </form>
            {applySuccess && <div>You applied successfully</div>}
            {applySuccess === false && <div>The apply failed</div>}


        </div>
    )
}

export default Card