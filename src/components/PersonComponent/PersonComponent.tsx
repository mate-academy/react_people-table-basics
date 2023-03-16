import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonNavigation } from '../PersonNavigation';

type Props = {
  person: Person;
  isSelected: boolean;
  mother: Person | undefined;
  father: Person | undefined;
};

export const PersonComponent: FC<Props> = ({
  person: {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
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
      <PersonNavigation
        to={slug}
        name={name}
        sex={sex}
      />
    </td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>
      {mother
        ? (
          <PersonNavigation
            to={mother.slug}
            name={mother.name}
            sex={mother.sex}
          />
        ) : (
          motherName || '-'
        )}
    </td>

    <td>
      {father
        ? (
          <PersonNavigation
            to={father.slug}
            name={father.name}
            sex={father.sex}
          />
        ) : (
          fatherName || '-'
        )}
    </td>
  </tr>
);
