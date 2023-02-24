import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPeople } from "../../api";
import { Person } from "../../types";
import { Loader } from "../Loader";
import { PeopleTable } from "../PeopleTable";

export const PersonPage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { personSlug = '' } = useParams();

  const fetchPeople = async () => {
    try {
      setLoading(true);

      const person = await getPeople();
      setPeople(person);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people && (
          <PeopleTable
            people={people}
            personSlug={personSlug}
          />)}
      </div>
    </div>
  )
}
