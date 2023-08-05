import InfoToolTip from "./InfoToolTip";
import DismissImage from "../../images/Union_dismiss.svg"

function DismissInfoToolTip ({ isOpen, onClose }) {
  return (
    <InfoToolTip
    img={DismissImage}
    title="Что-то пошло не так! Попробуйте еще раз."
    isOpen={isOpen}
    onClose={onClose}
    />
  )
}

export default DismissInfoToolTip;
