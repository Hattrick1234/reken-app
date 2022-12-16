import { Fragment } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

const slideDown = () => keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

//const Backdrop: React.FC<{ onClose?: () => void }> = (props) => {
const Backdrop = (props: { onClose?: () => void }) => {
  return <StyledBackdrop onClick={props.onClose} />;
};

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 15vh;
  left: 5%;
  width: 90%;
  background-color: ${process.env.REACT_APP_BACKGROUND_COLOR_MAIN_APP};

  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: ${slideDown} 300ms ease-out forwards;

  max-height: 75vh;
  overflow-y: auto; //toont scrollbar indien overflowt

  max-width: 70vw;
  overflow-x: auto; //toont scrollbar indien overflowt

  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }
`;

const ModalOverlay = (props: { children?: JSX.Element }) => {
  return (
    <StyledModalOverlay>
      <div>{props.children}</div>
    </StyledModalOverlay>
  );
};

const portalElement = document.getElementById("overlays")!;

interface PropsModal {
  onClose?: () => void;
  children?: JSX.Element;
}

const Modal = (props: PropsModal) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
