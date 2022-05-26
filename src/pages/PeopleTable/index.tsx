import {
  FC,
  useEffect,
  useState,
} from 'react';
import { getPeople } from '../../api/api';
import { PersonRow } from '../../components/PersonRow/PersonRow';
import './PeopleTable.scss';

export const PeopleTable: FC = () => {
  const [people, setPeople] = useState<Human[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isShowInfo, setIsShowInfo] = useState<boolean>(false);
  const [currentPerson, setCurrentPerson] = useState<Human | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getPeople();

        setPeople(response);
        setError(null);
      } catch {
        setError('Loading failed 🙃 Please try again');
      }
    };

    getData();
  }, []);

  const showPersonInfo = (name: string): void => {
    setIsShowInfo(true);

    const current = people?.find(item => item.name === name);

    if (current) {
      setCurrentPerson(current);
    }
  };

  return (
    <>
      <h1>People Table</h1>

      {error && (
        <>
          <h3 className="error-loading-data">
            {error}
          </h3>
        </>

      )}

      {isShowInfo && (
        <>
          <div className="blur">
            {/* not empty */}
          </div>

          <div className="PersonInfo">
            <p>
              <span className="PersonInfo__desc">Name: </span>
              {currentPerson?.name}
            </p>
            <p>
              <span className="PersonInfo__desc">Sex: </span>
              {currentPerson?.sex}
            </p>
            <p>
              <span className="PersonInfo__desc">Born: </span>
              {currentPerson?.born}
            </p>
            <p>
              <span className="PersonInfo__desc">Died: </span>
              {currentPerson?.died}
            </p>
            <p>
              <span className="PersonInfo__desc">Mother: </span>
              {currentPerson?.motherName}
            </p>
            <p>
              <span className="PersonInfo__desc">Father: </span>
              {currentPerson?.fatherName}
            </p>

            <button
              type="button"
              className="PersonInfo__button"
              onClick={() => setIsShowInfo(false)}
            >
              Close
            </button>
          </div>
        </>
      )}

      {!error && (
        <table className="PeopleTable">
          <thead className="PeopleTable__head">
            <tr className="PeopleTable__head-row">
              <th className="PeopleTable__head-cell">
                #
              </th>
              <th className="PeopleTable__head-cell">
                Name
              </th>
              <th className="PeopleTable__head-cell">
                Sex
              </th>
              <th className="PeopleTable__head-cell">
                Born
              </th>
              <th className="PeopleTable__head-cell">
                Died
              </th>
              <th className="PeopleTable__head-cell">
                Mother
              </th>
              <th className="PeopleTable__head-cell">
                Father
              </th>
            </tr>
          </thead>
          <tbody className="PeopleTable__body">
            {people && (
              people.map((human, i) => (
                <PersonRow
                  human={human}
                  i={i}
                  showPersonInfo={showPersonInfo}
                />
              ))
            )}
          </tbody>
        </table>
      )}
    </>
  );
};
