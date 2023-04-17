import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug: selectedPersonSlug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Sex
          </th>
          <th>
            Born
          </th>
          <th>
            Died
          </th>
          <th>
            Mother
          </th>
          <th>
            Father
          </th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          const {
            sex,
            born,
            slug,
            died,
            fatherName,
            motherName,
            father,
            mother,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === selectedPersonSlug,
              })}
            >
              <td>
                <PeopleLink person={person} />
              </td>
              <td>
                {sex}
              </td>
              <td>
                {born}
              </td>
              <td>
                {died}
              </td>
              <td>
                {mother ? (
                  <PeopleLink person={mother} />
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PeopleLink person={father} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
