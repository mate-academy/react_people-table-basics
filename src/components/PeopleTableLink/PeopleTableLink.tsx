import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  selectedSlug: string | undefined;
  getParent: (parentName: string | null) => JSX.Element | string;
};

export const PeopleTableLink: React.FC<Props> = ({
  person,
  selectedSlug,
  getParent,
}) => {
  const { slug, sex, born, died, fatherName, motherName } = person;

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': selectedSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{getParent(motherName)}</td>
      <td>{getParent(fatherName)}</td>
    </tr>
  );
};
