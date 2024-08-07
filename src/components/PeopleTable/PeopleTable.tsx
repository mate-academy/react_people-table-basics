import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { PeopleTableLink } from '../PeopleTableLink';

type Props = {
  people: Person[];
};

const COLUMN_NAMES = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
const NO_PARENT_PLACEHOLDER = '-';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedSlug = slug;

  const getParent = (parentName: string | null) => {
    if (!parentName) {
      return NO_PARENT_PLACEHOLDER;
    }

    const parent = people.find(person => person.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMN_NAMES.map(name => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PeopleTableLink
            key={person.slug}
            person={person}
            selectedSlug={selectedSlug}
            getParent={getParent}
          />
        ))}
      </tbody>
    </table>
  );
};
