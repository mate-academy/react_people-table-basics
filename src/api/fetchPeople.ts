export const fetchPeople = () => {
  return (
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('error');
        }

        return res.json();
      })
  );
};
