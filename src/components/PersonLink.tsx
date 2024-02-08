import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  personSlug?: string;
  selectedPerson: boolean;
  selectedMother: boolean;
  selectedFather: boolean;
};

export const PersonLink: React.FC<Props> = ({
  person,
  personSlug,
  selectedPerson,
  selectedMother, // Додано параметр selectedMother
  selectedFather, // Додано параметр selectedFather
}) => {
  const isFemale = person.sex === 'f' ? 'has-text-danger' : undefined;
  const selectPerson = selectedPerson ? 'has-background-warning' : undefined;
  const selectMother = selectedMother ? 'has-background-warning' : undefined;
  const selectFather = selectedFather ? 'has-background-warning' : undefined;

  return (
    <tr
      data-cy="person"
      className={cn(selectPerson, selectMother, selectFather)}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={isFemale}
          key={personSlug}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          <Link
            to={`/${person.motherName}`}
            className={isFemale}
            key={personSlug}
          >
            {person.motherName}
          </Link>
        ) : (<>{person.motherName || '-'}</>)}
      </td>
      <td>
        {person.fatherName ? (
          <Link
            to={`/${person.fatherName}`}
            className={isFemale}
            key={personSlug}
          >
            {person.fatherName}
          </Link>
        ) : (<>{person.fatherName || '-'}</>)}
      </td>
    </tr>
  );
};
