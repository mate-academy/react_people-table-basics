type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    mother,
    father,
  } = person;

  // eslint-disable-next-line
  console.log(name);

  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        {sex}
      </td>
      <td>
        {born}
      </td>
      <td>
        {died}
      </td>
      <td>
        {mother?.name}
      </td>
      <td>
        {father?.name}
      </td>
    </tr>
  );
};
