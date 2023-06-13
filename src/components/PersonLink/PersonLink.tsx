import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person | undefined,
  name: string | null,
  sex: string,
  handleSelectedPerson: (person: Person | undefined) => void,
};

export const PersonLink: React.FC<Props> = ({
  person, name, sex, handleSelectedPerson,
}) => {
  return (
    <td>
      <Link
        to={`#/people/${person?.slug}`}
        className={classNames({ 'has-text-danger': sex === 'f' })}
        onClick={() => {
          handleSelectedPerson(person);
        }}
      >
        {name}
      </Link>
    </td>
  );
};
