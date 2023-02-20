import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { isValid } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components/native';

import HiglightCard from '../../components/HiglightCard';
import { TransactionCard, TransactionCardDataProps } from '../../components/TransactionCard';
import { TransactionType } from '../../components/TransactionTypeButton';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LoadContainer,
  LogoutButton,
  Photo,
  Title,
  TransactionList,
  Transactions,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from './styles';

export interface DataTransactionListProps extends TransactionCardDataProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightDataProps {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataTransactions, setDataTransactions] = useState<DataTransactionListProps[]>([]);
  const [highlinghtData, setHighlinghtData] = useState<HighlightDataProps>(
    {} as HighlightDataProps,
  );

  const theme = useTheme();
  const { signOut, user } = useAuth();

  const getLastTransactionDate = (
    collection: DataTransactionListProps[],
    type: TransactionType,
  ) => {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime()),
      ),
    );

    const response = isValid(lastTransaction)
      ? `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
          month: 'long',
        })}`
      : 'Nenhum valor a informar';

    return response;
  };

  const loadTransactions = async () => {
    const dataKey = `@gofinances:transactions_user:${user.id}}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataTransactionListProps[] = transactions.map(
      (item: DataTransactionListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(new Date(item.date));

        return {
          id: item.id,
          type: item.type,
          name: item.name,
          amount,
          category: item.category,
          date,
        };
      },
    );

    setDataTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
    const totalInterval =
      lastTransactionExpensives === 'Nenhum valor a informar'
        ? 'Nenhum valor a informar'
        : `01 a ${lastTransactionExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setHighlinghtData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionEntries,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionExpensives,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  };

  useEffect(() => {
    loadTransactions();

    // AsyncStorage.removeItem(`@gofinances:transactions_user:${user.id}`);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} animating={isLoading} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.avatar_url }} />

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HiglightCard
              type="positive"
              title="Entradas"
              amount={highlinghtData.entries.amount}
              lastTransaction={highlinghtData.entries.lastTransaction}
            />
            <HiglightCard
              type="negative"
              title="Saídas"
              amount={highlinghtData.expensive.amount}
              lastTransaction={highlinghtData.expensive.lastTransaction}
            />
            <HiglightCard
              type="total"
              title="Total"
              amount={highlinghtData.total.amount}
              lastTransaction={highlinghtData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={dataTransactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: getBottomSpace() }}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export { Dashboard };
