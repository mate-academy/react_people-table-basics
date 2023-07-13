import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { selectedSlug = '' } = useParams();
  const tableHeader = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeader.map(name => <th>{name}</th>)}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const personMother
          = people.find(mother => mother.name === person.motherName);
          const personFather
          = people.find(father => father.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': selectedSlug === person.slug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {personMother ? (
                  <PersonLink
                    person={personMother}
                  />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {personFather ? (
                  <PersonLink
                    person={personFather}
                  />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
