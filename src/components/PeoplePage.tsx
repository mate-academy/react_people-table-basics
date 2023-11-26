import cn from 'classnames';
import {
  useEffect,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(peopleData => setPeople(peopleData))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getParentInfo = (parentName: string) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return parentName;
  };

  return (
    <div>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !!people.length
         && (
           <table
             data-cy="peopleTable"
             className="table is-striped is-hoverable is-narrow is-fullwidth"
           >
             <thead>
               <tr>
                 <th>Name</th>
                 <th>Sex</th>
                 <th>Born</th>
                 <th>Died</th>
                 <th>Mother</th>
                 <th>Father</th>
               </tr>
             </thead>
             <tbody>
               {people.map(person => (
                 <tr
                   data-cy="person"
                   key={person.slug}
                   className={cn({
                     'has-background-warning': person.slug === slug,
                   })}
                 >
                   <td>
                     <PersonLink person={person} />
                   </td>

                   <td>{person.sex}</td>
                   <td>{person.born}</td>
                   <td>{person.died}</td>
                   <td>
                     {person.motherName
                       ? getParentInfo(person.motherName)
                       : '-'}
                   </td>
                   <td>
                     {person.fatherName
                       ? getParentInfo(person.fatherName)
                       : '-'}
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         )}

      {!isLoading && !hasError && !people.length && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

    </div>
  );
};
