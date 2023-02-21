import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';

import Button from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { ScreenHeader } from '../../components/ScreenHeader';
import {
  TransactionTypeButton,
  TransactionTypeButtonProps,
} from '../../components/TransactionTypeButton';
import { useAuth } from '../../hooks/auth';
import { AppRoutesParamList } from '../../routes/app.routes';
import { CategorySelect } from './../CategorySelect';
import { Container, Fields, Form, TransactionsTypes } from './styles';

interface FormData {
  name: string;
  amount: string;
}

type RegisterNavigationProps = BottomTabNavigationProp<AppRoutesParamList, 'Cadastrar'>;

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

const Register = () => {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();

  const { navigate } = useNavigation<RegisterNavigationProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const formControll = control as unknown as Control<FieldValues, any>;

  const handleRegister = async (form: FormData) => {
    if (!transactionType) return Alert.alert('Selecione o tipo da transação');

    if (category.key === 'category') return Alert.alert('Selecione a categoria');

    const newTransaction = {
      id: uuid.v4(),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      // Alert.alert('Transação cadastrada com sucesso');

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });
      navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }
  };

  const handleTransactionTypeSelect = (type: TransactionTypeButtonProps['type']) => {
    setTransactionType(type);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container>
        <ScreenHeader title="Cadastrar" />

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={formControll}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors?.name.message}
            />
            <InputForm
              name="amount"
              control={formControll}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors?.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title="income"
                type="positive"
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                title="outcome"
                type="negative"
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={() => setCategoryModalOpen(true)}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => setCategoryModalOpen(false)}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export { Register };
