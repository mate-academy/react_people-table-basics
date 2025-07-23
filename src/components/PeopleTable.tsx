// components/PeopleTable.tsx
import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[]; // Lista de pessoas a serem exibidas na tabela
  selectedPersonSlug?: string; // Slug da pessoa selecionada na URL, se houver
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedPersonSlug,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            // Adiciona a classe de destaque APENAS se o slug da pessoa corresponder ao slug selecionado da URL
            className={
              selectedPersonSlug === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              {/* Usa o componente PersonLink para o nome principal */}
              <PersonLink
                person={person}
                allPeople={people}
                name={person.name}
              />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {/* Renderiza o nome da mãe ou '-' se for null */}
              {person.motherName === null ? (
                '-'
              ) : (
                // Encontra a pessoa mãe na lista para passar ao PersonLink
                <PersonLink
                  person={person.mother || null} // Passa o objeto mother se existir, senão null
                  allPeople={people}
                  name={person.motherName}
                />
              )}
            </td>
            <td>
              {/* Renderiza o nome do pai ou '-' se for null */}
              {person.fatherName === null ? (
                '-'
              ) : (
                // Encontra a pessoa pai na lista para passar ao PersonLink
                <PersonLink
                  person={person.father || null} // Passa o objeto father se existir, senão null
                  allPeople={people}
                  name={person.fatherName}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
