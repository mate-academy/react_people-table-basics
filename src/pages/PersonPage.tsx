import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';

export const PersonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(data => {
        const found = data.find(p => p.slug === slug);

        if (!found) {
          setError('Person not found');
        } else {
          setPerson(found);
        }

        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <Loader />
        </div>
      </main>
    );
  }

  // if (error) {
  //   return (
  //     <main className="section">
  //       <div className="container">
  //         <p className="has-text-danger">{error}</p>
  //       </div>
  //     </main>
  //   );
  // }

  if (error) {
    return <Navigate to="/people" replace />;
  }

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">{person?.name}</h1>
        <p>Sex: {person?.sex}</p>
        <p>Born: {person?.born}</p>
        <p>Died: {person?.died}</p>
        <p>Mother: {person?.motherName ?? '-'}</p>
        <p>Father: {person?.fatherName ?? '-'}</p>
      </div>
    </main>
  );
};
