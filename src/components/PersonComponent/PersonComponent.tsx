import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../../types/Person';
import { PersonNavLink } from '../PersonNavLink';

type Props = {
  person: Person,
  isSelected: boolean,
  mother: Person | undefined,
  father: Person | undefined,
};

export const PersonComponent: FC<Props> = ({
  person: {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  },
  isSelected,
  mother,
  father,
}) => (
  <tr
    data-cy="person"
    className={classNames({ 'has-background-warning': isSelected })}
  >
    <td>
      <PersonNavLink
        to={slug}
        text={name}
        sex={sex}
      />
    </td>

    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>
      {mother
        ? (
          <PersonNavLink
            to={mother.slug}
            text={mother.name}
            sex={mother.sex}
          />
        )
        : motherName || '-'}
    </td>
    <td>
      {father
        ? (
          <PersonNavLink
            to={father.slug}
            text={father.name}
            sex={father.sex}
          />
        )
        : fatherName || '-'}
    </td>
  </tr>
);
