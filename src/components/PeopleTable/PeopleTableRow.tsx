import React, { FC } from 'react';
import { PersonFull } from '../../services/types';

interface Props {
  person: PersonFull;
}

export const PeopleTableRow: FC<Props> = React.memo(({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName}</td>
    <td>{person.fatherName}</td>
  </tr>
));
