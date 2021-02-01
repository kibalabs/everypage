import React from 'react';

import { Alignment, Button, Direction, PaddingSize, Stack, Text } from '@kibalabs/ui-react';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';

export interface IMessageDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirmClicked: () => void;
  onCloseClicked: () => void;
  btnText?: string;
}

export const MessageDialog = (props: IMessageDialogProps): React.ReactElement => {
  return (
    <Modal isOpen={props.isOpen} onCloseClicked={props.onCloseClicked}>
      <React.Fragment>
        <DialogTitle>{props.title}</DialogTitle>
        <Stack direction={Direction.Vertical} paddingHorizontal={PaddingSize.Wide} paddingBottom={PaddingSize.Wide} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
          <Text>{props.message}</Text>
          <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Start} paddingTop={PaddingSize.Default} shouldAddGutters={true} defaultGutter={PaddingSize.Default}>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Button variant='primary' onClicked={props.onConfirmClicked} text={props.btnText} />
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Button variant='secondary' onClicked={props.onCloseClicked} text='Cancel' />
            <Stack.Item growthFactor={1} shrinkFactor={1} />
          </Stack>
        </Stack>
      </React.Fragment>
    </Modal>
  );
};

MessageDialog.defaultProps = {
  btnText: 'Confirm',
};

interface IModalProps {
  isOpen: boolean;
  onCloseClicked: () => void;
  children: React.ReactChild;
}

/* Need help in styling the wrapper to use props (no idea on what should be done) */
const StyledModalWrapper = styled.div`
  min-width: 50px;
  min-height: 100px;
  max-width: 30%;
  max-height: 70%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const StyledBackdrop = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// need to decide a transition to be applied on the modal
const Modal = (props: IModalProps): React.ReactElement => {
  const modalRef = React.useRef();
  const { isOpen, onCloseClicked } = props;
  const onBackdropClicked = (e) => {
    if (modalRef.current === e.target) onCloseClicked();
  };

  const keyPress = React.useCallback(
    (e) => {
      // we can use props to trigger the event on different key
      if (e.key === 'Escape' && isOpen) {
        onCloseClicked();
      }
    },
    [onCloseClicked, isOpen],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {isOpen
      && (
        <StyledBackdrop ref={modalRef} onClick={onBackdropClicked}>
          {/* It is possible to refactor the backdrop to a seperate component so we can use it in other components. */}
          <StyledModalWrapper>
            {/* modalwrapper can also be used to create spectific dialog boxes in ui-react. */}
            {props.children}
          </StyledModalWrapper>
        </StyledBackdrop>
      )}
    </>
  );
};
