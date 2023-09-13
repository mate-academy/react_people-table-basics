import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            sex, born, died, motherName, fatherName,
          } = person;
          const mother = motherName
            ? people.find(mam => mam.name === motherName) : undefined;
          const father = fatherName
            ? people.find(dad => dad.name === fatherName) : undefined;

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonLink person={mother} />
                  )
                  : motherName || (<span> - </span>)}
              </td>
              <td>
                {father
                  ? (
                    <PersonLink person={father} />
                  )
                  : fatherName || (<span> - </span>)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
