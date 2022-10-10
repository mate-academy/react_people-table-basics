import { useState } from 'react';
import { Route } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import PeopleList from '../../components/PeopleList';

export const PeoplPage = () => {
  const [onLoad, setOnLoad] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [peopleLength, setPeopleLength] = useState(1);

  const warning = onLoad || serverError || peopleLength === 0;

  return (

  );
};
