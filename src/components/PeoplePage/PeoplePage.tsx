import PeopleTable from "../PeopleTable/PeopleTable";
import {Loader} from "../Loader";
import {getPeople} from "../../api";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Person} from "../../types";

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        <PeopleTable people={people} selectedPersonSlug={slug} />
      </div>
    </div>
  );
};

export default PeoplePage;
