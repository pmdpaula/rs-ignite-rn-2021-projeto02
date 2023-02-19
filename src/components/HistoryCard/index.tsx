import React from 'react';
import { View } from 'react-native';

import { Amount, Container, Icon, Percent, Title } from './styles';

interface HistoryCardProps {
  title: string;
  amount: number;
  color: string;
  percent: number;
  icon: string;
}

export const HistoryCard = ({ title, amount, color, percent, icon }: HistoryCardProps) => {
  const showPercent = (percent / 100).toLocaleString('pt-BR', {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,

    minimumIntegerDigits: 1,
  });

  return (
    <Container color={color}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Icon name={icon} color={color} />
        <Title>{title}</Title>
      </View>

      <Percent>{showPercent}</Percent>

      <Amount>
        {amount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Amount>
    </Container>
  );
};
