import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const createPersonId = (name: string, born: number) => {
    const lowerRegister = name[0].toLowerCase() + name.slice(1);

    return (`${lowerRegister} ${born}`).split(' ').join('-');
  };

  const { personId } = useParams();

  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const haveMotherFromPeople = () => {
    const findedMother = people.find(per => {
      return per.name === motherName;
    });

    return findedMother;
  };

  const isFindedMother = haveMotherFromPeople();

  const haveFatherFromPeople = () => {
    const findedFather = people.find(per => {
      return per.name === fatherName;
    });

    return findedFather;
  };

  const isFindedFather = haveFatherFromPeople();

  return (
    <tr
      data-cy="person"
      className={personId === createPersonId(name, born)
        ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`/people/${createPersonId(name, born)}`}
          className={sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {isFindedMother ? (
          <Link
            to={`/people/${createPersonId(isFindedMother.name, isFindedMother.born)}`}
            className="has-text-danger"
          >
            {isFindedMother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {isFindedFather ? (
          <Link
            to={`/people/${createPersonId(isFindedFather.name, isFindedFather.born)}`}
          >
            {isFindedFather.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
