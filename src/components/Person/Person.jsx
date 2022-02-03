/* eslint-disable react/jsx-filename-extension */
export const Person = ({ person }) => (
  <tr key={person.name} className="Person">
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName || 'Not found'}</td>
    <td>{person.fatherName || 'Not found'}</td>
  </tr>
);
