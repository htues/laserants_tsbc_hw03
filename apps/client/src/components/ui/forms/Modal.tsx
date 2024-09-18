import { useEffect, useRef } from 'react'
import { ModalTypes } from '../../../types/ui.types'
import { formStyles } from '../twind/styles'

const Modal: React.FC<ModalTypes> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className={formStyles.modal}>
      <div
        className={formStyles.modal_content}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose} className={formStyles.modal_close}>
          X
        </button>
      </div>
    </div>
  )
}

export default Modal
