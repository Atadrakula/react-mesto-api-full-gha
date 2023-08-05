import InfoToolTip from "./InfoToolTip";
import DoneImage from "../../images/Union_ok.svg"

function DoneInfoToolTip ({ isOpen, onClose }) {
  return (
    <InfoToolTip
    img={DoneImage}
    title="Вы успешно зарегистрировались!"
    isOpen={isOpen}
    onClose={onClose}
    />
  )
}

export default DoneInfoToolTip;
