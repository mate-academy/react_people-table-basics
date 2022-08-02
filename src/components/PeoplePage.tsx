import React, { useEffect, useState } from 'react';
import { Button, Loader } from 'react-bulma-components';
import classnames from 'classnames';
import { getUsers } from './api';

interface People {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
}

export const PeopleTable: React.FC = () => {
  const [peopleList, getPeople] = useState<People[] | null>(null);
  const [selectedPerson, getSelectedPerson] = useState<People | null>(null);
  const [selectedPeople, getSelectedPeople] = useState<People[]>([]);
  const [deletedPerson, getDeletedPerson] = useState<People | null>(null);
  const [movedPerson, getMovedPerson] = useState<People | null>(null);
  const [moveDirection, getMoveDirection] = useState('');

  useEffect(() => {
    setTimeout(() => getUsers()
      .then(people => getPeople([...people])), 1000);
  }, []);

  useEffect(() => {
    if (selectedPerson) {
      const addPerson: boolean = selectedPeople.includes(selectedPerson);

      if (!addPerson) {
        getSelectedPeople(currentSelectedPeople => ([
          ...currentSelectedPeople,
          selectedPerson,
        ]));

        getSelectedPerson(null);
      }

      if (addPerson) {
        const removedPerson = selectedPeople
          .filter(person => person.slug !== selectedPerson.slug);

        getSelectedPeople(removedPerson);
        getSelectedPerson(null);
      }
    }
  }, [selectedPerson]);

  useEffect(() => {
    const personsToDelete = peopleList?.filter(person => {
      return person.slug !== deletedPerson?.slug;
    });

    getPeople(personsToDelete || null);
  }, [deletedPerson]);

  useEffect(() => {
    const personToMoveIndex = peopleList?.findIndex(person => {
      return person.slug === movedPerson?.slug;
    });

    switch (moveDirection) {
      case 'up':
        if (personToMoveIndex === 0) {
          return;
        }

        if (typeof personToMoveIndex !== 'undefined' && peopleList) {
          const newPeople = [...peopleList];
          const personToMove = newPeople
            .slice(personToMoveIndex - 1, personToMoveIndex);

          newPeople.splice(personToMoveIndex - 1, 1);

          getPeople(newPeople
            .slice(0, personToMoveIndex)
            .concat(...personToMove)
            .concat(
              newPeople
                .slice(personToMoveIndex),
            ));
          getMovedPerson(null);
        }

        break;

      case 'down':
        if (!peopleList || personToMoveIndex === -1) {
          return;
        }

        if (typeof personToMoveIndex !== 'undefined' && peopleList) {
          const newPeople = [...peopleList];
          const personToMove = newPeople.splice(personToMoveIndex, 1);

          newPeople.splice(personToMoveIndex + 1, 0, ...personToMove);
          getPeople(newPeople);
          getMovedPerson(null);
        }

        break;

      default:
        break;
    }
  }, [movedPerson]);

  return (
    <>
      {peopleList?.length

        ? (
          <div className="table-container">
            <table className="table is-hoverable">
              <thead>
                <tr>
                  <th><abbr title="name">Name</abbr></th>
                  <th><abbr title="sex">Sex</abbr></th>
                  <th><abbr title="born">Born</abbr></th>
                  <th><abbr title="died">Died</abbr></th>
                  <th><abbr title="Fathername">Fathername</abbr></th>
                  <th><abbr title="Mothername">Mothername</abbr></th>
                  <th>Select</th>
                  <th>Move Up</th>
                  <th>Move Down</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {peopleList.map(person => {
                  const isPersonSelected = selectedPeople.includes(person);
                  const selectedPersonClasses = classnames({
                    'is-selected': isPersonSelected,
                  });

                  return (
                    <tr key={person.slug} className={selectedPersonClasses}>
                      <th className={selectedPersonClasses}>{person.name}</th>
                      <th>{person.sex}</th>
                      <th>{person.born}</th>
                      <th>{person.died}</th>
                      <th>{person.fatherName}</th>
                      <th>{person.motherName}</th>
                      <th>
                        <Button
                          className={classnames(
                            'is-success',
                            { 'is-warning': isPersonSelected },
                          )}
                          onClick={() => getSelectedPerson(person)}
                        >
                          {`${!isPersonSelected
                            ? 'Select'
                            : 'Unselect'}`}
                        </Button>
                      </th>

                      <th>
                        <Button
                          type="button"
                          onClick={() => {
                            getMoveDirection('up');
                            getMovedPerson(person);
                          }}
                        >
                          Move Up
                        </Button>
                      </th>

                      <th>
                        <Button
                          onClick={() => {
                            getMoveDirection('down');
                            getMovedPerson(person);
                          }}
                        >
                          Move Down
                        </Button>
                      </th>

                      <th>
                        <Button
                          className="is-danger"
                          onClick={() => getDeletedPerson(person)}
                        >
                          Delete
                        </Button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
        : <Loader />}
    </>
  );
};
