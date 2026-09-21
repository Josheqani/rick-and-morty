import { useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Modal = ({ title, children, open, onOpen }) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onOpen]);

  if (!open) return null;

  return (
    <div
      className="modal-container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="backdrop"
        onClick={() => onOpen(false)}
        aria-hidden="true"
      ></div>
      <div className="modal">
        <div className="modal__header">
          <h2 id="modal-title" className="title">
            {title}
          </h2>
          <button
            type="button"
            className="modal__close-btn"
            onClick={() => onOpen(false)}
            aria-label="Close modal"
          >
            <XCircleIcon className="icon" />
          </button>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
