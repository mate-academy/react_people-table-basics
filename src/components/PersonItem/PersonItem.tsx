import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person,
  peopleList: Person[],
  handleSelectedPerson: (person: Person | undefined) => void,
};

export const PersonItem: React.FC<Props> = ({
  person,
  peopleList,
  handleSelectedPerson,
}) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const checkMother = (mother: string | undefined) => {
    return peopleList.some(human => human.name === mother);
  };

  const checkFather = (father: string | undefined) => {
    return peopleList.some(human => human.name === father);
  };

  return (
    <>
      <PersonLink
        person={person}
        name={person.name}
        sex={person.sex}
        handleSelectedPerson={handleSelectedPerson}
      />

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {!motherName && <td>-</td>}
      {(motherName && checkMother(motherName))
        && (
          <PersonLink
            person={peopleList.find(mother => mother.name === motherName)}
            name={person.motherName}
            sex="m"
            handleSelectedPerson={handleSelectedPerson}
          />
        )}
      {motherName && !checkMother(motherName)
        && <td>{motherName}</td>}
      {!fatherName && <td>-</td>}
      {(fatherName && checkFather(fatherName))
        && (
          <PersonLink
            person={peopleList.find(father => father.name === fatherName)}
            name={person.fatherName}
            sex="f"
            handleSelectedPerson={handleSelectedPerson}
          />
        )}
      {fatherName && !checkFather(fatherName)
        && <td>{fatherName}</td>}
    </>
  );
};
