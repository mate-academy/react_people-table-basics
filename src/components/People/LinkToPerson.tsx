import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

type Props = {
  name: string;
  slug: string;
  sex: string;
};

export const LinkToPerson: React.FC<Props> = ({ name, slug, sex }) => {
  const { slug: urlSlug } = useParams<{ slug?: string }>();
  const getClassName = () => classNames({ 'has-text-danger': sex === 'f' });
  const getLink = () => {
    if (`${urlSlug}` === slug) {
      return '..';
    }

    return `../${slug}`;
  };

  return (
    <>
      <Link to={getLink()} className={getClassName()}>
        {name}
      </Link>
    </>
  );
};
