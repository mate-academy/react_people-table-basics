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
        className={cn({ 'has-text-danger': isDangerous })}
        href={`#/people/${slug}`}
      >
        {name}
      </a>
    );
  } else {
    return <span>{name}</span>;
  }
};
