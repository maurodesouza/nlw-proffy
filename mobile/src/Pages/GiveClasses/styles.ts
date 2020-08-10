import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257E5',
    padding: 40,
    justifyContent: 'center',
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180,
  },

  description: {
    marginTop: 24,
    color: '#D4C2FF',
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 240,
    fontFamily: 'Poppins_400Regular',
  },

  okButton: {
    marginVertical: 40,
    height: 56,
    backgroundColor: '#04D361',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
  },
});

export default styles;
