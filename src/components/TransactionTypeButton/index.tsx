import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Button, Container, Icon, Title } from './styles';

export type TransactionType = 'positive' | 'negative';

export interface TransactionTypeButtonProps extends RectButtonProps {
  type: TransactionType;
  title: string;
  isActive: boolean;
}

const icons = {
  positive: 'arrow-up-circle',
  negative: 'arrow-down-circle',
};

export const TransactionTypeButton = ({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) => {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};
