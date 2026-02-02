import { Person } from '../types';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  allPeople: Person[];
};

export const PersonData: React.FC<Props> = ({ allPeople }) => {
  const { slug } = useParams();

  return (
    <tbody>
      {allPeople.map(person => {
        const father = allPeople.find(m => m.name === person.fatherName);
        const mother = allPeople.find(f => f.name === person.motherName);

        return (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
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
