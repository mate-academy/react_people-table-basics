import { Person } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { PersonRow } from '../components/PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: urlSlug } = useParams();
  const navigate = useNavigate();

  const handlePersonClick = (slug: string) => {
    navigate(`/people/${slug}`, { replace: true });
  };

  const columnsName = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnsName.map(columnName => (
            <th key={columnName}>{columnName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
            people={people}
            handlePersonClick={handlePersonClick}
            selectedPerson={urlSlug || null}
          />
        ))}
      </tbody>
    </table>
  );
};
