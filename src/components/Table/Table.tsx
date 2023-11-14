import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {

  people: Person[] | undefined

}

export const Table: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const parent = (parentName: string | null) => {
    return people?.find(pPerson => pPerson.name === parentName);
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
        {people?.map(person => {
          const selected = person.slug === slug;

          return (

            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': selected,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  parent(person.motherName)
                    ? (<PersonLink person={parent(person.motherName)} />)
                    : (<p>{person.motherName || '-'}</p>)
                }
              </td>
              <td>
                {
                  parent(person.fatherName)
                    ? (<PersonLink person={parent(person.fatherName)} />)
                    : (<p>{person.fatherName || '-'}</p>)
                }
              </td>
            </tr>

          );
        })}
      </tbody>
    </table>

  );
};
