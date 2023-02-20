import React from 'react';

import { Amount, Container, Footer, Header, Icon, LastTransaction, Title } from './styles';

// type HiglightCardProps = {
//   type: 'positive' | 'negative' | 'total';
//   title: string;
//   amount: string;
//   lastTransaction: string;
// };

interface HiglightCardProps {
  type: 'positive' | 'negative' | 'total';
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  positive: 'arrow-up-circle',
  negative: 'arrow-down-circle',
  total: 'dollar-sign',
};

const HiglightCard = ({ type, title, amount, lastTransaction }: HiglightCardProps) => {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
};

export default HiglightCard;
