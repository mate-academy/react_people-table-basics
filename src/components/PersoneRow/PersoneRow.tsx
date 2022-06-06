import React from 'react';
// mui
// import { Button } from '@mui/material';
// types
import { NewPersone } from '../../types';
// components
// import PersonInfoModal from './PersonInfo.modal';

type Props = {
  persone: NewPersone,
};

const PersoneRow: React.FC<Props> = ({ persone }) => {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <>
      {/* <PersonInfoModal persone={persone} open={open} onClose={handleClose} /> */}
      <tr>
        <td>{persone.name}</td>
        <td>{persone.sex === 'm' ? 'male' : 'female'}</td>
        <td>{persone.born}</td>
        <td>{persone.died}</td>
        <td>{persone.motherName || 'not found'}</td>
        <td>{persone.fatherName || 'not found'}</td>
        {/* <td><Button onClick={handleOpen}>Open info</Button></td> */}
      </tr>
    </>
  );
};

export default PersoneRow;
