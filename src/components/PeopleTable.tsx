import { Person } from '../types';
import { Loader } from './Loader';
import { Error } from './Error';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  error: string,
};

export const PeopleTable: React.FC<Props> = ({ people, error }) => {
  const handleMotherFind = (motherName: string | undefined) => {
    const mother = people.find(person => person.name === motherName)?.slug;

    return mother;
  };

  const handleFatherFind = (fatherName: string | undefined) => {
    const father = people.find(person => person.name === fatherName)?.slug;

    return father;
  };

  return (
    <>
      {people.length === 0
        && <Loader />}

      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">

          <Error error={error} />

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
                <PersonLink
                  person={person}
                  onMotherFind={handleMotherFind}
                  onFatherFind={handleFatherFind}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
