import cn from 'classnames';

interface Props {
  slug: string;
  name: string;
  isDangerous: boolean;
}

export const PersonLink = ({ slug, name, isDangerous }: Props) => {
  if (slug) {
    return (
      <a
        href={`#/people/${slug}`}
        className={cn('', { 'has-text-danger': isDangerous })}
      >
        {name}
      </a>
    );
  } else {
    return <span>{name}</span>;
  }
};
