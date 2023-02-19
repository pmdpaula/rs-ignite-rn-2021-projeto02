import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface ContainerProps {
  color: string;
}

// export const Container = styled.View`
export const Container = styled.View<ContainerProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 13px 12px;

  border-radius: ${({ theme }) => theme.border.radius}px;
  /* border-left-width: ${({ theme }) => theme.border.width}px; */
  border-left-width: 8px;
  border-left-color: ${({ color }) => color};

  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
`;

export const Percent = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 16px;
`;

export const Icon = styled(Feather)<ContainerProps>`
  font-size: ${RFValue(20)}px;
  color: ${({ color }) => color};

  margin-right: 16px;
`;
