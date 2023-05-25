import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const { slug = '' } = useParams();
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;
  const isActive = slug === person.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isActive })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : (motherName || '-')}</td>
      <td>{father ? <PersonLink person={father} /> : (fatherName || '-')}</td>
    </tr>
  );
};
