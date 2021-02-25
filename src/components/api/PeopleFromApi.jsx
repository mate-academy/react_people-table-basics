
export async function getPeopleApi() {
  const response = await fetch("https://mate-academy.github.io/react_people-table/api/people.json");

  return response.json();
}
