import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api/people';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

export const ParentInfo = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);

  const { slug } = useParams();
  const parent = people.find(par => par.slug === slug);
  const children = people.filter(kid => kid.motherName === parent?.name
    || kid.fatherName === parent?.name);

  useEffect(() => {
    getPeople()
      .then(allPeople => setPeople(allPeople));

    setTimeout(() => (
      setLoading(false)
    ), 200);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    !parent
      ? <NotFoundPage />
      : (
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{`${parent.name}`}</p>

                {children.map(child => (
                  <p className="content">
                    {child?.sex === 'f'
                      ? `Daughter: ${child.name}`
                      : `Son: ${child.name}`}
                  </p>
                ))}
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
      )
  );
};
