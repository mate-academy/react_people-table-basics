import React, { useEffect, useState } from 'react';
import 'bulma';
import { useSearchParams } from 'react-router-dom';

import { TableHeadFoot } from '../TableHeadFoot/TableHeadFoot';
import { UpdatedPersone } from '../../types/UpdatedPersone';
import { getPeople } from '../../api/getPeople';
import { Persone } from '../../types/Persone';
import { PersonRow } from '../PersonRow/PersonRow';
import { Active } from '../../types/Active';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<UpdatedPersone[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [active, setActive] = useState<Active>({
    nameActive: false,
    sexActive: false,
    bornActive: false,
    diedActive: false,
    fatherActive: false,
    motherActive: false,
  });

  useEffect(() => {
    getPeople()
      .then(result => {
        const updatedPeopleList = result
          .map((
            person: Persone,
            index: number,
          ) => {
            return {
              ...person,
              fatherName: person.fatherName || '--not found--',
              motherName: person.motherName || '--not found--',
              id: index,
              father: result.find(
                (man: Persone) => person.fatherName === man.name,
              ) || null,
              mother: result.find(
                (woman: Persone) => person.motherName === woman.name,
              ) || null,
            };
          });

        setPeople(updatedPeopleList);
      });
  }, []);

  return (
    <>
      <h2 className="subtitle has-text-centered">People page</h2>
      <input
        type="text"
        placeholder="Search"
        className="input is-primary"
        value={searchParams.get('filter') || ''}
        onChange={(event) => {
          const filter = event.target.value;

          if (filter) {
            setSearchParams({ filter });
          } else {
            setSearchParams({});
          }
        }}
      />
      <table className="table is-bordered table is-fullwidth">
        <thead>
          <TableHeadFoot
            people={people}
            setPeople={setPeople}
            active={active}
            setActive={setActive}
          />
        </thead>
        <tbody>
          <PersonRow
            people={people}
            active={active}
            searchParams={searchParams}
          />
        </tbody>
        <tfoot>
          <TableHeadFoot
            people={people}
            setPeople={setPeople}
            active={active}
            setActive={setActive}
          />
        </tfoot>
      </table>
    </>
  );
};
