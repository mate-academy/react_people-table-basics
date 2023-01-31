import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  peopleList: Person[],
};

export const PeopleList: React.FC<Props> = ({
  peopleList,
}) => {
  const { selectedSlug = 0 } = useParams();

  return (
    <tbody>
      {peopleList.map(person => {
        const {
          name,
          sex,
          born,
          died,
          fatherName,
          motherName,
          mother,
          father,
          slug,
        } = person;

        return (
          <tr
            data-cy="person"
            key={slug}
            className={classNames({
              'has-background-warning': slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink
                slug={slug}
                name={name}
                sex={sex}
              />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {mother
                ? (
                  <PersonLink
                    slug={mother.slug}
                    name={mother.name}
                    sex={mother.sex}
                  />
                )
                : (motherName || '-')}
            </td>
            <td>
              {father
                ? (
                  <PersonLink
                    slug={father.slug}
                    name={father.name}
                    sex={father.sex}
                  />
                )
                : (fatherName || '-')}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
