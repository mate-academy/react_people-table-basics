import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import * as api from '../../api';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable';

const PeoplePage: React.FC = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { person: selectedSlug } = useParams<{ person?: string }>();

    useEffect(() => {
        api.getPeople()
            .then(data => {
                setPeople(data);
                setIsLoading(false);
            })
            .catch(e => {
                setError(e.message);
                setIsLoading(false);
            });
    }, []);
    return (
        <main className="section">
            <div className="container">
                <h1 className="title">People Page</h1>
                <div className="block">
                    <div className="box table-container">
                        {isLoading && <Loader />}
                        {!isLoading && error !== '' && (
                            <p data-cy="peopleLoadingError" className="has-text-danger">
                                Something went wrong
                            </p>
                        )}
                        {!isLoading && error === '' && people.length === 0 && (
                            <p data-cy="noPeopleMessage">There are no people on the server</p>
                        )}
                        {!isLoading && error === '' && people.length > 0 && (
                            <PeopleTable people={people} selectedSlug={selectedSlug} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PeoplePage;