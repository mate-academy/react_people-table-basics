import { useEffect, useState } from 'react';
import { User } from '../types/People';
import { Loader } from './Loader/Loader';
import { PeopleInfo } from './PeopleInfo';

const getPeople = ():Promise<User[]> => {
  return (
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => res.json())
      .catch(() => ({
        Response: 'False',
        Error: 'unexpected error',
      }))
  );
};

export const PeoplePage: React.FC = () => {
  const [usersFromServer, setUsersFromServer] = useState<User[] | null>(null);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    getPeople().then(res => {
      if ('Error' in res) {
        setIsError('Table data cannot be loaded');
      }

      setUsersFromServer(res);
    });
  }, []);

  return (!usersFromServer
    ? (<Loader />)
    : (
      <table className="table containerTable">
        <thead>
          <tr>
            <th>Name</th>
            <th><abbr title="sex">SEX</abbr></th>
            <th><abbr title="born">BORN</abbr></th>
            <th><abbr title="died">DIED</abbr></th>
            <th><abbr title="fatherName">Father name</abbr></th>
            <th><abbr title="motherName">Mother name</abbr></th>
          </tr>
        </thead>
        <tbody>
          {!isError
            ? usersFromServer.map(user => (
              <tr key={user.slug}>
                <PeopleInfo user={user} />
              </tr>
            ))
            : (
              <h1>
                {isError}
              </h1>
            )}
        </tbody>
      </table>
    )
  );
};
