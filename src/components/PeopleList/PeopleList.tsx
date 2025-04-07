import { Person } from "../../types/Person";
import cn from 'classnames';


type Props = {
  persons: Person[];
  selectedSlug: string;
  PersonLinkComponent: React.FC<{ person: Person | null }>;
  getPersonByName: (name: string | null) => Person | null;
}

export const PeopleList: React.FC<Props> = ({ persons, selectedSlug, PersonLinkComponent, getPersonByName,}) => {

  return (
    <div>
      <h1 className="title">People Page</h1>

      {persons.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>

      )}

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
          {persons.map(person => (
            <tr
              key={person.slug} data-cy="person"
              className={cn({ 'has-background-warning': selectedSlug === person.slug })}>
            <td>
            <PersonLinkComponent person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
              <td>
                {person.motherName ? getPersonByName(person.motherName)
                  ? <PersonLinkComponent person={getPersonByName(person.motherName)} />
                  : <span>{person.motherName}</span>
                  : '-'}
              </td>
              <td>
                {person.fatherName
                  ? getPersonByName(person.fatherName)
                  ? <PersonLinkComponent person={getPersonByName(person.fatherName)} />
                  : <span>{person.fatherName}</span>
                  : '-'}
              </td>
          </tr>
          ))
          }
        </tbody>
       </table>



    </div>
  )
}
