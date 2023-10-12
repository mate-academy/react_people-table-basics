/* eslint-disable max-len */
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();

  const selectedLocation = location.hash.split('/').pop();

  return (
    people.map((person) => (
      <tr
        className={cn('', { 'has-background-warning': selectedLocation === person.slug })}
        data-cy="person"
        key={person.slug}
      >
        <PersonLink
          text={person.name}
          redColorCondition={person.sex === 'f'}
          to={`#/${person.slug}`}
        />

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>

        {people.some(p => p.name === person.motherName) ? (
          <PersonLink
            text={person.motherName}
            redColorCondition={people.some(p => p.name === person.motherName)}
            to={`#/${people.find(p => p.name === person.motherName)?.slug}`}

          />
        ) : (
          <td>
            {person.motherName}
          </td>
        )}

        {people.some(p => p.name === person.fatherName) ? (
          <PersonLink
            text={person.fatherName}
            redColorCondition={false}
            to={`#/${people.find(p => p.name === person.motherName)?.slug}`}
          />
        ) : (
          <td>
            {person.fatherName}
          </td>
        )}
      </tr>
    ))
  );
};
