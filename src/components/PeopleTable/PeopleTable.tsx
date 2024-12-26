import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PERSON_TABLE_COLUMNS } from '../../constants/constants';
import { PersonItem } from '../PersonItem/PersonItem';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;

  const { slug: currentSlug } = useParams();

  const findParent = (parentName: string | null): Person | null => {
    return people.find(person => person.name === parentName) || null;
  };

  const preparedPeople = people.map(person => {
    return {
      ...person,
      mother: findParent(person.motherName),
      father: findParent(person.fatherName),
    };
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {PERSON_TABLE_COLUMNS.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => {
          return (
            <PersonItem
              key={person.slug}
              person={person}
              currentSlug={currentSlug || ''}
            />
          );
        })}
      </tbody>
    </table>
  );
};
