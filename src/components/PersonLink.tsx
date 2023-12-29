import cn from 'classnames';

type Props = {
  name: string | null,
  slug: string,
  sex: string,
};

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  return (
    <a
      href={`#/people/${slug}`}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </a>
  );
};
