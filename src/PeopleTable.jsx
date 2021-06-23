import React, { useEffect, useState } from "react";

import { PersonRow } from './PersonRow';

export const PeopleTable = () => {
  const [peoples, setPeople] = useState([]);

  const getPeople = () => {
    fetch("https://mate-academy.github.io/react_people-table/api/people.json")
      .then(response => response.json())
      .then(people => setPeople(people))
  };

  useEffect(() => {
    getPeople()
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>name</th><th>sex</th>
          <th>born</th><th>died</th>
          <th>mother</th><th>father</th>
        </tr>
      </thead>
      <tbody>
        <PersonRow peoples={peoples}/>
      </tbody>
    </table>
  );
}
