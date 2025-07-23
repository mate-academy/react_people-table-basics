// components/PersonLink.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  person: Person | null; // Pode ser null se a pessoa não for encontrada
  allPeople: Person[]; // Lista completa de pessoas para verificar a existência (fallback)
  name: string; // O nome a ser exibido
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  allPeople,
  name,
}) => {
  // Prioriza o objeto 'person' passado diretamente. Se for null, busca em 'allPeople' pelo nome.
  const foundPerson = person || allPeople.find(p => p.name === name);

  // Determina se o nome deve ser exibido com a classe has-text-danger (para mulheres)
  const isFemale = foundPerson?.sex === 'f';
  const className = isFemale ? 'has-text-danger' : '';

  // Se a pessoa for encontrada e tiver um slug, renderiza como um Link
  if (foundPerson && foundPerson.slug) {
    return (
      <Link className={className} to={`/people/${foundPerson.slug}`}>
        {name}
      </Link>
    );
  }

  // Caso contrário, renderiza como texto simples
  return <span className={className}>{name}</span>;
};
