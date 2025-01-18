import { useContext } from 'react';
import { ContextPeople } from '../../Contexts/ContextPeople';
import { PersonInfo } from '../PersonInfo/PersonInfo';
import { Loader } from '../Loader';

export const PeopleTable = () => {
  const { peopleFromServer, isLoading, isError } = useContext(ContextPeople);

  // Если данные еще загружаются, показываем лоадер
  if (isLoading) {
    return <Loader />;
  }

  // Если произошла ошибка при загрузке, показываем ошибку
  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  // Если нет людей на сервере
  if (peopleFromServer.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
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
              {peopleFromServer.map(person => (
                <PersonInfo key={person.name} person={person} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
