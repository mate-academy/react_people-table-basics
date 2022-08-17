import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';

export const PersonInfo: React.FC = () => {
  const [person, setPerson] = useState<Person | null>(null);
  const { slug } = useParams();

  useEffect((() => {
    getPeople().then(res => {
      setPerson(res.find(human => human.slug === slug) || null);
    });
  }), []);

  return (
    <div>
      {!person
        ? (
          <h1>
            Person not found
          </h1>
        )
        : (
          <div className="section level-item">
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{person.name}</p>
                  </div>
                </div>

                <div className="content">
                  <p>
                    {`Sex: ${person.sex}`}
                  </p>
                  <p>
                    {`Lived: ${person.born} - ${person.died}`}
                  </p>
                  <p>
                    {`Father: ${person.fatherName}`}
                  </p>
                  <p>
                    {`Mother: ${person.motherName}`}
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}
    </div>
  );
};
