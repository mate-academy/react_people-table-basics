import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { urlSlug } = useParams();
  const {
    name, sex, born, died, fatherName, motherName, slug,
  } = person;

  function getMother() {
    if (motherName) {
      return (
        people.some(p => p.name === motherName)
          ? (
            <a
              className="has-text-danger"
              href={`#/people/${people.find(p => p.name === motherName)?.slug}`}
            >
              {motherName}
            </a>
          )
          : motherName
      );
    }

    return '-';
  }

  function getFather() {
    if (fatherName) {
      return (
        people.some(p => p.name === fatherName)
          ? (
            <a href={`#/people/${people.find(p => p.name === fatherName)?.slug}`}>
              {fatherName}
            </a>
          )
          : fatherName
      );
    }

    return '-';
  }

  return (
    <tr
      className={
        cn({ 'has-background-warning': slug === urlSlug })
      }
      data-cy="person"
    >
      <td>
        <a
          className={
            cn({ 'has-text-danger': sex === 'f' })
          }
          href={`#/people/${slug}`}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{getMother()}</td>
      <td>{getFather()}</td>
    </tr>
  );
};
