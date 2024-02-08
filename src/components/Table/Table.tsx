import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import { getParent } from '../../utils/getParent';
import { Person } from '../../types';

interface Props {
  people: Person[];
}

export const Table: React.FC<Props> = ({ people }) => {
  const { slug: slugParam } = useParams();

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
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;
          const mother = people.find(({ name }) => name === motherName);
          const father = people.find(({ name }) => name === fatherName);

          return (
            <tr
              data-cy="person"
              className={cn({
                'has-background-warning': slugParam === slug,
              })}
              key={slug}
            >
              {/* eslint-disable-next-line */}
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {getParent(motherName, mother)}
              </td>

              <td>
                {getParent(fatherName, father)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
