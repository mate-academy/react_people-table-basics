import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

interface PropsForName {
  people: Person[];
  name:string | null;
}

export function findPersonByName({ people, name }:PropsForName) {
  return people.find(person => person.name === name);
}

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

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
        {

          people.map(person => {
            const mother = findPersonByName({
              people,
              name: person.motherName,
            });

            const father = findPersonByName({
              people,
              name: person.fatherName,
            });

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={cn({
                  'has-background-warning': person.slug === slug,
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
                    mother
                      ? (<PersonLink person={mother} />)
                      : (person.motherName || '-')
                  }
                </td>
                <td>
                  {
                    father
                      ? (<PersonLink person={father} />)
                      : (person.fatherName || '-')
                  }
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
