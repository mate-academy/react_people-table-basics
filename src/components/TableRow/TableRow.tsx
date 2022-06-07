import React from 'react';
import { Person } from '../../Types/Types';

type Props = {
  person: Person,
};

export const TableRow: React.FC<Props> = React.memo(({ person }) => (
  <>
    <td className="mdc-data-table__cell">{person.name}</td>
    <td className="mdc-data-table__cell">{person.sex}</td>
    <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
      {person.born}
    </td>
    <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
      {person.died}
    </td>
    <td className="mdc-data-table__cell">
      {
        person.fatherName
          ? person.fatherName
          : 'Whoops. Lost father\'s data.'
      }
    </td>
    <td className="mdc-data-table__cell">
      {
        person.motherName
          ? person.motherName
          : 'Whoops. Lost mother\'s data.'
      }
    </td>
    <td className="mdc-data-table__cell">{person.slug}</td>
  </>
));
