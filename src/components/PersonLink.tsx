import { Person } from '../types';
import classNames from 'classnames';
import { CustomLink } from './CustomLink';
import { SexType } from '../types/SexType';

type Props = {
  person: Person;
  selectedPerson: string;
};

export const EMPTY = '-';

export const PersonLink: React.FC<Props> = ({ person, selectedPerson }) => {
  const {
    name,
    sex,
    slug,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      key={name}
      className={classNames({
        'has-background-warning': slug === selectedPerson,
      })}
    >
      <td>{<CustomLink name={name} slug={slug} sex={sex} />}</td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherName ? (
          <CustomLink
            name={motherName}
            sex={SexType.female}
            slug={mother?.slug}
          />
        ) : (
          <span>{EMPTY}</span>
        )}
      </td>

      <td>
        {fatherName ? (
          <CustomLink
            name={fatherName}
            sex={SexType.male}
            slug={father?.slug}
          />
        ) : (
          <span>{EMPTY}</span>
        )}
      </td>
    </tr>
  );
};
