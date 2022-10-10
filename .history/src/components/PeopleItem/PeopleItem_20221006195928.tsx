import { FC } from 'react';


export const PeopleItem: FC = ({ person }) => {
  return (
    <tr data-cy="person" className="has-background-warning">
      <td>
        <a href="#/people/jan-van-brussel-1714">
          Jan van Brussel
        </a>
      </td>

      <td>m</td>
      <td>1714</td>
      <td>1748</td>
      <td>Joanna van Rooten</td>
      <td>Jacobus van Brussel</td>
    </tr>
  );
};
