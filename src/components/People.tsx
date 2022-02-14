import { useEffect, useState } from 'react';
import { getPeopleFromServer } from '../api/people';

const People: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);

  const getPeople = async () => {
    const peopleArray = await getPeopleFromServer();

    setPeople([...peopleArray]);
  };

  useEffect(() => {
    getPeople();
  }, []);

  const getPageContent = () => {
    if (people) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Sex</th>
              <th scope="col">Born</th>
              <th scope="col">Died</th>
              <th scope="col">Mother</th>
              <th scope="col">Father</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => {
              const {
                name,
                sex,
                born,
                died,
                fatherName,
                motherName,
              } = person;

              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{name}</td>
                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>{motherName}</td>
                  <td>{fatherName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }

    return (<span>Unfortunately we have nothing to show here</span>);
  };

  return (
    <div>
      <h1>List of people</h1>
      {getPageContent()}
    </div>
  );
};

export default People;
