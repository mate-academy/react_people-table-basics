import { useEffect } from 'react';
import { People } from '../Types';
import './PeopleTable.scss';
import { PersonRow } from './PersonRow';

interface Props {
  arr?: People[];
}

export const PeopleTable : React.FC<Props> = ({ arr }) => {
  useEffect(() => {
  }, [arr]);

  return (
    <>
      <h1>Table</h1>
      <table className="table">
        <thead className="head">
          <tr className="row">
            <th className="cell">name</th>
            <th className="cell">sex</th>
            <th className="cell">born</th>
            <th className="cell">died</th>
            <th className="cell">mother</th>
            <th className="cell">father</th>
          </tr>
        </thead>
        <tbody>
          {arr?.map((person : People) => (
            <PersonRow singlePerson={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </>
  );
};
