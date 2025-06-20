import { useContext } from "react";
import { AppContext } from "../../context/MainContext";
import { Loader } from "../Loader";
import { Table } from "../Table";
import { useParams } from "react-router-dom";

export const PeoplePage = () => {
  const context = useContext(AppContext);
  const { isLoading, isError, personList } = context;
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!isLoading && personList?.length === 0 && 
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          }
          {personList && personList.length > 0 && (
            <Table selectedSlug={slug} />
          )}
        </div>
      </div>
    </>
  )
}
