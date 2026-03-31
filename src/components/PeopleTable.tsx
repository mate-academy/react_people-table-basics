import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PeopleLink } from './/PeopleLink';

type Props = {
  people?: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      setSelectedSlug(slug);
    }
  }, [slug]);

  const renderparents = (name?: string | null) => {
    if (!name) {
      return '-';
    }

    const p = people?.find(x => x.name === name);

    if (p) {
      return <PeopleLink person={p} name={name} />;
    }

    return <span>{name}</span>;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
            onClick={() => setSelectedSlug(person.slug)}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderparents(person.motherName)}</td>
            <td>{renderparents(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
