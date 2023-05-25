import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person,
  selectedPerson: string,
};

export const PersonItem: FC<Props> = (props) => {
  const { person, selectedPerson } = props;

  const getMotherText = () => {
    if (person.motherName) {
      if (person.mother) {
        return (
          <PersonLink person={person.mother} />
        );
      }

      return person.motherName;
    }

    return '-';
  };

  const getFatherText = () => {
    if (person.fatherName) {
      if (person.father) {
        return (
          <PersonLink person={person.father} />
        );
      }

      return person.fatherName;
    }

    return '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{getMotherText()}</td>
      <td>{getFatherText()}</td>
    </tr>
  );
};
