import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

export const useTable = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();

  const visiblePeople = people?.reduce<Person[]>((acc, person) => {
    const findedMother = people?.find(
      human => human.name === person.motherName,
    );

    const findedFather = people?.find(
      human => human.name === person.fatherName,
    );

    return [
      ...acc,
      {
        ...person,
        mother: findedMother,
        father: findedFather,
      },
    ];
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isEmptyPeople = people?.length === 0;

  return {
    isLoading,
    isError,
    isEmptyPeople,
    slugFromParam: slug,
    visiblePeople,
  };
};
