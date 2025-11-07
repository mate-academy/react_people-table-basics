import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  peoplesFromServer: Person[];
  selectedSlug?: string;
};
export const PeopleTable: React.FC<Props> = ({
  peoplesFromServer,
  selectedSlug,
}) => {
  return (
    // <p data-cy="noPeopleMessage">There are no people on the server</p>
    <div className="block">
      <div className="box table-container">
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
            {peoplesFromServer.map(person => {
              const mother = peoplesFromServer.find(
                people => people.name === person.motherName,
              );
              const father = peoplesFromServer.find(
                people => people.name === person.fatherName,
              );

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames({
                    'has-background-warning': person.slug === selectedSlug,
                  })}
                >
                  <td>
                    <PersonLink person={person} name={person.name} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    <PersonLink
                      person={mother ?? null}
                      name={person.motherName}
                    />
                  </td>

                  <td>
                    <PersonLink
                      person={father ?? null}
                      name={person.fatherName}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
