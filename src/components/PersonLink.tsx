import { FC, Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  isSelected: boolean,
  setSelectedSlug: Dispatch<SetStateAction<string>>,
};

export const PersonItem: FC<Props> = ({
  person,
  isSelected,
  setSelectedSlug,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    mother,
    fatherName,
    father,
    slug,
  } = person;

  const parent = (
    parentName: string | null,
    parentLink: Person | null = null,
  ) => {
    switch (true) {
      case !!parentLink:
        return (
          <Link
            to={`#/people/${parentLink?.slug}`}
            className={cn({ 'has-text-danger': parentLink?.sex === 'f' })}
            onClick={() => setSelectedSlug(`${parentLink?.slug}`)}
          >
            {parentLink?.name}
          </Link>
        );
      case !!parentName:
        return (
          parentName
        );
      default:
        return '-';
    }
  };

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <Link
          to={`#/people/${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
          onClick={() => setSelectedSlug(slug)}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {parent(motherName, mother)}
      </td>
      <td>
        {parent(fatherName, father)}
      </td>
    </tr>
  );
};
