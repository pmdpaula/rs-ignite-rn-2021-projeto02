import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { Button, ImageContainer, Title } from './styles';

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
  onPress: () => void;
}

const SignInSocialButton = ({ title, svg: Svg, onPress, ...rest }: SignInSocialButtonProps) => {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </Button>
  );
};

export default SignInSocialButton;
