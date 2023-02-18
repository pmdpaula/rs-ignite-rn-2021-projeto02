import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Category, Container, Icon } from './styles';

interface CategorySelectButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export const CategorySelectButton = ({ title, onPress, ...rest }: CategorySelectButtonProps) => {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>

      <Icon name="chevron-down" />
      {/* <CategorySelectButtonIcon name="chevron-down" /> */}
    </Container>
  );
};
