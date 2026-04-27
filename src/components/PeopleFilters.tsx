type Props = {
  query: string;
  centuries: number[];
  availableCenturies: number[];
  onQueryChange: (value: string) => void;
  onCenturyToggle: (century: number) => void;
  onResetCenturies: () => void;
};

export const PeopleFilters = ({
  query,
  centuries,
  availableCenturies,
  onQueryChange,
  onCenturyToggle,
  onResetCenturies,
}: Props) => (
  <aside data-cy="peopleFilters">
    <div className="box">
      <p className="title is-5">Filters</p>

      <div className="field">
        <label className="label" htmlFor="nameFilter">
          Name
        </label>

        <div className="control has-icons-left">
          <input
            id="nameFilter"
            data-cy="nameFilter"
            type="text"
            className="input"
            placeholder="Search by name"
            value={query}
            onChange={event => onQueryChange(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>

      <div className="field">
        <p className="label">Century</p>

        {/* No selected century means "show all centuries". */}
        <label className="checkbox is-block mb-2" htmlFor="century-all">
          <input
            id="century-all"
            data-cy="centuryAll"
            type="checkbox"
            checked={centuries.length === 0}
            onChange={onResetCenturies}
          />{' '}
          All
        </label>

        {availableCenturies.map(century => (
          <label
            key={century}
            className="checkbox is-block mb-2"
            htmlFor={`century-${century}`}
          >
            <input
              id={`century-${century}`}
              data-cy="century"
              type="checkbox"
              checked={centuries.includes(century)}
              onChange={() => onCenturyToggle(century)}
            />{' '}
            {century}
          </label>
        ))}
      </div>
    </div>
  </aside>
);
