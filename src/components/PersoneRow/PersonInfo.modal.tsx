import React from 'react';
// mui
import { Box, Modal, Typography } from '@mui/material';
// types
import { NewPersone } from '../../types';
// components
import { StylePersoneRow } from './PersoneRowStyle';

type Props = {
  persone: NewPersone,
  open: boolean,
  onClose: () => void,
};

const PersonInfoModal:React.FC<Props> = ({ persone, open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={StylePersoneRow}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`Info about user: ${persone.name}`}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          {`Name: ${persone.name}`}
          <br />
          {`Sex: ${persone.sex}`}
          <br />
          {`Born: ${persone.born}`}
          <br />
          {`Died: ${persone.died}`}
          <br />
        </Typography>

        {persone.mother && (
          <Typography sx={{ ml: 3, mb: 2 }}>
            {'Mather info: '}
            <br />
            {`Name : ${persone.mother.name}`}
            <br />
            {`Born : ${persone.mother.born}`}
            <br />
            {`Dead : ${persone.mother.died}`}
          </Typography>
        )}

        {persone.father && (
          <Typography sx={{ ml: 3 }}>
            {'Father info: '}
            <br />
            {`Name : ${persone.father.name}`}
            <br />
            {`Born : ${persone.father.born}`}
            <br />
            {`Dead : ${persone.father.died}`}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default PersonInfoModal;
