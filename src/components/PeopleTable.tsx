import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const peopleNames = people.map(({ name }) => name);
  const { personSlug } = useParams();
  const selectedPersonSlug = personSlug;

  const findPersonByName = (personName: string) => {
    return people.find(({ name }) => name === personName);
  };

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
              key={slug}
              className={classNames({
                'has-background-warning': selectedPersonSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {motherName && peopleNames.includes(motherName)
                  ? (
                    <PersonLink person={
                      findPersonByName(motherName) as Person
                    }
                    />
                  ) : (
                    motherName || '-'
                  )}
              </td>

              <td>
                {fatherName && peopleNames.includes(fatherName)
                  ? (
                    <PersonLink person={
                      findPersonByName(fatherName) as Person
                    }
                    />
                  ) : (
                    fatherName || '-'
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

  );
};
