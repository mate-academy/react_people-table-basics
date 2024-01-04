import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[]
};

const getLink = (person?: Person, name?: string | null) => {
  return (person && <PersonLink person={person} />) || name || '-';
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug } = useParams();

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
        {people.map((person) => {
          const {
            born, died, sex, father, mother, fatherName, motherName,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td aria-label="Name">
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getLink(mother, motherName)}</td>
              <td>{getLink(father, fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
