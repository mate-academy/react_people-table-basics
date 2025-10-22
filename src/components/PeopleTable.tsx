import { Person } from '../types';
import { PersonLink } from './PersonalLink';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  resolveRelative: (name: string) => Person | null;
};

export const PeopleTable = ({
  people,
  selectedSlug,
  onSelect,
  resolveRelative,
}: Props) => {
  return (
    <tbody>
      {people.map(p => (
        <tr
          key={p.slug}
          data-cy="person"
          className={p.slug === selectedSlug ? 'has-background-warning' : ''}
          onClick={() => onSelect(p.slug)}
          style={{ cursor: 'pointer' }}
        >
          <td>
            <PersonLink name={p.name} resolve={resolveRelative} />
          </td>
          <td>{p.sex}</td>
          <td>{p.born}</td>
          <td>{p.died}</td>
          <td>
            <PersonLink name={p.motherName} resolve={resolveRelative} />
          </td>
          <td>
            <PersonLink name={p.fatherName} resolve={resolveRelative} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
