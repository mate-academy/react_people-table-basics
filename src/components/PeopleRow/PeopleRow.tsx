import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { PeopleLink } from '../PeopleLink/PeopleLink';

const NO_PARENTS = '-';

interface Props {
  person: Person;
}

export const PeopleRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { sex, born, died, fatherName, motherName, mother, father } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <PeopleLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? <PeopleLink person={mother} /> : motherName || NO_PARENTS}
      </td>
      <td>
        {father ? <PeopleLink person={father} /> : fatherName || NO_PARENTS}
      </td>
    </tr>
  );
};
