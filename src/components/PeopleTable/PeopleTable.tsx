import React, { useMemo, useState } from 'react';
import { Person } from '../../types/Person';
import PersonLink from '../PersonLink/PersonLink';
import './PeopleTable.scss';

type SortField = 'name' | 'sex' | 'born' | 'died' | null;
type SortOrder = 'asc' | 'desc' | null;

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
  className?: string;
  'data-cy'?: string;
}

const normalizeToString = (v: unknown): string | null => {
  if (v == null) {
    return null;
  }

  return String(v);
};

const normalizeToNumber = (v: unknown): number | null => {
  if (v == null) {
    return null;
  }

  const n = Number(v);

  return Number.isNaN(n) ? null : n;
};

const compareValues = (
  a: string | number | undefined | null,
  b: string | number | undefined | null,
  field: SortField,
): number => {
  if (a == null && b == null) {
    return 0;
  }

  if (a == null) {
    return -1;
  }

  if (b == null) {
    return 1;
  }

  if (field === 'name') {
    const sa = normalizeToString(a)?.toLowerCase() ?? '';
    const sb = normalizeToString(b)?.toLowerCase() ?? '';

    return sa.localeCompare(sb);
  }

  if (field === 'sex') {
    const sa = normalizeToString(a) ?? '';
    const sb = normalizeToString(b) ?? '';

    return sa.localeCompare(sb);
  }

  const na = normalizeToNumber(a);
  const nb = normalizeToNumber(b);

  if (na == null && nb == null) {
    return 0;
  }

  if (na == null) {
    return -1;
  }

  if (nb == null) {
    return 1;
  }

  return na - nb;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
  className = '',
  'data-cy': dataCy,
}) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const toggleSort = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder('asc');

      return;
    }

    if (sortOrder === 'asc') {
      setSortOrder('desc');

      return;
    }

    setSortField(null);
    setSortOrder(null);
  };

  const sortedPeople = useMemo(() => {
    if (!sortField || !sortOrder) {
      return people;
    }

    return [...people].sort((p1, p2) => {
      const v1: string | number | undefined =
        sortField === 'name'
          ? p1.name
          : sortField === 'sex'
            ? p1.sex
            : sortField === 'born'
              ? p1.born
              : sortField === 'died'
                ? p1.died
                : undefined;

      const v2: string | number | undefined =
        sortField === 'name'
          ? p2.name
          : sortField === 'sex'
            ? p2.sex
            : sortField === 'born'
              ? p2.born
              : sortField === 'died'
                ? p2.died
                : undefined;

      const cmp = compareValues(v1, v2, sortField);

      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [people, sortField, sortOrder]);

  const buttonClass = (field: SortField) => {
    const base = 'people-table__sort-button button is-white is-small';

    if (sortField !== field) {
      return `${base} is-unsorted`;
    }

    if (sortOrder === 'asc') {
      return `${base} is-sorted-asc`;
    }

    if (sortOrder === 'desc') {
      return `${base} is-sorted-desc`;
    }

    return base;
  };

  const findByName = (name?: string) =>
    name ? people.find(p => p.name === name) : undefined;

  return (
    <div
      className={`table-container ${className}`}
      data-cy={dataCy ?? 'peopleTable'}
    >
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                className={buttonClass('name')}
                onClick={() => toggleSort('name')}
                aria-label="Sort by name"
              >
                Name
              </button>
            </th>
            <th>
              <button
                type="button"
                className={buttonClass('sex')}
                onClick={() => toggleSort('sex')}
                aria-label="Sort by sex"
              >
                Sex
              </button>
            </th>
            <th>
              <button
                type="button"
                className={buttonClass('born')}
                onClick={() => toggleSort('born')}
                aria-label="Sort by birth year"
              >
                Born
              </button>
            </th>
            <th>
              <button
                type="button"
                className={buttonClass('died')}
                onClick={() => toggleSort('died')}
                aria-label="Sort by death year"
              >
                Died
              </button>
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {sortedPeople.length === 0 ? (
            <tr>
              <td colSpan={6} className="has-text-centered">
                No people found
              </td>
            </tr>
          ) : (
            sortedPeople.map(person => {
              const isSelected = Boolean(
                selectedSlug && person.slug === selectedSlug,
              );
              const mother = findByName(person.motherName);
              const father = findByName(person.fatherName);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  data-cy-row={`person-row-${person.slug}`}
                  className={isSelected ? 'has-background-warning' : undefined}
                >
                  <td
                    data-cy={`person-name-${person.slug}`}
                    data-person-slug={person.slug}
                  >
                    <PersonLink person={person} />
                  </td>

                  <td data-cy={`person-sex-${person.slug}`}>
                    {person.sex || '-'}
                  </td>

                  <td data-cy={`person-born-${person.slug}`}>
                    {person.born ?? '-'}
                  </td>

                  <td data-cy={`person-died-${person.slug}`}>
                    {person.died ?? '-'}
                  </td>

                  <td data-cy={`person-mother-${person.slug}`}>
                    {mother ? (
                      <PersonLink person={mother} />
                    ) : person.motherName ? (
                      person.motherName
                    ) : (
                      '-'
                    )}
                  </td>

                  <td data-cy={`person-father-${person.slug}`}>
                    {father ? (
                      <PersonLink person={father} />
                    ) : person.fatherName ? (
                      person.fatherName
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
