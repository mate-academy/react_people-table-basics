import classNames from 'classnames';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person,
  allPeople: Person[],
}

export const PersonInfo = (props: Props) => {
  const {
    person,
    allPeople,
  } = props;

  const {
    fatherName,
    motherName,
    slug,
    name,
    sex,
    born,
    died,
  } = person;

  const mother = useMemo(() => {
    return allPeople.find(pers => motherName === pers.name);
  }, []);

  const father = useMemo(() => {
    return allPeople.find(pers => fatherName === pers.name);
  }, []);

  const { slug: selectedSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': selectedSlug === slug },
      )}
    >
      <td>
        <a
          href={`#/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </a>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <a
              href={`#/people/${mother.slug}`}
              className="has-text-danger"
            >
              {motherName }
            </a>
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <a
              href={`#/people/${father.slug}`}
              className="has-text-link"
            >
              {fatherName }
            </a>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
