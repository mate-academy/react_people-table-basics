import classNames from 'classnames';

import { Person } from '../../types';

import PersonLink from '../PersonLink/PersonLink';

type Props = {
  person: Person;
  personSlug: string;
  motherLink: Person | null;
  fatherLink: Person | null;
};

const PersonInfo: React.FC<Props> = ({
  person,
  personSlug,
  motherLink,
  fatherLink,
}) => (
  <tr
    data-cy="person"
    className={classNames(
      { 'has-background-warning': personSlug === person.slug },
    )}
  >
    <td>
      <PersonLink
        person={person}
        classActive={person.sex === 'f'}
      />
    </td>

    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>
      {motherLink
        ? <PersonLink person={motherLink} classActive />
        : person.motherName || '-'}
    </td>
    <td>
      {fatherLink
        ? <PersonLink person={fatherLink} />
        : person.fatherName || '-'}
    </td>
  </tr>
);

export default PersonInfo;
