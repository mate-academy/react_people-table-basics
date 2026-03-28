import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
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
          const isMotherPresent = !!person.mother;
          const isFatherPresent = !!person.father;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {isMotherPresent ? (
                  <PersonLink person={person.mother!} />
                ) : (
                  <>{person.motherName || '-'}</>
                )}
              </td>
              <td>
                {isFatherPresent ? (
                  <PersonLink person={person.father!} />
                ) : (
                  <>{person.fatherName || '-'}</>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
