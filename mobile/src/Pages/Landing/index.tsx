import React, { useEffect, useState } from 'react';

import { View, Image, Text, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import api from '../../services/api';

import styles from './styles';

const Landing: React.FC = () => {
  const navigation = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  const navigateToGiveClassesPage = () => navigation.navigate('GiveClasses');
  const navigateToStudyPages = () => navigation.navigate('Study');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>
          O que deseja fazer?
        </Text>
      </Text>

      <View  style={styles.buttonsContainer}>
        <RectButton
          onPress={navigateToStudyPages}
          style={[styles.button, styles.buttonStudy]}
        >
          <Image source={studyIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          onPress={navigateToGiveClassesPage}
          style={[styles.button, styles.buttonGiveClasses]}
        >
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Dar aula</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </ScrollView>
  )
}

export default Landing;