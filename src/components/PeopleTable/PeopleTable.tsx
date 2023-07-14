import {
  FC,
} from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { ParentInfo } from './ParentInfo';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { theadItems } from '../../utils/data';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {theadItems.map(({ id, title }) => <th key={id}>{title}</th>)}
        </tr>
      </thead>

      <tbody>
        {people.map(({
          slug,
          name,
          sex,
          born,
          died,
          fatherName = null,
          motherName = null,
          father,
          mother,
        }) => (
          <tr
            data-cy="person"
            key={slug}
            className={classNames({
              'has-background-warning': slug === personSlug,
            })}
          >
            <td>
              <PersonLink to={`/people/${slug}`} name={name} sex={sex} />
            </td>
            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              <ParentInfo parent={mother} name={motherName} />
            </td>
            <td>
              <ParentInfo parent={father} name={fatherName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
