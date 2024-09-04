import { useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findParent = (parentName: string | null) => {
    return people.find(person => person.name === parentName);
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
          const mother = findParent(person.motherName);
          const father = findParent(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <PersonLink person={person} />

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {mother ? (
                <PersonLink person={mother} />
              ) : (
                <td>{person.motherName || '-'}</td>
              )}
              {father ? (
                <PersonLink person={father} />
              ) : (
                <td>{person.fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
