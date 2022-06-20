import { People } from '../Types';

interface Props {
  singlePerson : People
}

export const PersonRow : React.FC<Props> = ({ singlePerson }) => {
  return (
    <tr>
      <td className="cell">{singlePerson.name}</td>
      <td className="cell">{singlePerson.sex}</td>
      <td className="cell">{singlePerson.born}</td>
      <td className="cell">{singlePerson.died}</td>
      <td className="cell">{singlePerson.father?.name}</td>
      <td className="cell">{singlePerson.mother?.name}</td>
    </tr>
  );
};
