import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: paramsSlug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';

  const visiblePeople = people.filter(person => (
    person.name.includes(currentQuery)
  ));

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          const preparedMotherName = motherName || '-';
          const preparedFatherName = fatherName || '-';

          const isPersonSelected = paramsSlug === slug;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': isPersonSelected,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : preparedMotherName}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : preparedFatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
