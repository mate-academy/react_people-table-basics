import { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';
import { MagicWords, Person } from '../types';

type Props = {
  person: Person;
  getParentLink: (par: string) => Person | undefined;
};

export const PeoplePageContent: FC<Props> = ({ person, getParentLink }) => {
  const generateClassForPerson = () => cn({
    'has-text-danger': person.sex === MagicWords.FEMALE,
  });

  const { slug } = useParams();

  const getParentContent = (parentName: string) => {
    let result;

    if (getParentLink(parentName)) {
      const parent = getParentLink(parentName);

      result = (
        <td>
          <NavLink
            to={`/people/${parent?.slug}`}
            className={cn({
              'has-text-danger': parent?.sex === MagicWords.FEMALE,
            })}
          >
            {parent?.name}
          </NavLink>
        </td>
      );
    }

    if (parentName && !getParentLink(parentName)) {
      result = <td>{parentName}</td>;
    }

    return result;
  };

  const {
    motherName,
    fatherName,
    slug: adress,
    name,
    sex,
    born,
    died,
  } = person;

  const motherContent = motherName
    ? getParentContent(motherName)
    : <td>-</td>;

  const fatherContent = fatherName
    ? getParentContent(fatherName)
    : <td>-</td>;

  return (
    <tr
      data-cy="person"
      className={slug === adress ? 'has-background-warning' : ''}
    >
      <td>
        <NavLink
          className={generateClassForPerson}
          to={`/people/${adress}`}
        >
          {name}
        </NavLink>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {motherContent}
      {fatherContent}
    </tr>
  );
};
