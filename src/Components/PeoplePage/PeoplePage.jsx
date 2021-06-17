import React, { useState, useEffect } from 'react';
import { getPeople } from '../../Api';
import { PersonRow } from '../PersonRow';
import './peoplePage.css';

export const PeoplePage = () => {
    const [people, setPeople] = useState([]);

    const findParents = (array) => {
        const result = array.map((person) => {
            person.mother = array.find(({ name }) => name === person.motherName);
            person.father = array.find(({ name }) => name === person.fatherName);

            return person;
        });

        setPeople(result);
    };

    useEffect(() => {
        getPeople()
            .then(findParents);
    }, []);

    return (
        <>
            <h2>People page</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th className="col">#</th>
                        <th className="col">Name</th>
                        <th className="col">Sex</th>
                        <th className="col">Born</th>
                        <th className="col">Died</th>
                        <th className="col">Mother</th>
                        <th className="col">Father</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((person, index) => (
                        <PersonRow
                            key={person.slug}
                            person={person}
                            index={index}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};