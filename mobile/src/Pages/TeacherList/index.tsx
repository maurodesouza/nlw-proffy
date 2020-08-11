import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Asyncstorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState('');

  const toggleFiltersVisible = () => setIsFiltersVisible(!isFiltersVisible);

  const loadFavorites = () => {
    Asyncstorage.getItem('favorites').then(response => {
      if (response) {
        const teachersFavoriteds = JSON.parse(response);
        const teachersFavoritedsIds = teachersFavoriteds.map((teacher: Teacher) => teacher.id);

        setFavorites(teachersFavoritedsIds);
      };
    });
  };

  const searchTeachers = async () => {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    toggleFiltersVisible();
    setTeachers(response.data);
  };

  return (
    <ScrollView style={styles.container}>
      <PageHeader
        title="Proffys Disponíveis"
        rightContent={(
          <BorderlessButton onPress={toggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekday(text)}
                  placeholder="Qual o dia?"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual horário?"
                />
              </View>
            </View>

            <RectButton onPress={searchTeachers} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Buscar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default TeacherList;
