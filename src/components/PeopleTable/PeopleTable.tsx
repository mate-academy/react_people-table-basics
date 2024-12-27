import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

enum Properties {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
  Mother = 'Mother',
  Father = 'Father',
}

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: prevSlug } = useParams();

  const findMotherAndFather = (nameOfParent: string | null): Person | null => {
    return people.find(({ name }) => name === nameOfParent) || null;
  };

  const selectedPeople = people.map(person => {
    return {
      ...person,
      father: findMotherAndFather(person.fatherName),
      mother: findMotherAndFather(person.motherName),
    };
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(Properties).map(proper => (
            <th key={proper}>{proper}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {selectedPeople.map(person => {
          return (
            <PersonLink
              key={person.slug}
              person={person}
              prevSlug={prevSlug || ''}
            />
          );
        })}
      </tbody>
    </table>
  );
};
