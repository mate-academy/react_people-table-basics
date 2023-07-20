import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  person: Person;
  searchedPerson: (personName: string | null) => Person | null;
};

export const PersonInfo: FC<Props> = ({ person, searchedPerson }) => {
  const personMother = searchedPerson(person.motherName);
  const personFather = searchedPerson(person.fatherName);

  const { slug } = useParams();

  return (
    <>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': person.slug === slug,
        })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>

        <td>
          {personMother ? (
            <PersonLink person={personMother} />
          ) : (
            person.motherName || '-'
          )}
        </td>

        <td>
          {personFather ? (
            <PersonLink person={personFather} />
          ) : (
            person.fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
