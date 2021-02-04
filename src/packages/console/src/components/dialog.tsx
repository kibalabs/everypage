import React from 'react';

import { ISingleAnyChildProps, useEventListener } from '@kibalabs/core-react';
import { Box } from '@kibalabs/ui-react';
import styled from 'styled-components';

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

interface IDialogProps extends ISingleAnyChildProps {
  isOpen: boolean;
  onCloseClicked: () => void;
  maxWidth?: string;
}

export const Dialog = (props: IDialogProps): React.ReactElement | null => {
  const dialogRef = React.useRef();

  const onBackdropClicked = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if (event.target === dialogRef.current) {
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
    <StyledBackdrop id='backdrop' ref={dialogRef} onClick={onBackdropClicked}>
      <Box variant='card' width='90%' maxWidth={props.maxWidth ||'400px'} maxHeight='90%' isScrollableVertically={true} isScrollableHorizontally={true}>
        {props.children}
      </Box>
    </StyledBackdrop>
  ) : null;
};
