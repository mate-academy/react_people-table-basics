import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import { usePeople } from '../context/PeopleContext';
import cn from 'classnames';

const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC = () => {
  const { people } = usePeople();
  const { path } = useParams();

  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(per => per.name === person.motherName),
    father: people.find(per => per.name === person.fatherName),
  }));

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {columns.map(name => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {preparedPeople.map(person => {
              const {
                sex,
                born,
                died,
                fatherName,
                motherName,
                slug,
                mother,
                father,
              } = person;

              const noParents = '-';
              const isClickedPerson = path === slug;

              return (
                <tr
                  data-cy="person"
                  key={slug}
                  className={cn({
                    'has-background-warning': isClickedPerson,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>
                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother && <PersonLink person={mother} />}
                    {!mother && (motherName || noParents)}
                  </td>
                  <td>
                    {father && <PersonLink person={father} />}
                    {!father && (fatherName || noParents)}
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
