import { createPortal } from "react-dom"
import "./Modal.css"

const Modal = ({ children }) => {
    return createPortal(
        <div className="Modal">
            {children}
        </div>,
        document.getElementById("Modal")
    )
}

export { Modal }