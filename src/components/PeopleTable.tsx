import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  function getPerson(name: string | null) {
    const person = people.find(item => item.name === name);

    if (person) {
      return <PersonLink person={person} />;
    }

    return name || '-';
  }

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
            sex, born, died, motherName, fatherName, slug: url,
          } = person;

          const mother = getPerson(motherName);
          const father = getPerson(fatherName);

          return (
            <tr
              data-cy="person"
              key={url}
              className={classNames({
                'has-background-warning': slug === url,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{mother}</td>
              <td>{father}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
