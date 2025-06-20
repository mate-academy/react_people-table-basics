import classNames from "classnames";
import { Person } from "../../types";
import { Link } from "react-router-dom";

type Props = {
  parent: string;
  setParent: (parent: string) => void;
  person: Person;
  personList: Person[];
  selectedSlug: string | undefined;
}

const findParent = (parentName: string | null, personList: Person[]): Person | null => {
  if (parentName === null) return null;

  const parent: Person | undefined = [...personList].filter((person: Person) => person.name === parentName)[0];

  return parent !== undefined ? parent : null;
}

export const TablePerson:React.FC<Props> = ({ person, personList, selectedSlug }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;
  const mommy = mother || findParent(motherName, personList);
  const daddy = father || findParent(fatherName, personList);

  return (
    <tr data-cy="person" className={classNames({ "has-background-warning" : selectedSlug === slug })}>
      <td>
        <Link className={classNames({ "has-text-danger": sex === 'f' })} to={`/people/${slug}`}>
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mommy !== null
          ?
            <Link to={`/people/${mommy.slug}`} className={"has-text-danger"}>{mommy.name}</Link>
          : motherName 
            ? motherName 
            : '-'
        }
      </td>
      <td>
        {daddy !== null
          ?
            <Link to={`/people/${daddy.slug}`} className={""}>{daddy.name}</Link>
          : fatherName 
            ? fatherName 
            : '-'
        }
      </td>
    </tr>
  )
}
