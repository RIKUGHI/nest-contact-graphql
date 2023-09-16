import { FC, PropsWithChildren } from "react"

interface ModalProps {
  show: boolean
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, show }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0">
      <div className="bg-black fixed inset-0 opacity-50"></div>
      <div className="fixed inset-0 z-10 p-10 overflow-auto">{children}</div>
    </div>
  )
}

export default Modal
