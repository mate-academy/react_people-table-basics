export const getPeople = () => (
  fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(res => res.json())
    .then((peoples) => {
      const peoplesFindParents = peoples.map(people => (
        {
          ...people,
          mother: peoples.find(person => (
            people.motherName === person.name ? person.name : ''
          )),
          father: peoples.find(person => (
            people.fatherName === person.name ? person.name : ''
          )),
        }
      ));

      return peoplesFindParents;
    })
);
