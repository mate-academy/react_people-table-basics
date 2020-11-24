import React, { useEffect, useState, } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { PeopleTable } from './Components/PeopleTable/PeopleTable';
import { Person } from './Components/interfaceForPerson'
import { HomePage } from './Components/HomePage/HomePage'

import './App.scss';

const App = () => {
  const [people, setPeople] = useState([]);
  const getPeople = () => {
    return fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then((res) => res.json())
      .then((res) => {
        return res.map((person: Person) => {
          person.father = person.fatherName
          person.mother = person.motherName

          return person;
        });
      })
  }

  useEffect(() => {
    getPeople()
      .then(people => setPeople(people))
  }, [])

  return (
    <div className="App">
      <div className="header">
        <NavLink
          to="/"
          exact
          className="navbar-item"
        >
          Home page
        </NavLink>
        <NavLink
          to="/people"
          className="navbar-item"
        >
          People page
        </NavLink>
      </div>


      <section className="allComponents">
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
            >
              <HomePage />
            </Route>

            <Route path="/people">
              <h2>People table</h2>
              <PeopleTable people={people} />
            </Route>

            <Redirect path="/home" to="/" />
            <p>Page not found</p>
          </Switch>
        </div>
      </section>
    </div>
  )
};

export default App;
