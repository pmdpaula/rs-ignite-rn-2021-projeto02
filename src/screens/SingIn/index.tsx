import React, { useContext } from 'react';
import { IAuthContextData, useAuth } from '../../hooks/auth';

import { RFValue } from 'react-native-responsive-fontsize';

import {
  ButtonsWrapper,
  Container,
  Footer,
  Header,
  SignInTitle,
  Title,
  TittleWrapper,
} from './styles';

import LogoSvg from '../../assets/logo.svg';
import AppleLogoSvg from '../../assets/apple.svg';
import GoogleLogoSvg from '../../assets/google.svg';
import SignInSocialButton from '../../components/SignInSocialButton';

export const SingIn = () => {
  const logoSize = 140;
  const { user } = useAuth();

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
          <SignInSocialButton title="Entrar com Google" svg={GoogleLogoSvg} onPress={() => {}} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleLogoSvg} onPress={() => {}} />
        </ButtonsWrapper>
      </Footer>
    </Container>
  );
};
