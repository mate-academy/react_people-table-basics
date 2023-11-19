import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
}

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const personParent = (personName: string | null) => {
    return people.find(person => person.name === personName) || null;
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({ 'has-background-warning': person.slug === slug })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {
                personParent(person.motherName)
                  ? (<PersonLink person={personParent(person.motherName)} />)
                  : (person.motherName || '-')
              }
            </td>
            <td>
              {
                personParent(person.fatherName)
                  ? (<PersonLink person={personParent(person.fatherName)} />)
                  : (person.fatherName || '-')
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
