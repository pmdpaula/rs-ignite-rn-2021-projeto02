import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { TransactionType } from '.';

interface TypeProps {
  type: TransactionType;
}

interface ContainerProps extends TypeProps {
  isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  background-color: ${({ theme, isActive, type }) =>
    isActive && type == 'positive'
      ? theme.colors.success_light
      : isActive && type == 'negative'
      ? theme.colors.attention_light
      : theme.colors.background};

  border-width: ${({ theme, isActive }) => (isActive ? 0 : theme.border.width)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.border.radius}px;
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === 'positive' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
