import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person;
  motherInList: Person | null;
  fatherInList: Person | null;
};

export const PersonRow: React.FC<Props> = ({
  person,
  motherInList,
  fatherInList,
}) => {
  const { slug: currentSlug } = useParams();
  const {
    sex,
    born,
    died,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === currentSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherInList ? (
          <PersonLink person={motherInList} />
        ) : '-'}
      </td>

      <td>
        {fatherInList ? (
          <PersonLink person={fatherInList} />
        ) : '-'}
      </td>
    </tr>
  );
};
