import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  error: boolean;
};

export const PeopleTable: React.FC<Props> = ({ people, error }) => {
  const { slug: selectedSlug } = useParams();

  return (
    <>
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
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

          {people.map(person => {
            const {
              sex,
              born,
              died,
              motherName,
              fatherName,
              slug,
            } = person;

            const mother = people.find(pepl => pepl.name === motherName);
            const father = people.find(pepl => pepl.name === fatherName);

            return (
              <tbody key={slug}>
                <tr
                  data-cy="person"
                  className={classNames('has-background', {
                    'has-background-warning': selectedSlug === slug,
                  })}
                >
                  <td><PersonLink person={person} /></td>
                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother
                      ? <PersonLink person={mother} />
                      : motherName || '-'}
                  </td>
                  <td>
                    {father
                      ? <PersonLink person={father} />
                      : fatherName || '-'}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
    </>
  );
};
