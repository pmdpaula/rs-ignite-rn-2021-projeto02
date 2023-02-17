import React from 'react';

import { Amount, Category, CategoryName, Container, Date, Footer, Icon, Title } from './styles';

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardDataProps {
  title: string;
  amount: string;
  type: 'positive' | 'negative';
  category: Category;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardDataProps;
}

const TransactionCard = ({ data }: TransactionCardProps) => {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon type={data.type} name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};

export { TransactionCard };
