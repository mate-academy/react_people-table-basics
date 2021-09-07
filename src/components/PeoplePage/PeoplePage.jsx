import React from 'react';
import { getPeople } from '../helper/getPeople';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export class PeoplePage extends React.Component {
  state = {
    people: [],
  };

  componentDidMount() {
    getPeople()
      .then((peopleFromServer) => {
        const peopleWithParents = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer.find(human => (
            human.name === person.motherName
          )),
          father: peopleFromServer.find(human => (
            human.father === person.fatherName
          )),
        }));

        this.setState({
          people: peopleWithParents,
        });
      });
  }

  render() {
    const { people } = this.state;

    return (
      <>
        <h2 className="title">People Page</h2>
        {people.length > 0
          ? (
            <PeopleTable people={people} />
          )
          : <h2 className="title">Loading...</h2>}
      </>
    );
  }
}
