import Toast from 'react-native-toast-message';
export const showErrorMsg = (msg, type) => {
  Toast.show({
    type: type,
    text1: 'Error',
    text2: msg,
    position: 'bottom',
  });
};
