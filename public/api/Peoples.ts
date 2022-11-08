const BASE_URL = "https://mate-academy.github.io/react_people-table/api/people.json"

export const getPeople = async() => {
  let response;
  try {
    response = await fetch(BASE_URL)

    if (!response.ok) {
      throw new Error('Error Loading')
    }
  } catch(error) {
    throw new Error('Error Loading')
  }

  return response;
}
