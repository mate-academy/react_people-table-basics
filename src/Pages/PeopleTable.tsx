import { useMemo } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ person, people }) => {
  const mother = useMemo(() => {
    return people.find(a => a.name === person.motherName);
  }, []);

  const father = useMemo(() => {
    return people.find(a => a.name === person.fatherName);
  }, []);

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === person.slug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother !== undefined ? (<PersonLink person={mother} />)
          : person.motherName || '-'}
      </td>

      <td>
        {father !== undefined ? (<PersonLink person={father} />)
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
