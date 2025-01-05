import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const isExist = (name: string) => {
    const person = people.find(p => p.name === name);

    return person ? <PeopleLink person={person} /> : name;
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
        {people.map(p => (
          <tr
            key={p.name}
            data-cy="person"
            className={slug === p.slug ? 'has-background-warning' : ''}
          >
            <td>
              <PeopleLink person={p} />
            </td>

            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>{p.motherName ? isExist(p.motherName) : '-'}</td>
            <td>{p.fatherName ? isExist(p.fatherName) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
