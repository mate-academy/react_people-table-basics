import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person[]
};

export const PeopleTable: FC<Props> = ({ person }) => {
  const { slug: selectedSlug } = useParams();

  function findParent(people: Person[], parentName: string | null) {
    const parent = people.find(item => item.name === parentName);

    if (parent) {
      return (
        <Link
          to={`../${parent.slug}`}
          className={classNames({ 'has-text-danger': parent.sex === 'f' })}
        >
          {parent.name}
        </Link>
      );
    }

    return parentName || '-';
  }

  return (
    <>
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
          {person.map((item) => (
            <tr
              data-cy="person"
              className={classNames(
                { 'has-background-warning': item.slug === selectedSlug },
              )}
            >

              <td key={item.slug}>
                <Link
                  to={`/people/${item.slug}`}
                  className={
                    classNames({ 'has-text-danger': item.sex === 'f' })
                  }
                >
                  {item.name}
                </Link>
              </td>

              <td>{item.sex}</td>
              <td>{item.born}</td>
              <td>{item.died}</td>

              <td>{findParent(person, item.motherName)}</td>
              <td>{findParent(person, item.fatherName)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
