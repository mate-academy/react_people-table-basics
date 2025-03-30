import React from 'react';

type TitleType = 'Home Page' | 'People Page' | 'Page not found';
type Props = {
  text: TitleType;
};

export const Title: React.FC<Props> = ({ text }) => (
  <h1 className="title">{text}</h1>
);
