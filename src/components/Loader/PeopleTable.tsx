// components/PeopleTable.tsx
import { useLocation } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from './PersonalLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();

  const findPerson = (name: string | null | undefined) =>
    people.find(person => person.name === name);

  return (
    <tbody>
      {people.map(person => {
        const isSelected = location.pathname === `/people/${person.slug}`;
        const mother = findPerson(person.motherName);
        const father = findPerson(person.fatherName);

        return (
          <tr
            data-cy="person"
            key={person.slug}
            className={isSelected ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {mother ? (
                <PersonLink person={mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {father ? (
                <PersonLink person={father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
