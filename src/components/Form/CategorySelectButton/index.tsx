import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Category, Container, Icon } from './styles';

interface CategorySelectButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export const CategorySelectButton = ({ title, onPress }: CategorySelectButtonProps) => {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>

      <Icon name="chevron-down" />
    </Container>
  );
};
