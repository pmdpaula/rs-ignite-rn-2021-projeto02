import React from 'react';

import { Header, Title } from './styles';

interface ScreenHeaderProps {
  title: string;
}

export const ScreenHeader = ({ title }: ScreenHeaderProps) => {
  return (
    <Header>
      <Title>{title}</Title>
    </Header>
  );
};
