import { constants } from '../constants';
import { InputGifts } from '../InputGifts';
import "./Form.css"

const Form = ({
    gifts,
    setGifts,
    setModal,
    editGift = {},
    setEditGift,
}) => {

    const { URLdefault } = constants
    const index = gifts[gifts.length - 1]?.id ?? -1

    const { id, title, total, destiny, price, URL } = editGift

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const current = evt.currentTarget

        const title = current.title.value.trim()
        const total = current.total.value || 1
        const destiny = current.destiny.value.trim()
        const price = Number(current.price.value.trim())
        const URL = current.url.value.trim() || URLdefault



        if (editGift) {

            const index = gifts.findIndex(gift => (
                gift.id === editGift.id
            ))

            setGifts(
                [
                    ...gifts.slice(0, index),
                    {
                        id: id,
                        title,
                        total,
                        destiny,
                        price,
                        URL,

                    },
                    ...gifts.slice(index + 1),

                ]
            )
        } else {

            setGifts(
                [
                    ...gifts,
                    {
                        id: index + 1,
                        title,
                        total,
                        destiny,
                        price,
                        URL,

                    }
                ]
            )
        }

        setModal(modal => !modal)
        setEditGift("")
    }

    const handleSurprise = () => {
        const newGift = document.getElementById('title')
        const surprises = constants.randomGifts
        const randomNumber = Math.floor(Math.random() * surprises.length)
        newGift.value = surprises[randomNumber]
    }


    const handleCancel = () => {
        setModal(modal => !modal)
        setEditGift("")

    }


    return (
        <form onSubmit={handleSubmit} className="Form" >

            <div className='newGift'>

                <InputGifts
                    label="Agrega tu regalo"
                    id="title"
                    type="text"
                    placeholder='Agrega tu regalo...'
                    value={title ?? ""}
                />

                <button
                    type='button'
                    className="add-button"
                    onClick={handleSurprise}

                >¡Sorprendeme!</button>

            </div>

            <InputGifts
                label="Imagen"
                id="url"
                type="url"
                placeholder='http://image...'
                value={URL ?? ""}

            />
            <InputGifts
                label="Cantidad"
                id="total"
                type="number"
                placeholder="Cantidad de regalos ..."
                min={1}
                max={10}
                value={total ?? ""}
            />

            <InputGifts
                label="Precio unitario"
                id="price"
                type="text"
                placeholder='$ 00.00'
                value={price ?? ""}
            />

            <InputGifts
                label="Destinatario"
                id="destiny"
                type="text"
                placeholder='Para: ...'
                value={destiny ?? ""}

            />
            <div className='buttons'>
                <button
                    type='button'
                    className="button--deleted"
                    onClick={handleCancel}
                >Cancelar
                </button>

                <button
                    className="add-button"
                    type='submit'
                >Guardar
                </button>
            </div>
        </form>
    )
}

export { Form }