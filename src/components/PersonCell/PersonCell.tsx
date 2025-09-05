import classNames from 'classnames';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};
export function PersonCell({ person }: Props) {
  const { personId } = useParams();
  const { name, sex, slug } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === personId,
      })}
    >
      <PersonLink person={{ name, sex, slug }} />

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.motherName ? (
        <PersonLink
          person={{
            name: person.motherName,
            sex: 'f',
            slug: person.mother?.slug,
          }}
        />
      ) : (
        <td>-</td>
      )}
      {person.fatherName ? (
        <PersonLink
          person={{
            name: person.fatherName,
            sex: 'm',
            slug: person.father?.slug,
          }}
        />
      ) : (
        <td>-</td>
      )}
    </tr>
  );
}
