import { useEffect, useState } from "react";
import { getPeople } from "../api"
import { Person } from "../types";
import { People } from "../components/Loader/person";
import { Loader } from "../components/Loader";
import { useLocation } from "react-router-dom";

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([])
  const [loader, setLoader] = useState(false)
  const [errorMessage, setErroroMessage] = useState('')
  const location = useLocation();
  const currentPath = location.pathname

  const arrayOfMothers = people.filter(person => person.sex === 'f')
  const arrayOfFathers = people.filter(person => person.sex === 'm')

  useEffect(() => {
    setErroroMessage('')
    setLoader(true)
    getPeople()
      .then(people => {
        setPeople(people)
      })
      .catch(() => setErroroMessage('Something went wrong'))
      .finally(() => setLoader(false))
  }, [])

  return (

    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {/* <p data-cy="noPeopleMessage">There are no people on the server</p> */}

          {!loader && !errorMessage && (people.length !== 0 ? (
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
                  return (
                  <People person={person} fathers={arrayOfFathers} mothers={arrayOfMothers} currentPath={currentPath} />
                )})}
              </tbody>
            </table>
          ) : (<p data-cy="noPeopleMessage">There are no people on the server</p>))}
        </div>
      </div>
    </div>
  )
}
