import React, { ProfilerProps } from 'react';

import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string,
}

const PageHeader: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation();

  const goBackNavigation = () => navigation.navigate('Landing');

  return (
    <View style={styles.container}>
      <View style={styles.toBar}>
        <BorderlessButton onPress={goBackNavigation}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default PageHeader;