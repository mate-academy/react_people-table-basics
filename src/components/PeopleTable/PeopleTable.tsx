import { useState, useEffect } from "react"
import { getPeople } from "../../api";
import { Person } from "../../types"
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { PersonLink } from "../PersonLink/PersonLink";
import { Loader } from "../Loader";

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true)
    getPeople()
        .then(peopleFromServer => {
          const preparedPeople = peopleFromServer.map(human => {
            const mother = people.find(m => (m.name === human.motherName))
            const father = people.find(f => (f.name === human.fatherName))

            return {
              ...human,
              mother,
              father,
            }})

        setPeople(preparedPeople)})
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setIsLoading(false))
      },[]
    );

  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
      )}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >

        {!isLoading && (
          <>
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
            </table>
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
          {people.map(person => (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({'has-background-warning': person.slug === slug})}
            >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : person.motherName || '-'
              }
            </td>

            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : person.fatherName || '-'
              }
            </td>
          </tr>
          ))}
      </tbody>
      </>
      )}
    </table>
    </div>
  )
}
