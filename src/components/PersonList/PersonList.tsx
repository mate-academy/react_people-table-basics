import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { NO_VALUE } from '../../helpers/constants';
import { findPerson } from '../../helpers/helperFunctions';

type Props = {
  persons: null | Person[],
};

export const PersonList: FC<Props> = ({ persons }) => {
  const { slug } = useParams();

  const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  if (persons?.length === 0) {
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
          {tableHeaders.map(header => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {persons?.map(person => {
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink
                  slug={person.slug}
                  sex={sex}
                  title={name}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{findPerson(motherName || NO_VALUE, persons)}</td>
              <td>{findPerson(fatherName || NO_VALUE, persons)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
