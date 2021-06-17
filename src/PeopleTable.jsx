import React from "react";

import { PersonRow } from './PersonRow';

export const PeopleTable = ({ peoples }) => (
  <table className="table">
    <tr>
      <th>name</th><th>sex</th>
      <th>born</th><th>died</th>
      <th>mother</th><th>father</th>
    </tr>
    <PersonRow peoples={peoples}/>
  </table>
)
