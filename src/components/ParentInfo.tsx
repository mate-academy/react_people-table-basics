import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api/people';
import { Person } from '../types/Person';
import { NotFoundPage } from './NotFoundPage';

export const ParentInfo = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const { slug } = useParams();
  const parent = people.find(par => par.slug === slug);

  useEffect(() => {
    getPeople()
      .then(allPeople => setPeople(allPeople));
  }, []);

  if (!parent) {
    return <NotFoundPage />;
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{`${parent.name}`}</p>
          </div>
        </div>

        <div className="content">
          <p>{`Sex: ${parent.sex}`}</p>
          <p>{`Born: ${parent.born}`}</p>
          <p>{`Died: ${parent.died}`}</p>
          {parent.motherName && <p>{`Mother: ${parent.motherName}`}</p>}
          {parent.fatherName && <p>{`Father: ${parent.fatherName}`}</p>}
        </div>
      </div>
    </div>
  );
};
