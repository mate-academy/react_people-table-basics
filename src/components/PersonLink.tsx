import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  personSlug?: string;
  selectedPerson: boolean;
  selectedMother: boolean;
  selectedFather: boolean;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({
  people,
  person,
  personSlug,
  selectedPerson,
  selectedMother,
  selectedFather,
}) => {
  const isFemale = person.sex === 'f' ? 'has-text-danger' : undefined;
  const selectPerson = selectedPerson ? 'has-background-warning' : undefined;
  const selectMother = selectedMother ? 'has-background-warning' : undefined;
  const selectFather = selectedFather ? 'has-background-warning' : undefined;
  const father = people.find(
    dad => dad.name === person.fatherName,
  )?.slug;

  const mother = people.find(
    mom => mom.name === person.motherName,
  )?.slug;

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
            to={`/people/${mother}`}
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
            to={`/people/${father}`}
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
