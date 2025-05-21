import { useEffect } from 'react';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { useError } from '../../store/ErrorContext';
import { useLoading } from '../../store/LoadingContext';
import { usePeoples } from '../../store/PeopleContext';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const { peoples, setPeoples } = usePeoples();
  const { error, setError } = useError();
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    setError(false);
    setLoading(true);

    getPeople()
      .then(setPeoples)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setError, setLoading, setPeoples]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable peoples={peoples} error={error} isLoading={isLoading} />
    </>
  );
};
