import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  people: Person[];
  slug: string | undefined;
};

export const TableItem: React.FC<Props> = ({ person, slug, people }) => {
  return (
    <tr
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
      key={person.slug}
      data-cy="person"
    >
      <td>
        <PersonLink people={people}>{person.name}</PersonLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        <PersonLink people={people}>{person.motherName}</PersonLink>
      </td>
      <td>
        <PersonLink people={people}>{person.fatherName}</PersonLink>
      </td>
    </tr>
  );
};
