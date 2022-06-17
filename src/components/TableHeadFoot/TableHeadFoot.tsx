import classNames from 'classnames';
import { useState } from 'react';
import { Active } from '../../types/Active';
import { UpdatedPersone } from '../../types/UpdatedPersone';

interface Props {
  people: UpdatedPersone[],
  setPeople: (people: UpdatedPersone[]) => void,
  active: Active,
  setActive: (value: Active) => void,
}

export const TableHeadFoot: React.FC<Props> = ({
  people,
  setPeople,
  active,
  setActive,
}) => {
  const [state, setState] = useState({
    sortName: true,
    sortSex: true,
    sortBorn: true,
    sortDied: true,
    sortFather: true,
    sortMother: true,
  });

  const {
    nameActive,
    sexActive,
    bornActive,
    diedActive,
    fatherActive,
    motherActive,
  } = active;

  const handlerOnClick = (
    text: string | null,
  ) => {
    const {
      sortName,
      sortSex,
      sortBorn,
      sortDied,
      sortFather,
      sortMother,
    } = state;

    if (text === 'Name') {
      const sortedPeople = [...people].sort((a, b) => {
        return sortName
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });

      setState({
        sortName: !sortName,
        sortBorn: true,
        sortDied: true,
        sortSex: true,
        sortFather: true,
        sortMother: true,
      });

      setActive({
        nameActive: true,
        sexActive: false,
        bornActive: false,
        diedActive: false,
        fatherActive: false,
        motherActive: false,
      });

      setPeople(sortedPeople);
    }

    if (text === 'Sex') {
      const sortedPeople = [...people].sort((a, b) => {
        return sortSex
          ? a.sex.localeCompare(b.sex)
          : b.sex.localeCompare(a.sex);
      });

      setState({
        sortSex: !sortSex,
        sortName: true,
        sortBorn: true,
        sortDied: true,
        sortFather: true,
        sortMother: true,
      });

      setActive({
        nameActive: false,
        sexActive: true,
        bornActive: false,
        diedActive: false,
        fatherActive: false,
        motherActive: false,
      });

      setPeople(sortedPeople);
    }

    if (text === 'Father') {
      const sortedPeople = [...people].sort((a, b) => {
        return sortFather
          ? a.fatherName.localeCompare(b.fatherName)
          : b.fatherName.localeCompare(a.fatherName);
      });

      setState({
        sortFather: !sortFather,
        sortSex: true,
        sortName: true,
        sortBorn: true,
        sortDied: true,
        sortMother: true,
      });

      setActive({
        nameActive: false,
        sexActive: false,
        bornActive: false,
        diedActive: false,
        fatherActive: true,
        motherActive: false,
      });

      setPeople(sortedPeople);
    }

    if (text === 'Mother') {
      const sortedPeople = [...people].sort((a, b) => {
        return sortMother
          ? a.motherName.localeCompare(b.motherName)
          : b.motherName.localeCompare(a.motherName);
      });

      setState({
        sortMother: !sortMother,
        sortFather: true,
        sortSex: true,
        sortName: true,
        sortBorn: true,
        sortDied: true,
      });

      setActive({
        nameActive: false,
        sexActive: false,
        bornActive: false,
        diedActive: false,
        fatherActive: false,
        motherActive: true,
      });

      setPeople(sortedPeople);
    }

    if (text === 'Born') {
      const sortedPeople = [...people].sort((a, b) => {
        return sortBorn
          ? a.born - b.born
          : b.born - a.born;
      });

      setState({
        sortBorn: !sortBorn,
        sortMother: true,
        sortFather: true,
        sortSex: true,
        sortName: true,
        sortDied: true,
      });

      setActive({
        nameActive: false,
        sexActive: false,
        bornActive: true,
        diedActive: false,
        fatherActive: false,
        motherActive: false,
      });

      setPeople(sortedPeople);
    }

    if (text === 'Died') {
      const sortedPeople = [...people].sort((a, b) => {
        return sortDied
          ? a.died - b.died
          : b.died - a.died;
      });

      setState({
        sortDied: !sortDied,
        sortBorn: true,
        sortMother: true,
        sortFather: true,
        sortSex: true,
        sortName: true,
      });

      setActive({
        nameActive: false,
        sexActive: false,
        bornActive: false,
        diedActive: true,
        fatherActive: false,
        motherActive: false,
      });

      setPeople(sortedPeople);
    }
  };

  return (
    <tr>
      <th
        className={classNames({ 'is-selected': nameActive })}
        onClick={({ currentTarget }) => handlerOnClick(
          currentTarget.textContent,
        )}
      >
        Name
      </th>
      <th
        className={classNames({ 'is-selected': sexActive })}
        onClick={({ currentTarget }) => handlerOnClick(
          currentTarget.textContent,
        )}
      >
        Sex
      </th>
      <th
        className={classNames({ 'is-selected': bornActive })}
        onClick={({ currentTarget }) => handlerOnClick(
          currentTarget.textContent,
        )}
      >
        Born
      </th>
      <th
        className={classNames({ 'is-selected': diedActive })}
        onClick={({ currentTarget }) => handlerOnClick(
          currentTarget.textContent,
        )}
      >
        Died
      </th>
      <th
        className={classNames({ 'is-selected': fatherActive })}
        onClick={({ currentTarget }) => handlerOnClick(
          currentTarget.textContent,
        )}
      >
        Father
      </th>
      <th
        className={classNames({ 'is-selected': motherActive })}
        onClick={({ currentTarget }) => handlerOnClick(
          currentTarget.textContent,
        )}
      >
        Mother
      </th>
    </tr>
  );
};
