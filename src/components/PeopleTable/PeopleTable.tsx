import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { PeopleTableLink } from '../PeopleTableLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedSlug = slug;

  const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  const getParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
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
          {columnNames.map(name => (
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
