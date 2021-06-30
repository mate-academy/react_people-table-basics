import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPeople } from '../api/api';

import 'bulma';

import './PeopleTable.scss';

import { PersonRow } from '../PersonRow';

export const PeopleTable = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(res => setPeople(res.map(person => (
        {
          ...person,
          fatherName: res.find(father => father.name === person.fatherName),
          motherName: res.find(mother => mother.name === person.motherName),
        }
      ))));
  }, []);

  return (
    <table className="PeopleTable table is-bordered is-narrow">
      <thead>
        <th className="PeopleTable__title">Name</th>
        <th className="PeopleTable__title">Sex</th>
        <th className="PeopleTable__title">Born</th>
        <th className="PeopleTable__title">Died</th>
        <th className="PeopleTable__title">Mother</th>
        <th className="PeopleTable__title">Father</th>
      </thead>
      <tbody>
        {people.map(person => <PersonRow {...person} />)}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf().isRequired,
};
