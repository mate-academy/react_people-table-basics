import { FC } from "react"
import { Person } from "../../types"
import { PersonLink } from "../PersonLink/PersonLink"
import classNames from "classnames"
import { useParams } from "react-router-dom"


type Props = {
  people: Person[]
}


export const PeopleTable: FC<Props> = ({ people }) => {

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
        {people.map(person => {



          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);



                  return (
                    <tr
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': person.slug === slug,
                      })}
                      key={person.slug}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                       <td>
          {!person.motherName ? (
            '-'
          ) : mother ? (
            <PersonLink person={mother} />
          ) : (
            person.motherName
          )}
        </td>

                      <td>
          {!person.fatherName ? (
            '-'
          ) : father ? (
            <PersonLink person={father} />
          ) : (
            person.fatherName
          )}
        </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

  )
}
