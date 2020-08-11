import React, { useState } from 'react';
import { View, Text, Image, Linking, AsyncStorage } from 'react-native';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import wahtsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import api from '../../services/api';

export type Teacher = {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
};

type Props = {
  teacher: Teacher;
  favorited: boolean;
};

const TeacherItem: React.FC<Props> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const createNewConnection = () => {
    api.post('connections', {
      user_id: teacher.id,
    });
  };

  const toggleFavorites = async () => {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    };

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => teacherItem.id === teacher.id);

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  const linkToWhatsapp = () => {
    createNewConnection();

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{teacher.name}</Text>
          <Text style={styles.profileSubject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.profileBio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.priceLabel}>
          Preço/hora {'  '}
          <Text style={styles.priceValue}>
            {teacher.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {},
            ]}
            onPress={toggleFavorites}
          >
            {isFavorited ? (<Image source={unFavoriteIcon} />) : (<Image source={heartOutlineIcon} />)}
          </RectButton>

          <RectButton style={styles.contactButton} onPress={linkToWhatsapp}>
            <Image source={wahtsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </ScrollView>
  );
}

export default TeacherItem;
