/* eslint-disable max-len */
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersonLink';

type Props = {
  people: Person[],
  onError: boolean,
};

const PeopleTable: React.FC<Props> = ({
  people,
  onError,
}) => {
  const { slug } = useParams();

  return (
    <>
      {!onError && (
        people.length > 0
          ? (
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
                {people.map(person => (
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
                      {person.mother
                        ? (
                          <PersonLink person={person.mother} />
                        )
                        : (person.motherName || '-')}
                    </td>

                    <td>
                      {person.father
                        ? (
                          <PersonLink person={person.father} />
                        )
                        : (person.fatherName || '-')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          : (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )
      )}
    </>
  );
};

export default PeopleTable;
