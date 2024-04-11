import React, { useMemo } from "react"
import { Person } from "../types"
import { PersonLink } from "./PersonLink"
import classNames from "classnames"

type Props = {
  people: Person[];
  selectedSlug: string | undefined;
}

const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  if (people.length === 0) {
    return (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    );
  }

  const preparedPeople = useMemo(() => {
    return people.map(person => {
      const getParentElement = (parentName: string | null) => {
        if (!parentName) {
          return '-'
        }
        const parent = people.find(per => per.name === parentName)
        return parent ? <PersonLink person={parent} /> : parentName
      }
      return {
        ...person,
        motherElement: getParentElement(person.motherName),
        fatherElement: getParentElement(person.fatherName),
      };
    });
  }, [people]);

  return (
    <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {tableHeaders.map(tableHeader => (
                <th key={tableHeader}>{tableHeader}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {preparedPeople.map(person => {
              const {
                sex,
                born,
                died,
                motherElement,
                fatherElement,
                slug,
              } = person;
              const isSelected = slug === selectedSlug;

              return (
              <tr
                data-cy="person"
                key={slug}
                className={classNames({
                  'has-background-warning': isSelected,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>{motherElement}</td>
                <td>{fatherElement}</td>
              </tr>
            )})}
          </tbody>
        </table>
  );
}
