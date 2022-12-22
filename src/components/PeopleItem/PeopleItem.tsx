import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
}

export const PeopleItem: FC<Props> = ({ person }) => {
  const {
    slug, name, sex, born, died, motherName, mother, fatherName, father,
  } = person;

  const { slugParam } = useParams();

  const getParrent = (parentName: string | null, parent?: Person) => {
    if (parent) {
      return (
        <PersonLink
          slug={parent.slug}
          sex={parent.sex}
          name={parent.name}
        />
      );
    }

    return parentName || '-';
  };

  return (
    <tr
      data-cy="person"
      className={slugParam === slug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink slug={slug} sex={sex} name={name} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{getParrent(motherName, mother)}</td>
      <td>{getParrent(fatherName, father)}</td>
    </tr>
  );
};
