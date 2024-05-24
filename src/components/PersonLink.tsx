import { FC, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Person } from '../types';

interface Props {
  person: Person;
  people: Person[];
}

const PersonLink: FC<Props> = ({ person: currentPerson, people }) => {
  const { slug } = useParams();

  const findMother = useMemo(
    () => people.find(p => p.name === currentPerson.motherName),
    [currentPerson.motherName, people],
  );
  const findFather = useMemo(
    () => people.find(p => p.name === currentPerson.fatherName),
    [currentPerson.fatherName, people],
  );

  const renderNameWithLinkOrText = (
    name: string,
    person: Person | undefined,
  ) =>
    person ? (
      <Link
        className={person.sex === 'f' ? 'has-text-danger' : ''}
        to={`${person.slug}`}
      >
        {name}
      </Link>
    ) : (
      name
    );

  return (
    <tr
      data-cy="person"
      className={`${slug === currentPerson.slug ? 'has-background-warning' : ''}`}
    >
      <td>{renderNameWithLinkOrText(currentPerson.name, currentPerson)}</td>
      <td>{currentPerson.sex}</td>
      <td>{currentPerson.born}</td>
      <td>{currentPerson.died}</td>
      <td>
        {currentPerson.motherName
          ? renderNameWithLinkOrText(currentPerson.motherName, findMother)
          : '-'}
      </td>
      <td>
        {currentPerson.fatherName
          ? renderNameWithLinkOrText(currentPerson.fatherName, findFather)
          : '-'}
      </td>
    </tr>
  );
};

export default PersonLink;
