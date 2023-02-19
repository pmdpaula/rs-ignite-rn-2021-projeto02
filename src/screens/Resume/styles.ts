import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, GestureHandlerRootView } from 'react-native-gesture-handler';

interface CategoryProps {
  isActive: boolean;
}

// export const Container = styled.View`
export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${RFValue(18)}px;
  padding: 0 ${RFValue(12)}px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const ChartWrapper = styled.View`
  width: 100%;
  align-items: center;

  margin-bottom: 12px;
`;

export const TextNoData = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;

  color: ${({ theme }) => theme.colors.attention_light};

  margin: 64px 24px;
`;

export const HistoryCardWrapper = styled.ScrollView``;
