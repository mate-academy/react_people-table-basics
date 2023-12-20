import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const mother = (name: string | null, woman?: boolean) => {
    if (name) {
      return (
        people.some(p => p.name === name)
          ? (
            <a
              className={
                cn({ 'has-text-danger': woman })
              }
              href={`#/people/${people.find(p => p.name === name)?.slug}`}
            >
              {name}
            </a>
          )
          : name
      );
    }

    return '-';
  };

  return (
    <tr
      className={
        cn({ 'has-background-warning': person.slug === slug })
      }
      data-cy="person"
    >
      <td>
        <a
          className={
            cn({ 'has-text-danger': person.sex === 'f' })
          }
          href={`#/people/${person.slug}`}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{mother(person.motherName, true)}</td>
      <td>{mother(person.fatherName)}</td>
    </tr>
  );
};
