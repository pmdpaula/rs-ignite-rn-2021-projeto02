import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TransactionCardDataProps } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/auth';
import { categories } from '../../utils/categories';
import {
  ChartWrapper,
  Container,
  HistoryCardWrapper,
  LoadContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
} from './styles';

interface CategoryDataProps {
  key: string;
  name: string;
  total: number;
  color: string;
  percent: number;
  icon: string;
}

export const Resume = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategory, setTotalByCategory] = useState<CategoryDataProps[]>([]);

  const theme = useTheme();
  const { user } = useAuth();

  const handleDateChange = (action: 'next' | 'prev') => {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async (): Promise<void> => {
    setIsLoading(true);

    const dataKey = `@gofinances:transactions_user:${user.id}}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = JSON.parse(response || '[]') as TransactionCardDataProps[];

    const expensives = transactions.filter(
      (expensive: TransactionCardDataProps) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear(),
    );

    const expensiveTotal = expensives.reduce((acc: number, expensive: TransactionCardDataProps) => {
      return acc + Number(expensive.amount);
    }, 0);

    const sumByCategory: CategoryDataProps[] = [];

    categories.forEach((category) => {
      const categorySum = expensives.reduce((acc: number, expensive: TransactionCardDataProps) => {
        if (expensive.category === category.key) {
          return acc + Number(expensive.amount);
        }

        return acc;
      }, 0);

      if (categorySum > 0) {
        sumByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          percent: Number(((categorySum / expensiveTotal) * 100).toFixed(1)),
          icon: category.icon,
        });
      }
    });

    setTotalByCategory(sumByCategory);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate]),
  );

  return (
    <Container>
      <ScreenHeader title="Resumo por categoria" />

      <MonthSelect>
        <MonthSelectButton onPress={() => handleDateChange('prev')}>
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButton>

        <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

        <MonthSelectButton onPress={() => handleDateChange('next')}>
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButton>
      </MonthSelect>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} animating={isLoading} />
        </LoadContainer>
      ) : (
        <>
          <ChartWrapper>
            <VictoryPie
              data={totalByCategory}
              x="percent"
              y="total"
              colorScale={totalByCategory.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={65}
              padding={{ top: 10, bottom: 10, left: 32, right: 32 }}
              height={RFValue(220)}
            />
          </ChartWrapper>
          <HistoryCardWrapper
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: RFValue(24),
              paddingBottom: RFValue(useBottomTabBarHeight()),
            }}
          >
            {totalByCategory.map((item) => (
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.total}
                color={item.color}
                percent={item.percent}
                icon={item.icon}
              />
            ))}
          </HistoryCardWrapper>
        </>
      )}
      {
        // isLoading ? (
        //   <LoadContainer>
        //     <ActivityIndicator size="large" color={theme.colors.primary} animating={isLoading} />
        //   </LoadContainer>
        // ) : totalByCategory.length > 0 ? (
        //   <>
        //     <ChartWrapper>
        //       <VictoryPie
        //         data={totalByCategory}
        //         x="percent"
        //         y="total"
        //         colorScale={totalByCategory.map((category) => category.color)}
        //         style={{
        //           labels: {
        //             fontSize: RFValue(18),
        //             fontWeight: 'bold',
        //             fill: theme.colors.shape,
        //           },
        //         }}
        //         labelRadius={65}
        //         padding={{ top: 10, bottom: 10, left: 32, right: 32 }}
        //         height={RFValue(220)}
        //       />
        //     </ChartWrapper>
        //     <HistoryCardWrapper
        //       showsVerticalScrollIndicator={false}
        //       contentContainerStyle={{
        //         paddingHorizontal: RFValue(24),
        //         paddingBottom: RFValue(useBottomTabBarHeight()),
        //       }}
        //     >
        //       {totalByCategory.map((item) => (
        //         <HistoryCard
        //           key={item.key}
        //           title={item.name}
        //           amount={item.total}
        //           color={item.color}
        //           percent={item.percent}
        //           icon={item.icon}
        //         />
        //       ))
        //       }
        //     </HistoryCardWrapper>
        //   </>
        // ) : (
        //   <LoadContainer>
        //     <TextNoData>Não há dados para exibir</TextNoData>
        //   </LoadContainer>
        // )
      }
    </Container>
  );
};
