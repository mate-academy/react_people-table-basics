
// import { Person } from '../../types/Person';
// import classNames from 'classnames';
// import { PersonLink } from '../PersonLink';

// interface PeopleTableProps {
//   persons: Person[] | null;
//   selectedPerson: Person | null;
// }

// export const PeopleTable: React.FC<PeopleTableProps> = ({ persons, selectedPerson }) => {
//   return (
//     <table
//                 data-cy="peopleTable"
//                 className="table is-striped is-hoverable is-narrow is-fullwidth"
//               >
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Sex</th>
//                     <th>Born</th>
//                     <th>Died</th>
//                     <th>Mother</th>
//                     <th>Father</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {persons?.map((person) => (
//                     <tr
//                       key={person.slug}
//                       data-cy="person"
//                       className={classNames({
//                         "has-background-warning": selectedPerson?.slug === person.slug,

//                          })}>
//                     <td>
//                       <PersonLink person={person} />
//                     </td>
//                     <td>{person.sex}</td>
//                     <td>{person.born}</td>
//                     <td>{person.died}</td>
//                     <td className={classNames({ 'has-text-danger': person.motherName && person.sex === 'f' })}>
//                        {person.motherName || '-'}
//                     </td>
//                     <td>
//                       {person.fatherName || '-'}
//                     </td>
//                     </tr>

//                   ))}

//                 </tbody>
//               </table>
//   )
// }




// import { Person } from '../../types/Person';
// import classNames from 'classnames';
// import { PersonLink } from '../PersonLink';

// interface PeopleTableProps {
//   persons: Person[] | null;
//   selectedPerson: Person | null;
// }

// export const PeopleTable: React.FC<PeopleTableProps> = ({ persons, selectedPerson }) => {
//   return (
//     <table
//                 data-cy="peopleTable"
//                 className="table is-striped is-hoverable is-narrow is-fullwidth"
//               >
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Sex</th>
//                     <th>Born</th>
//                     <th>Died</th>
//                     <th>Mother</th>
//                     <th>Father</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {persons?.map((person) => (
//                     <tr
//                       key={person.slug}
//                       data-cy="person"
//                       className={classNames({
//                         "has-background-warning": selectedPerson?.slug === person.slug,

//                          })}>
//                     <td>
//                       <PersonLink person={person} />
//                     </td>
//                     <td>{person.sex}</td>
//                     <td>{person.born}</td>
//                     <td>{person.died}</td>
//                     <td className={classNames({ 'has-text-danger': person.motherName && person.sex === 'f' })}>
//                        {person.motherName || '-'}
//                     </td>
//                     <td>
//                       {person.fatherName || '-'}
//                     </td>
//                     </tr>

//                   ))}

//                 </tbody>
//               </table>
//   )
// }


// src/components/PeopleTable.tsx
import React from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

interface PeopleTableProps {
  persons: Person[] | null;
  selectedPerson: Person | null;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ persons, selectedPerson }) => {
  return (
    <table data-cy="peopleTable" className="table is-striped is-hoverable is-narrow is-fullwidth">
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
        {persons?.map((person) => {
          // Припустимо, що mother і father вже визначені у вашій логіці
          const mother = persons?.find((person) => person.name === person.motherName) || null;
          const father = persons?.find((person) => person.name === person.fatherName) || null;

          return (
            <PersonLink
              key={person.slug}
              person={person}
              selectedPersonSlug={selectedPerson?.slug}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
};
