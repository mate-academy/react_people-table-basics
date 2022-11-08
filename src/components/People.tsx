import React, { useEffect, useState } from "react"
import {PeopleList} from './PeopleList'
import { Person } from "../types";
import { getPeople } from '../api';
import { Loader } from "./Loader";
import { useParams } from "react-router-dom";

export const People:React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { slug = null } = useParams()

  useEffect(() => {
    const handleLoadingPeople = async() => {
      try{
        setIsLoading(true);
        const response = await getPeople()
        const List = response.map(person => (
          {
            ...person,
            father: response.find(per => (per.name === person.fatherName)),
            mother: response.find(per => (per.name === person.motherName)),
          }
        ))

        setPeopleList(List);
        setIsLoading(false);
      }catch(error) {
        setError(true);
      }
    }

    handleLoadingPeople()
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

              {!peopleList.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
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

                <PeopleList
                  list={peopleList}
                  selectPeople={slug}
                />
              </table>
              </>
            )}
          </div>
        </div>
    </div>
  </main>
  )
}
