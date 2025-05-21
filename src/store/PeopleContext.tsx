/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from 'react';
import { Person } from '../types';
// import { getPeople } from '../api';
// import { useLoading } from './LoadingContext';
// import { useError } from './ErrorContext';

export const PeopleContext = createContext({
  peoples: [] as Person[],
  setPeoples: (_people: Person[]) => {},
});

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
  const [peoples, setPeoples] = useState<Person[]>([]);

  return (
    <PeopleContext.Provider value={{ peoples, setPeoples }}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeoples = () => useContext(PeopleContext);

// export const useGetPeople = () => {
//   const { setPeoples } = usePeople();
//   const { setLoading } = useLoading();
//   const { setError } = useError();

//   return useEffect(() => {
//     setError(false);
//     setLoading(true);

//     getPeople()
//       .then(setPeoples)
//       .catch(() => {
//         setError(true);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   });
// };
