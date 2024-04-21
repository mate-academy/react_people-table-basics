import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonItem: React.FC<Props> = ({ people, person }) => {
  const { sex, born, died, fatherName, motherName, slug } = person;
  const { personSlug } = useParams();
  const personMother = people.find(p => p.name === motherName);
  const personFather = people.find(p => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {(!motherName && '-') ||
          (!personMother ? motherName : <PersonLink person={personMother} />)}
      </td>
      <td>
        {(!fatherName && '-') ||
          (!personFather ? fatherName : <PersonLink person={personFather} />)}
      </td>
    </tr>
  );
};
