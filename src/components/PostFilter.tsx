import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PostFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const allCenturies = ['16', '17', '18', '19', '20'];

  const turquoise = '#00d1b2';

  const updateParams = (key: string, value: string | string[] | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (!value || value.length === 0) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(v => newParams.append(key, v));
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams, { replace: true });
  };

  const isAllCenturiesActive = selectedCenturies.length === 0;

  return (
    <div
      className="box p-0 has-background-light"
      style={{ border: '1px solid #dbdbdb' }}
    >
      {/* Додаємо стилі, які точно працюватимуть */}
      <style>{`
        .custom-sex-btn {
          background: none !important;
          border: none !important;
          border-bottom: 2px solid transparent !important;
          color: #3273dc !important;
          transition: all 0.2s;
          padding: 5px 10px;
          cursor: pointer;
        }
        .custom-sex-btn.is-active {
          border-bottom-color: black !important;
          color: black !important;
        }
        .custom-sex-btn:hover {
          color: black !important;
        }

        .btn-all-centuries {
          border: 1px solid ${turquoise} !important;
          transition: all 0.2s !important;
          font-weight: normal !important;
        }
        /* Стан, коли жодне століття не вибрано */
        .btn-all-centuries.is-active {
          background-color: ${turquoise} !important;
          color: white !important;
        }
        /* Стан, коли століття вибрані (кнопка біла) */
        .btn-all-centuries:not(.is-active) {
          background-color: white !important;
          color: ${turquoise} !important;
        }
        /* Hover завжди робить її бірюзовою */
        .btn-all-centuries:hover {
          background-color: ${turquoise} !important;
          color: white !important;
        }
      `}</style>

      <div
        className="p-2 has-background-grey-lighter"
        style={{ borderBottom: '1px solid #dbdbdb' }}
      >
        <h2 className="subtitle is-6 has-text-weight-bold m-0">Filters</h2>
      </div>

      <div className="p-3">
        {/* СТАТЬ */}
        <div className="field is-flex is-justify-content-center">
          {['', 'm', 'f'].map(s => (
            <button
              key={s}
              type="button"
              className={`custom-sex-btn ${sex === s ? 'is-active' : ''}`}
              onClick={() => updateParams('sex', s || null)}
            >
              {s === '' ? 'All' : s === 'm' ? 'Male' : 'Female'}
            </button>
          ))}
        </div>

        {/* ПОШУК */}
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="Search"
              value={query}
              onChange={e => updateParams('query', e.target.value)}
            />
            <span className="icon is-small is-left" style={{ opacity: 0.3 }}>
              <i className="fas fa-search"></i>
            </span>
          </p>
        </div>

        {/* СТОЛІТТЯ */}
        <div
          className="field is-flex 
        is-justify-content-space-between is-align-items-center"
        >
          <div className="buttons are-small mb-0">
            {allCenturies.map(c => (
              <button
                key={c}
                type="button"
                className={`button ${selectedCenturies.includes(c) ? 'is-info' : ''}`}
                onClick={() => {
                  const next = selectedCenturies.includes(c)
                    ? selectedCenturies.filter(item => item !== c)
                    : [...selectedCenturies, c];

                  updateParams('centuries', next);
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`button is-small btn-all-centuries ${isAllCenturiesActive ? 'is-active' : ''}`}
            onClick={() => updateParams('centuries', null)}
          >
            All
          </button>
        </div>

        {/* RESET FILTERS */}
        <div className="field mt-4">
          <button
            type="button"
            className="button is-small is-fullwidth reset-button-fixed"
            onClick={() => setSearchParams(new URLSearchParams())}
          >
            Reset all filters
          </button>
        </div>
      </div>
    </div>
  );
};
