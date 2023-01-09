import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from './Loader';

type Prop = {
  people: Person[] | undefined;
  selectedName: string;
};

export const PeopleTable: FC<Prop> = ({ people, selectedName = '' }) => {
  const isSelected = (person: Person) => person.slug === selectedName;

  return (
    <Loader /> && (
      <div className="block">
        <div className="box table-container">
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
              {people?.map((person) => (
                <tr
                  key={person.name}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': isSelected(person),
                  })}
                >
                  <td>
                    <NavLink
                      to={`../${person.slug}`}
                      className={classNames({
                        'has-text-danger': person.sex === 'f',
                      })}
                    >
                      {person.name}
                    </NavLink>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{person.fatherName ? person.fatherName : '-'}</td>
                  <td>{person.motherName ? person.motherName : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};
