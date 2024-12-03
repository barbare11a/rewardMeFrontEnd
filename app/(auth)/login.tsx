import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; 
import { useRouter } from 'expo-router'; 
import Colors from "@/constants/Colors";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
    
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

    
      Alert.alert('Success', `Welcome back, ${user.email}!`);
      
      router.replace('/'); 
    } catch (error: any) {
      
      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('Invalid Email', 'The email address is badly formatted.');
          break;
        case 'auth/user-not-found':
          Alert.alert('User Not Found', 'No user found with this email.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Wrong Password', 'The password is incorrect.');
          break;
        default:
          Alert.alert('Login Error', error.message);
          break;
      }
    }
  };

  const handleSignupRedirect = () => {
    router.push('/(auth)/signup'); 
  };
  const handleOnboardingRedirect = () => {
    router.push('/onboarding'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Please sign in to continue.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

       
       <TouchableOpacity style={styles.onboarding} onPress={handleOnboardingRedirect}>
        <Text style={styles.linkText}>
          <Text style={styles.highlight}>What's this app about?</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signup} onPress={handleSignupRedirect}>
        <Text style={styles.linkText}>
          Don't have an account? <Text style={styles.highlight}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.tintColor,
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.yellow,
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 15,
  },
  signup: {
    marginTop: 30,
  },
  linkText: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  highlight: {
    color: Colors.yellow,
    fontWeight: 'bold',
  },
  onboarding: {
    marginTop: 20,
  },
});
