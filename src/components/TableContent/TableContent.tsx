/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person,
  people: Person[],
}

export const TableContent: React.FC<Props> = ({ person, people }) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const { slug: currentSlug } = useParams();
  const mother = people.find(({ name }) => name === motherName);
  const father = people.find(({ name }) => name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': currentSlug === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {!mother ? (
          motherName || '-'
        ) : (
          <PersonLink person={mother} />
        )}
      </td>

      <td>
        {!father ? (
          fatherName || '-'
        ) : (
          <PersonLink person={father} />
        )}
      </td>
    </tr>
  );
};
