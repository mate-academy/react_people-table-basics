import { useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export function useLocalStorage() {
  const [dataFromServer, setDataFromServer] = useState<Person[]>([]);
  const [isUploadError, setIsUploadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isEmptyError = !dataFromServer.length && !isUploadError && !isLoading;

  function getVisibleData(data: Person[]) {
    const visibleData = data.map(person => {
      const mother = data.find(relative => person.motherName === relative.name);
      const father = data.find(relative => person.fatherName === relative.name);

      return { ...person, mother, father };
    });

    return visibleData;
  }

  getPeople()
    .then(data => {
      setDataFromServer(getVisibleData(data));
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
      setIsUploadError(true);
    });

  return { dataFromServer, isUploadError, isLoading, isEmptyError };
}
