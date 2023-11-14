import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { PeopleContext } from '../../PeopleContext';

interface Props {
  person: Person
}

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const {
    motherName, sex, fatherName, slug,
  } = person;

  const { personSlug } = useParams();
  const { persons } = useContext(PeopleContext);

  const findMother = (nameMother: string): Person | undefined => {
    const mother = persons.find((p) => p.name === nameMother);

    return mother;
  };

  const findFather = (nameFather: string): Person | undefined => {
    const father = persons.find((p) => p.name === nameFather);

    return father;
  };

  const father = findFather(fatherName ?? '');
  const mother = findMother(motherName ?? '');

  const renderContent = () => {
    switch (true) {
      case !!fatherName:
        return (
          father !== undefined
            ? (<PersonLink person={father} />)
            : (fatherName)
        );

      case !!motherName:
        return (
          mother !== undefined
            ? (<PersonLink person={mother} />)
            : (motherName)
        );

      default:
        return '-';
    }
  };

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={cn({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>
        {person.sex}
      </td>

      <td>
        {person.born}
      </td>

      <td>
        {person.died}
      </td>

      <td>
        {renderContent()}
      </td>

      <td>
        {renderContent()}
      </td>
    </tr>
  );
};
