import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPeople } from "../api";
import { Person } from "../types";
import { MessageBlock } from "./MessageBlock";
import { PeopleTable } from "./PeopleTable";

export const TodoPage = () => {
  const { slug } = useParams();

  const [peopleTable, setPeopleTable] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeopleTable(peopleFromServer.map(persone => {
          return ({
            ...persone,
            mother: peopleFromServer
              .find(mother => persone.motherName === mother.name),

            father: peopleFromServer
              .find(father => persone.fatherName === father.name),
          });
        }));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable peopleTable={peopleTable} slugPersone={slug} />

      {(isError || isLoading) && (
        <MessageBlock
          isError={isError}
          isLoading={isLoading}
          peopleTable={peopleTable}
        />
      )}
    </>
  );
};
