// Componente que renderiza a tabela de pessoas.
// Recebe a lista completa de pessoas e o slug da pessoa selecionada (opcional).
//
// Para cada pessoa na lista:
//   - Busca mãe e pai dentro do próprio array (para criar links clicáveis)
//   - Destaca a linha da pessoa selecionada com "has-background-warning"
//   - Usa <PersonLink> para nomes que existem no array
//   - Exibe texto simples para pais que NÃO estão no array
//   - Exibe "-" quando motherName ou fatherName for null

import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string; // slug vindo da URL — undefined se nenhum selecionado
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => (
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
      {people.map(person => {
        // Procura a mãe no array de pessoas para criar um link clicável
        const mother = person.motherName
          ? people.find(p => p.name === person.motherName)
          : undefined;

        // Procura o pai no array de pessoas para criar um link clicável
        const father = person.fatherName
          ? people.find(p => p.name === person.fatherName)
          : undefined;

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              // Destaca a linha amarela se o slug desta pessoa bater com a URL
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            {/* Nome da pessoa — sempre um link clicável */}
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            {/* Coluna "Mother":
                - null → exibe "-"
                - nome existe no array → exibe <PersonLink> (link clicável)
                - nome NÃO existe no array → exibe só texto */}
            <td>
              {person.motherName ? (
                mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>

            {/* Coluna "Father": mesma lógica da coluna "Mother" */}
            <td>
              {person.fatherName ? (
                father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
