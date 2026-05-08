import { createContext, useCallback, useContext, useState } from 'react';
import { Person } from '../types';
import { PeopleContextType, PeopleDictionary, PersonSlug } from '../types';

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<PeopleDictionary>({});
  const [peopleSlugs, setPeopleSlugs] = useState<PersonSlug[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const linkRelatives = useCallback(
    (dict: PeopleDictionary, list: PersonSlug[]) => {
      // O(n)
      const peopleByNames = new Map(
        list.map(slug => [dict[slug].name, dict[slug]]),
      );
      // or "[map] nameToPerson"?

      list.forEach(slug => {
        const person = dict[slug];

        if (person.motherName) {
          person.mother = peopleByNames.get(person.motherName);
        }

        if (person.fatherName) {
          person.father = peopleByNames.get(person.fatherName);
        }
      });

      // O(n^2)
      // for (const personSlug of list) {
      //   const person = dict[personSlug];
      //   const motherName = person.motherName;
      //   const fatherName = person.fatherName;

      //   if (motherName !== null) {
      //     for (const motherSlug of list) {
      //       const potentialMother = dict[motherSlug];

      //       if (motherName === potentialMother.name) {
      //         person.mother = potentialMother;
      //         break;
      //       }
      //     }
      //   }

      //   if (fatherName !== null) {
      //     for (const fatherSlug of list) {
      //       const potentialFather = dict[fatherSlug];

      //       if (fatherName === potentialFather.name) {
      //         person.father = potentialFather;
      //         break;
      //       }
      //     }
      //   }
      // }
    },
    [],
  );

  const fetchPeople = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(result => {
        if (!result.ok) {
          throw new Error();
        }

        return result.json() as Promise<Person[]>;
      })
      // .then(peeps => {
      //   return new Promise(res => {
      //     setTimeout(() => {
      //       res([]);
      //     }, 3000);
      //   });
      // })
      .then(fetchedPeople => {
        const fetchedPeopleDictionary: PeopleDictionary = {};
        const fetchedPeopleSlugList: PersonSlug[] = [];

        // TODO: Compare to existing entries?

        fetchedPeople.forEach(person => {
          const slug = person.slug;

          fetchedPeopleDictionary[slug] = person;
          fetchedPeopleSlugList.push(slug);
        });

        // ? Lil messy?
        linkRelatives(fetchedPeopleDictionary, fetchedPeopleSlugList);

        setPeople(fetchedPeopleDictionary);
        setPeopleSlugs(fetchedPeopleSlugList);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [linkRelatives]);

  const contextValue = {
    people,
    peopleSlugs,
    fetchPeople,
    isLoading,
    hasError,
  };

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};

export function usePeople() {
  const context = useContext(PeopleContext);

  if (context === undefined) {
    throw new Error('usePeople must be used within the PeopleProvider');
  }

  return context;
}
