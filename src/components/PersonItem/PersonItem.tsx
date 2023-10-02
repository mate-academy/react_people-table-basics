import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { NO_PARENT } from '../../utils/variables';

type Props = {
  person: Person,
  personMother?: Person,
  personFather?: Person,
};

export const PersonItem = ({
  person,
  personMother,
  personFather,
}: Props) => {
  const {
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const { slug: slugFromParams } = useParams();

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': slugFromParams === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {personMother
          ? <PersonLink person={personMother} />
          : motherName ?? NO_PARENT}
      </td>
      <td>
        {personFather
          ? <PersonLink person={personFather} />
          : fatherName ?? NO_PARENT}
      </td>
    </tr>
  );
};
