import { useModalContext } from '../../context/Modal';

const OpenModalButton = ({
    modalComponent, // component to render inside the modal
    buttonText, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
  }) => {
    const { setModalContent, setOnModalClose } = useModalContext();

    const onClick = (e) => {
        e.stopPropagation();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onButtonClick === "function") onButtonClick();
    };

    return <button className='modal-button' onClick={onClick}>{buttonText}</button>;
};

export default OpenModalButton;