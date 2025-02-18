import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  findParentPerson: (parentName: string) => Person | undefined;
};

const getLinkClass = (person: Person) =>
  classNames({ 'has-text-danger': person.sex === 'f' });

export const PersonLink: React.FC<Props> = ({ person, findParentPerson }) => {
  const { slug } = useParams();

  const renderParentLink = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = findParentPerson(parentName);

    if (!parent) {
      return parentName;
    }

    return (
      <Link className={getLinkClass(parent)} to={`/people/${parent.slug}`}>
        {parent.name}
      </Link>
    );
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link className={getLinkClass(person)} to={`/people/${person.slug}`}>
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderParentLink(person.motherName)}</td>
      <td>{renderParentLink(person.fatherName)}</td>
    </tr>
  );
};
