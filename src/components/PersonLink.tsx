import { FC } from 'react';
 import { Link, useParams } from 'react-router-dom';
 import classNames from 'classnames';
 import { Person } from '../types';

 type Props = {
   person : Person;
   checkPersonName: (motherName: string | null) => Person | null;
 };

 export const PersonLink: FC<Props> = ({
   person,
   checkPersonName,
 }) => {
   const hasMotherInList = checkPersonName(person.motherName);
   const hasFatherInList = checkPersonName(person.fatherName);
   const { slug = '' } = useParams();

   return (
     <tr
       data-cy="person"
       className={classNames({ 'has-background-warning': slug === person.slug })}
     >
       <td>
         <Link
           to={`/people/${person.slug}`}
           className={classNames({
             'has-text-danger': person.sex === 'f',
           })}
         >
           {person.name}
         </Link>
       </td>

       <td>{person.sex}</td>
       <td>{person.born}</td>
       <td>{person.died}</td>
       <td>
         {hasMotherInList
           ? (
            <Link
              to={`/people/${hasMotherInList.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          )
          : person.motherName || '-'
      }
    </td>
    <td>
      {
        hasFatherInList
          ? (
            <Link
              to={`/people/${hasFatherInList.slug}`}
            >
              {person.fatherName}
            </Link>
          )
          : person.fatherName || '-'
      }
    </td>
  </tr>
);
};