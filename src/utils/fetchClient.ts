const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(1000)
    .then(() => fetch(new URL(url, BASE_URL).toString(), options))
    .then(response => response.json() as Promise<T>);
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
