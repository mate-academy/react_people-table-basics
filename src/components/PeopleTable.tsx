import classNames from 'classnames';

import type { Person } from '../types';

import { PersonLink } from './PersonLink';

type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  selectedSlug?: string;
  currentSort: SortField | null;
  currentOrder: 'asc' | 'desc';
  onSort: (field: SortField) => void;
};

// Parent names may be missing or may not match anyone in the loaded dataset.
const renderRelative = (relative: Person | undefined, name: string | null) => {
  if (!name) {
    return '-';
  }

  if (!relative) {
    return name;
  }

  return <PersonLink person={relative} />;
};

// The icon mirrors the 3-state sort cycle managed in PeoplePage.
const getSortIcon = (
  field: SortField,
  currentSort: SortField | null,
  currentOrder: 'asc' | 'desc',
) => {
  if (currentSort !== field) {
    return 'fas fa-sort';
  }

  return currentOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
};

type SortHeaderProps = {
  title: string;
  field: SortField;
  currentSort: SortField | null;
  currentOrder: 'asc' | 'desc';
  onSort: (field: SortField) => void;
};

const sortHeaderClassName =
  'is-flex is-align-items-center is-justify-content-space-between';

const SortHeader = ({
  title,
  field,
  currentSort,
  currentOrder,
  onSort,
}: SortHeaderProps) => (
  <th>
    {/* The button changes sorting without affecting the rest of the row markup. */}
    <span className={sortHeaderClassName}>
      {title}

      <button
        type="button"
        className="button is-white is-small"
        onClick={() => onSort(field)}
        data-cy={`sort-${field}`}
        aria-label={`Sort by ${title}`}
      >
        <span className="icon">
          <i className={getSortIcon(field, currentSort, currentOrder)} />
        </span>
      </button>
    </span>
  </th>
);

export const PeopleTable = ({
  people,
  selectedSlug,
  currentSort,
  currentOrder,
  onSort,
}: Props) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <SortHeader
          title="Name"
          field="name"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        />
        <SortHeader
          title="Sex"
          field="sex"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        />
        <SortHeader
          title="Born"
          field="born"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        />
        <SortHeader
          title="Died"
          field="died"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        />
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <tr
          key={person.slug}
          data-cy="person"
          className={classNames({
            'has-background-warning': person.slug === selectedSlug,
          })}
        >
          <td>
            <PersonLink person={person} />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{renderRelative(person.mother, person.motherName)}</td>
          <td>{renderRelative(person.father, person.fatherName)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
