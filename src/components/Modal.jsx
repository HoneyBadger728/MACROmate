import { useEffect, useRef } from "react";
import "./Modal.css"

function Modal({title, titleId, onClose, children}) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        const previouslyFocused = document.activeElement;

        if (!dialog) {
            return;
        }

        dialog.showModal();

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)

            if (dialog.open) {
                dialog.close()
            }

            previouslyFocused?.focus?.();
        };
    }, [onClose]);


    return (
        <dialog
            className="modal"
            ref={dialogRef}
            aria-labelledby={titleId} 
        >
            <h2 className="modal__title" id={titleId}>
                {title}
            </h2>

            {children}
        </dialog>
    );
}

export default Modal;