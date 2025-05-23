import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { LinkToPerson } from './LinkToPerson';
import classNames from 'classnames';

type Props = {
  guy: Person;
  mama: Person | string;
  papa: Person | string;
};

export const PeoplePerson: React.FC<Props> = ({ guy, mama, papa }) => {
  const { slug: urlSlug } = useParams<{ slug?: string }>();
  const { name, sex, born, died, slug } = guy;

  const getClassName = () =>
    classNames({ 'has-background-warning': slug === urlSlug });

  const getParentLink = (parent: Person | string) => {
    if (parent === '-') {
      return '-';
    }

    if (typeof parent === 'string') {
      return <span>{parent}</span>;
    }

    return (
      <LinkToPerson name={parent.name} slug={parent.slug} sex={parent.sex} />
    );
  };

  return (
    <tr data-cy="person" className={getClassName()}>
      <td>
        <LinkToPerson name={name} slug={slug} sex={sex} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>{getParentLink(mama)}</td>

      <td>{getParentLink(papa)}</td>
    </tr>
  );
};
