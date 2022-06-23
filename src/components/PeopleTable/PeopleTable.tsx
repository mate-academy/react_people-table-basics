import { FC } from 'react';
import './PeopleTable.scss';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: PersonWithParents[];
};

export const PeopleTable:FC<Props> = ({ people }) => (
  <>
    <table className="PeopleTable">
      <thead>
        <tr>
          <td className="td_name td_bold">Name</td>
          <td className="td_sex td_bold">Sex</td>
          <td className="td_born td_bold">Born</td>
          <td className="td_died td_bold">Died</td>
          <td className="td_motherName td_bold">Mother</td>
          <td className="td_fatherName td_bold">Father</td>
        </tr>
      </thead>
      <tbody>
        {
          people.map(person => {
            return (
              <PersonRow
                key={person.name}
                person={person}
              />
            );
          })
        }
      </tbody>
    </table>
  </>
);
