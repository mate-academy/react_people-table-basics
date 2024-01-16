import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const {
    name,
    sex,
    died,
    born,
    motherName,
    fatherName,
    slug,
  } = person;

  const findMother = people.find(pers => pers.name === motherName);
  const findFather = people.find(pers => pers.name === fatherName);
  const findeSlugFather = people.find(pers => pers.name === fatherName);
  const slugFather = findeSlugFather?.slug;
  const findeSlugMother = people.find(pers => pers.name === motherName);
  const slugMother = findeSlugMother?.slug;

  const { slug: url } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': url === slug,
      })}
    >
      <td>
        <Link
          to={`${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>
      <td>
        {sex}
      </td>
      <td>
        {born}
      </td>
      <td>
        {died}
      </td>
      <td>
        {findMother
          ? (
            <Link
              to={`${slugMother}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          )
          : (motherName || '-')}
      </td>

      <td>
        {findFather
          ? (
            <Link to={`${slugFather}`}>
              {fatherName}
            </Link>
          )
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
