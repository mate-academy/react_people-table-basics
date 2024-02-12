import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PeopleList } from '../../PeopleContext';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { peopleList } = useContext(PeopleList);
  const { slug } = useParams();

  const mother = peopleList.find(m => m.name === person.motherName);
  const father = peopleList.find(f => f.name === person.fatherName);
  // const selectedPerson = person.slug === slug;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <a
          href={`#/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <a
            className="has-text-danger"
            href={`#/people/${mother?.slug}`}
          >
            {person.motherName}
          </a>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <a
            href={`#/people/${father?.slug}`}
          >
            {person.fatherName}
          </a>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
