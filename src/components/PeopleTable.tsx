import { useParams } from 'react-router-dom';
import {Person} from '../types/Person'
import React from 'react';
import classNames from 'classnames';
import {PersonLink} from '../components/PersonLink'
type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug = '' } = useParams();

  return (
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
    {people.map(person => {
        const {sex,born,died,motherName,fatherName,slug,mother,father} = person; 
        return(
      <tr data-cy="person">
        <td 
          key={slug}
          className={classNames(
            { 'has-background-warning': slug === selectedSlug },
          )}
        >
          <PersonLink person={person}></PersonLink>
        </td>
        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td >
        {mother
                  ? <PersonLink person={mother}/>
                  : (motherName || '-')}
          </td>
        <td>
       {father
                  ? <PersonLink person={father}/>
                  : (fatherName || '-')}
        </td>
      </tr>
      )})}
    </tbody>
  </table>
  );
};
