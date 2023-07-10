import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  persons: null | Person[],
};

export const PersonList: FC<Props> = ({ persons }) => {
  const { slug } = useParams();

  if (!persons || !persons.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons.map(person => {
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const findPerson = (personName: string) => {
            const foundPerson = persons.find(pers => pers.name === personName);

            if (foundPerson) {
              return (
                <a
                  className={classNames({
                    'has-text-danger': foundPerson.sex === 'f',
                  })}
                  href={`#/people/${foundPerson.slug}`}
                >
                  {foundPerson.name}
                </a>
              );
            }

            return personName;
          };

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <a
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                  href={`#/people/${person.slug}`}
                >
                  {name}
                </a>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{findPerson(motherName || '-')}</td>
              <td>{findPerson(fatherName || '-')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
