import React from 'react';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

import 'bootstrap/dist/css/bootstrap.min.css';

export const PeoplePage: React.FC = () => {
  return (
    <>
    <h1>People Page</h1>
    <PeopleTable />
    </>
  )
}