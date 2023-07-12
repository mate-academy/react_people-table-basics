import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

interface PeopleTableBodyProps {
  people: Person [],
}

const createLink = (name: string, born: number) => {
  return `${name.toLowerCase().replaceAll(' ', '-')}-${born}`;
};

export const PeopleTableBody
: FC<PeopleTableBodyProps> = ({ people }) => {
  const { personInfo } = useParams();

  const selectedPerson = useMemo(() => people
    .find(person => {
      const preparedPersonInfo = createLink(person.name, person.born);

      return personInfo?.includes(preparedPersonInfo);
    }), [personInfo]);

  return (
    <tbody>
      {people.map(person => {
        const isSelectedPerson = selectedPerson?.slug
          .includes(person.slug);

        const motherInfo = people
          .find(p => person.motherName?.includes(p.name));

        const fatherInfo = people
          .find(p => person.fatherName?.includes(p.name));

        return (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': isSelectedPerson,
            })}
          >
            <td>
              <Link
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
                to={`/people/${createLink(person.name, person.born)}`}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              { motherInfo && (
                <Link
                  to={`/people/${createLink(motherInfo.name, motherInfo.born)}`}
                  className={classNames({
                    'has-text-danger': motherInfo,
                  })}
                >
                  {person.motherName}
                </Link>
              )}
              {person.motherName && !motherInfo && (
                <>{person.motherName}</>)}
              {!person.motherName && '-'}
            </td>
            <td>
              { fatherInfo && (
                <Link
                  to={`/people/${createLink(fatherInfo.name, fatherInfo.born)}`}
                >
                  {person.fatherName}
                </Link>
              )}
              {person.fatherName && !fatherInfo && (
                <>{person.fatherName}</>)}
              {!person.fatherName && '-'}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
