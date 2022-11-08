import React from "react"
import { Person } from "../types"
import { PeopleInfo } from './PeopleInfo';

type Props = {
  list: Person[],
  selectPeople: string | null,
};

export const PeopleList:React.FC<Props> = ({
  list,
  selectPeople,
}) => {
  return (
    <tbody>
      {list.map(person => (
        <PeopleInfo
          person={person}
          selectPeople={selectPeople}
        />
      ))
      }
    </tbody>
  )
}
