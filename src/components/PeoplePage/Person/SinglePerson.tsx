import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../../types';

type Props = {
  person: Person,
  getParentSlug: (parentName: string | null) => string | JSX.Element;
};

const renderRow = (value: string | number | JSX.Element) => (
  <td>{value}</td>
);

export const SinglePerson = ({
  person,
  getParentSlug,
}: Props) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const cleaningHandler = (url: string) => {
    navigate(url, { replace: true });
  };

  // eslint-disable-next-line
  const renderLink = (person: Person) => (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}`}
      onClick={() => cleaningHandler(`/people/${person.slug}`)}
    >
      {person.name}
    </Link>
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      {renderRow(renderLink(person))}
      {renderRow(person.sex)}
      {renderRow(person.born)}
      {renderRow(person.died)}
      {renderRow(getParentSlug(person.motherName))}
      {renderRow(getParentSlug(person.fatherName))}
    </tr>
  );
};
