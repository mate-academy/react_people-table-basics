
import { useContext, useState } from "react";
import { TablePerson } from "../TablePerson/TablePerson";
import { AppContext } from "../../context/MainContext";

type Props = {
  selectedSlug: string | undefined;
}

export const TableBody:React.FC<Props> = ({ selectedSlug }) => {
  const context = useContext(AppContext);
  const { personList } = context;
  const [parent, setParent] = useState('');

  return (
    <tbody>
      {personList?.map(
        (person, index) => 
          <TablePerson 
            parent={parent}
            setParent={setParent}
            person={person}
            personList={personList}
            key={index}
            selectedSlug={selectedSlug}
          />
      )}
    </tbody>
  )
}
