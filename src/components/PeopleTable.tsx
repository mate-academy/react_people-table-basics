import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findPersonByName = (name: string | null): Person | undefined => {
    if (!name) {
return undefined;
}

    return people.find(pers => pers.name === name);
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
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!person.motherName && <span>-</span>}

                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  <span>{person.motherName}</span>
                )}
              </td>
              <td>
                {!person.fatherName && <span>-</span>}

                {father ? (
                  <PersonLink person={father} />
                ) : (
                  <span>{person.fatherName}</span>
                )}
              </td>
            </tr>
          )
          })
        }
      </tbody>
    </table>
  );
};
