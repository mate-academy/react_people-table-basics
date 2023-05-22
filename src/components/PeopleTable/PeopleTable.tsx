import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';
import { useEffect } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const getParent = (parentName: string | null) => {
    return people.find(({ name }) => name === parentName);
  };

  const selectedSlug = useParams().slug ?? '';

  useEffect(() => {
    const selectedPerson = document.getElementById(selectedSlug);

    if (selectedPerson) {
      selectedPerson.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedSlug]);

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
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            slug,
            motherName,
            fatherName,
          } = person;
          const father = getParent(fatherName);
          const mother = getParent(motherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              id={slug}
              className={classnames({
                'has-background-warning': slug === selectedSlug,
              })}
            >
              <td>
                <Link
                  className={classnames({
                    'has-text-danger': sex === 'f',
                  })}
                  to={`/people/${slug}`}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {!motherName && ('-')}
                {motherName && mother
                  ? (<PersonLink person={mother} />)
                  : (motherName)}
              </td>
              <td>
                {!fatherName && ('-')}
                {fatherName && father
                  ? (<PersonLink person={father} />)
                  : (fatherName)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
