import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

const getParentPerson = (people: Person[], parentName: string | null) => {
  return people.find(({ name }) => name === parentName);
};

const getParentContent = (
  parentName: string | null,
  parent: Person | undefined,
) => {
  if (!parentName) {
    return '-';
  }

  if (parent) {
    return <PersonLink person={parent} />;
  }

  return parentName;
};

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();

  return (
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
            {people.map(person => {
              const personMother = getParentPerson(people, person.motherName);
              const personFather = getParentPerson(people, person.fatherName);

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={
                    selectedSlug === person.slug ? 'has-background-warning' : ''
                  }
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{getParentContent(person.motherName, personMother)}</td>
                  <td>{getParentContent(person.fatherName, personFather)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
