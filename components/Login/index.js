import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import styles from './loginStyles';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import Navigation from '../Navigation';
import {showErrorMsg} from '../Helpers/toast';
import {checkValidation} from '../Helpers/validation';

export default function Login() {
  const [login, setLogin] = useState({});
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unSubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unSubscribe();
  }, []);

  const handleChange = (event, id) => {
    setLogin({
      ...login,
      [id]: event.trim(),
    });
  };

  const handleLogin = () => {
    const isValidated = checkValidation(login.email, login.password);
    if (isValidated === true) {
      setIsLoading(true); // Start loading
      auth()
        .signInWithEmailAndPassword(login.email, login.password)
        .then(userCredential => {
          setUser(userCredential.user);
          setIsLoading(false); // Stop loading
        })
        .catch(error => {
          setIsLoading(false); // Stop loading on error
          showErrorMsg(error.message, 'error');
        });
    } else {
      showErrorMsg(isValidated, 'error');
    }
  };

  const handleFacebookLogin = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then(userCredential => {
        setUser(userCredential.user);
      })
      .catch(error => {
        showErrorMsg(error.message);
      });
  };

  return user ? (
    <Navigation />
  ) : (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require('../../assets/empite.jpg')} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={event => handleChange(event, 'email')}
          id="email"
          value={login.email}
          placeholder="Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={event => handleChange(event, 'password')}
          id="password"
          value={login.password}
          placeholder="Password"
        />
      </View>
      <View style={styles.inputContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#a7204c" />
        ) : (
          <Button
            title="Login"
            color="#a7204c"
            accessibilityLabel="Login"
            onPress={handleLogin}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Button title="Facebook Sign-In" onPress={handleFacebookLogin} />
      </View>

      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}
