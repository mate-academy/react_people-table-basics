import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  parent: string | null
  people: Person[]
  selectedRow: (personSlag: string) => void
  person: Person
};

export const PersonLink: React.FC<Props> = ({
  parent,
  people,
  selectedRow,
  person,
}) => {
  const [typeOFLink, setTypeOfLink] = useState<string | null>(null);
  const [linkSlug, setLinkSlug] = useState('');

  const classForWoman = people.find(
    human => human.name === parent,
  )?.sex === 'f';

  const findParent = () => {
    if (parent === null) {
      setTypeOfLink(null);
    }

    const findParentName = people.find(human => human.name === parent)?.slug;

    if (typeof findParentName === 'string') {
      setTypeOfLink('linked');
      setLinkSlug(findParentName);
    } else {
      setTypeOfLink('stringOnly');
    }
  };

  const findParentSlug: Person
    = people.find(human => human.name === parent) || person;

  useEffect(() => {
    findParent();
  }, [typeOFLink]);

  return (
    <>
      {typeOFLink === 'linked' ? (
        <Link
          to={`/people/${linkSlug}`}
          className={classNames(
            {
              'has-text-danger': classForWoman,
            },
          )}
          onClick={() => {
            selectedRow(findParentSlug.slug);
          }}
        >
          {parent}
        </Link>
      ) : (
        <>
          {parent || '-'}
        </>
      )}
    </>
  );
};
