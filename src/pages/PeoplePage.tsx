import { People } from "../components/People";
import { useEffect, useState } from "react";
import { Person } from "../types";
import { getPeople } from "../api";
import { Loader } from "../components/Loader";
import { useParams } from "react-router-dom";

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((data) => {
        setPeople(data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { personId } = useParams<{ personId: string }>();

  return (
    <>
      <div className="section">
        <h2 className="title">People Page</h2>
        {loading ? (
          <Loader />
        ) : errorMessage ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        ) : (
          <People people={people} selectedPersonSlug={personId || ""} />
        )}
      </div>
    </>
  );
};
