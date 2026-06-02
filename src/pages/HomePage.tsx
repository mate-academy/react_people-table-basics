type Props = {
  title: string;
};

export const HomePage = ({ title }: Props) => {
  return <h1 className="title">{title}</h1>;
};
