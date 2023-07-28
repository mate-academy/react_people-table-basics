import classNames from 'classnames';
import React, { useState } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const [
    selectedPersonSlug,
    setSelectedPersonSlug,
  ] = useState<string | null>(null);

  const handlePersonClick = (slug: string) => {
    setSelectedPersonSlug(slug === selectedPersonSlug ? null : slug);
  };

  const findParentSlug = (name: string) => {
    return people.find(user => user.name === name)?.slug || '';
  };

  const handleLink = (name: string | null) => {
    return (
      (name ? (
        <PersonLink
          person={{
            name,
            slug: findParentSlug(name),
          }}
          people={people}
          onPersonClick={handlePersonClick}
        />
      ) : (
        '-'
      ))
    );
  };

  return (
    <div className="block">
      <div className="box table-container">
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
            {people.map(({
              slug,
              name,
              sex,
              born,
              died,
              motherName,
              fatherName,
            }) => (
              <tr
                key={slug}
                data-cy="person"
                className={
                  classNames({
                    'has-background-warning': slug === selectedPersonSlug,
                  })
                }
              >
                <td>
                  <PersonLink
                    person={{ name, slug }}
                    people={people}
                    onPersonClick={handlePersonClick}
                  />
                </td>
                <td>
                  {sex}
                </td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {handleLink(motherName)}
                </td>
                <td>
                  {handleLink(fatherName)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
