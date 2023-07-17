import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { NO_VALUE } from '../../helpers/constants';
import { findPerson } from '../../helpers/helperFunctions';

type Props = {
  people: Person[],
};

export const PeopleList: FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
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
              <td>
                {motherName
                  ? findPerson(motherName, people)
                  : NO_VALUE}
              </td>
              <td>
                {fatherName
                  ? findPerson(fatherName, people)
                  : NO_VALUE}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
