const timer = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
};

export const getPeople = async () => {
  let data;

  try {
    const request = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');

    data = await request.json();
    await timer();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);

    data = [];
  }

  return data;
};
