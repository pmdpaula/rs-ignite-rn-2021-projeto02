import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

import AppleLogoSvg from '../../assets/apple.svg';
import GoogleLogoSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import SignInSocialButton from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import {
  ButtonsWrapper,
  Container,
  Footer,
  Header,
  SignInTitle,
  Title,
  TittleWrapper,
} from './styles';

export const SingIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  const logoSize = 140;

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  };

  const handleSignInWithApple = async () => {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TittleWrapper>
          <LogoSvg width={RFValue(logoSize)} height={RFValue(logoSize * 0.56)} />

          <Title>
            Controle suas{'\n'}finanças de forma{'\n'}muito simples
          </Title>
        </TittleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <ButtonsWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleLogoSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleLogoSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </ButtonsWrapper>

        {isLoading && (
          <ActivityIndicator color={theme.colors.shape} size="small" style={{ marginTop: 18 }} />
        )}
      </Footer>
    </Container>
  );
};
