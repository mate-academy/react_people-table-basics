import cn from 'classnames';
import { Link } from 'react-router-dom';

type PersonLinkProps = {
  name: string;
  slug?: string;
  isRed: boolean;
};

export function PersonLink({ name, slug, isRed }: PersonLinkProps) {
  return (
    <>
      {slug !== undefined ? (
        <Link
          className={cn({ 'has-text-danger': isRed })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      ) : (
        name
      )}
    </>
  );
}
