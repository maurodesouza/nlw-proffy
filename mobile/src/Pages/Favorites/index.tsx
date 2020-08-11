import React, { useState, useCallback } from 'react';

import { View, ScrollView } from 'react-native';
import Asyncstorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    Asyncstorage.getItem('favorites').then(response => {
      if (response) setFavorites(JSON.parse(response));
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []));
  
  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys Favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;