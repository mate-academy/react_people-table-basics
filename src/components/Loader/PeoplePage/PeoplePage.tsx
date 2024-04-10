import { useEffect, useState } from "react"
import { Person } from "../../../types";
import { getPeople } from "../../../api";
import { PersonItem } from "../PersonItem/PersonItem";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { personSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople().then(setPeople)
    .catch(() => {
      setError('Something went wrong')
    })
    .finally(() => {
      setIsLoading(false)
    })

  }, [])

  const getFather = (name: string | null) => people.find(person => person.name === name);

  const getMother = (name: string | null) => people.find(person => person.name === name);


  return (
    <>

      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
          )}

          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length !== 0 && (
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
          {people.map(person => (
            <PersonItem
              key={person.slug}
              person={person}
              personSlug={personSlug}
              getFather={getFather}
              getMother={getMother}
            />
          ))}

          </tbody>
        </table>
            )}
        </div>
    </div>

    </>
  )
}
