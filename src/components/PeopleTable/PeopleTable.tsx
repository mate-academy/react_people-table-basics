import React, {useState, useEffect} from 'react';
import { getPeople } from '../../api/api'
import { PersonRow } from '../PersonRow/PersonRow';

export const PeopleTable: React.FC = () => {
  const [people, getPeopleFromServer] = useState([]);
  useEffect(() => {
    getPeople().then((data: React.SetStateAction<never[]>) => getPeopleFromServer(data))
  }, [people]);

  return (
    <>    
    <table className="table table-striped">
        <thead className="table table-dark">
          <tr className="PeopleTable">
            <th className="table-primary">name</th>
            <th className="table-primary">sex</th>
            <th className="table-primary">born</th>
            <th className="table-primary">died</th>
            <th className="table-primary">mother</th>
            <th className="table-primary">father</th>
          </tr> 
        </thead>
        <tbody>
        <PersonRow people={people} />
        </tbody>
      </table>
    </>
  )
};
