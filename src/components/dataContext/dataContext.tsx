// import { createContext, ReactNode, useEffect, useState } from 'react';
// import { getPeople } from '../../api';
// import { Person } from '../../types';
// import { preparePeopleData } from '../../utils/preparePeopleData';
// import { useLocation } from 'react-router-dom';

// interface DataContextType {
//   dataFromServer: Person[] | undefined;
//   setDataFromServer: React.Dispatch<React.SetStateAction<Person[] | undefined>>;
//   isLoading: boolean;
//   errorMessage: string | null;
// }

// export const dataContext = createContext<DataContextType | undefined>(
//   undefined,
// );

// export const MyProvider = ({ children }: { children: ReactNode }) => {
//   const [dataFromServer, setDataFromServer] = useState<Person[]>();
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const location = useLocation();
//   const isPeopleLocation = location.pathname.startsWith('/people');

//   useEffect(() => {
//     setDataFromServer([]);
//     setErrorMessage(null);
//     setIsLoading(true);
//     if (isPeopleLocation) {
//       getPeople()
//         .then((data: Person[]) => {
//           const peopleData = preparePeopleData(data);

//           setDataFromServer(peopleData);
//         })
//         .catch(() => {
//           setErrorMessage('Something went wrong');
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     }
//   }, [isPeopleLocation]);

//   return (
//     <dataContext.Provider
//       value={{ dataFromServer, setDataFromServer, isLoading, errorMessage }}
//     >
//       {children}
//     </dataContext.Provider>
//   );
// };
