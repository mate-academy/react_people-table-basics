import React, { useEffect, useState } from 'react';

import { PeopleTable } from './PeopleTable';

import { getPeople } from '../api/people';

export const PeoplePage = () => {
  type People = {
    name: string
    born: number,
    died: number,
    fatherName: string,
    motherName: string,
    sex: string,
    slug: string,
  };

  const [peopleFromServer, setPeopleFromServer] = useState<People[]>([]);
  // const preparedPeople = peopleFromServer.filter(person => )

  useEffect(() => {
    getPeople()
      .then(setPeopleFromServer)
    console.log(getPeople())
  }, [])

  return (
    <>
      <h1>People page</h1>

      {peopleFromServer.length !== 0
        ? <PeopleTable people={peopleFromServer} />
        : <span>Loading...</span>}
    </>
  )
}
