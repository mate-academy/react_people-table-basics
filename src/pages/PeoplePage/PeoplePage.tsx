import React, { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { Person } from "../../types";
import { getPeople } from "../../api";
import { PeopleTable } from "../../components/PeopleTable";
import { useParams } from "react-router-dom";
import { LoadingError } from "../../components/LoadingError";
export const PeoplePage = () => {
  const {
    selectedSlug,
  } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    getPeople()
      .then(people => {
        setPeople(people);
      })
      .catch(() => {
        setIsFailed(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [getPeople])

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      {isFailed && <LoadingError />}
      {!isLoading && !isFailed && <PeopleTable selectedSlug={selectedSlug} people={people} />}
    </>
  );
}
