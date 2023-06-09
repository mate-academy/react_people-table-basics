import classNames from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person,
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <>
      <td>
        <a
          href={`#/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {motherName ? <td>{motherName}</td> : <td>-</td>}
      {fatherName ? <td>{fatherName}</td> : <td>-</td>}
    </>
  );
};
