import classNames from 'classnames';
import { Person } from '../../types';
import { PeopleLink } from './PeopleLink';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      // eslint-disable-next-line max-len
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PeopleLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <>
              {person.motherName ? (
                <>
                  {person.mother ? (
                    <td>
                      <PeopleLink person={person.mother} />
                    </td>
                  ) : (
                    <td>{person.motherName}</td>
                  )}
                </>
              ) : (
                <td>-</td>
              )}
            </>

            <>
              {person.fatherName ? (
                <>
                  {person.father ? (
                    <td>
                      <PeopleLink person={person.father} />
                    </td>
                  ) : (
                    <td>{person.fatherName}</td>
                  )}
                </>
              ) : (
                <td>-</td>
              )}
            </>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
