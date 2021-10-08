import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    getPeople()
      .then((data) => {
        const peopleWithParents = data.map(person => ({
          ...person,
          mother: data.find(row => row.name === person.motherName),
          father: data.find(row => row.name === person.fatherName),
        }));

        setPeoples(peopleWithParents);
      });
  }, []);

  return (
    <>
      <Typography
        variant="h2"
        component="div"
        gutterBottom
        align="center"
      >
        People Page
      </Typography>
      <PeopleTable peoples={peoples} />
    </>
  );
};
