import React, { useContext } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PeopleContext } from '../../PeopleContext';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC = () => {
  const { peopleList } = useContext(PeopleContext);

  const { peopleSlug } = useParams();
  const selectedPerson = peopleSlug;

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
        {peopleList.map(person => {
          const personMother = peopleList
            .find(mother => mother.name === person.motherName);
          const personFather = peopleList
            .find(father => father.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': selectedPerson === person.slug,
              })}
            >
              <td><PersonLink person={person} /></td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {personMother ? (
                  <PersonLink person={personMother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {personFather ? (
                  <PersonLink person={personFather} />
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
