import React from 'react';

import { Alignment, Button, Direction, PaddingSize, Stack, Text, Box, TextAlignment } from '@kibalabs/ui-react';
import styled from 'styled-components';
import { ISingleAnyChildProps, useEventListener } from '@kibalabs/core-react';

export interface IMessageDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmButtonText?: string;
  onConfirmClicked: () => void;
  onCloseClicked: () => void;
}

export const MessageDialog = (props: IMessageDialogProps): React.ReactElement => {

  const confirmButtonText = props.confirmButtonText || 'Confirm';

  return (
    <Modal isOpen={props.isOpen} onCloseClicked={props.onCloseClicked}>
      <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
        <Text variant='header3' alignment={TextAlignment.Center}>{props.title}</Text>
        <Text alignment={TextAlignment.Center}>{props.message}</Text>
        <Stack.Item gutterBefore={PaddingSize.Default}>
          <Stack direction={Direction.Horizontal} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Button variant='secondary' onClicked={props.onCloseClicked} text='Cancel' />
            <Button variant='primary' onClicked={props.onConfirmClicked} text={confirmButtonText} />
            <Stack.Item growthFactor={1} shrinkFactor={1} />
          </Stack>
        </Stack.Item>
      </Stack>
    </Modal>
  );
};

MessageDialog.defaultProps = {
};

interface IModalProps extends ISingleAnyChildProps {
  isOpen: boolean;
  onCloseClicked: () => void;
}

const StyledBackdrop = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
`;

const Modal = (props: IModalProps): React.ReactElement | null => {
  const modalRef = React.useRef();

  const onBackdropClicked = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      props.onCloseClicked();
    }
  };

  useEventListener(document, 'keydown', (event: Event): void => {
    // NOTE(krishan711): this doesn't pass the dependencies in as it should
    if (props.isOpen && event.key === 'Escape') {
      props.onCloseClicked();
    }
  });

  return props.isOpen ? (
    <StyledBackdrop id='backdrop' ref={modalRef} onClick={onBackdropClicked}>
      <Box variant='card' maxWidth='30%' maxHeight='70%'>
        {props.children}
      </Box>
    </StyledBackdrop>
  ) : null;
};
