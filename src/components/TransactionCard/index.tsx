import React from 'react';

import { categories } from '../../utils/categories';
import { TransactionType } from '../TransactionTypeButton';
import { Amount, Category, CategoryName, Container, Date, Footer, Icon, Title } from './styles';

// interface Category {
//   name: string;
//   icon: string;
// }

export interface TransactionCardDataProps {
  name: string;
  amount: string;
  type: TransactionType;
  category: string;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardDataProps;
}

const TransactionCard = ({ data }: TransactionCardProps) => {
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon type={data.type} name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};

export { TransactionCard };
