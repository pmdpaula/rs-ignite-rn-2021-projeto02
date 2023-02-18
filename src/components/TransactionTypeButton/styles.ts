import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'up' | 'down';
}

interface ContainerProps extends TypeProps {
  isActive: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, isActive, type }) =>
    isActive && type == 'up'
      ? theme.colors.success_light
      : isActive && type == 'down'
      ? theme.colors.attention_light
      : theme.colors.background};

  border-width: ${({ theme, isActive }) => (isActive ? 0 : theme.border.width)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.border.radius}px;

  padding: 16px;
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) => (type === 'up' ? theme.colors.success : theme.colors.attention)};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
