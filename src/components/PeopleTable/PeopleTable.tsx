import { Person } from '../../types';
import { PersonItem } from '../PersonItem';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <>
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
            const fatherLink
              = people.find(el => el.name === person.fatherName)?.slug || null;
            const motherLink
              = people.find(el => el.name === person.motherName)?.slug || null;

            return (
              <PersonItem
                key={person.slug}
                person={person}
                fatherLink={fatherLink}
                motherLink={motherLink}
              />
            );
          })}
        </tbody>
      </table>

      {!people.length && (
        <article className="message is-info">
          <div className="message-header">
            <p>Info</p>
          </div>

          <div className="message-body">
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          </div>
        </article>
      )}
    </>
  );
};
