import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../../types';
import { getFatherPerson, getMotherPerson } from '../../utils/utils';
import { PersonLink } from '../PersonLink';
import { tableColumnNames } from '../../utils/constants';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumnNames.map(name => <th key={name}>{name}</th>)}
        </tr>
      </thead>

      <tbody>
        {people?.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classnames({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {getMotherPerson(people, motherName)}
              </td>
              <td>
                {getFatherPerson(people, fatherName)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
