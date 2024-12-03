import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; 
import { useRouter } from 'expo-router'; 
import Colors from "@/constants/Colors";

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter(); 

  const handleSignup = async () => {
   
    if (!fullName || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
     
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      Alert.alert('Success', `Welcome, ${fullName}! Your account has been created.`);
      
      
    } catch (error: any) {
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert('Error', 'This email is already in use.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Error', 'Invalid email address.');
          break;
        case 'auth/weak-password':
          Alert.alert('Error', 'Password should be at least 6 characters.');
          break;
        default:
          Alert.alert('Error', error.message);
          break;
      }
    }
  };

  const handleOnboardingRedirect = () => {
    router.push('/onboarding');
  };

  const handleSignInRedirect = () => {
    router.push('/(auth)/login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Please fill the input below here</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signup} onPress={handleSignInRedirect}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.highlight}>Sign in</Text>
        </Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.onboarding} onPress={handleOnboardingRedirect}>
        <Text style={styles.linkText}>
          <Text style={styles.highlight}>What's this app about?</Text>
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
  signup: {
    marginTop: 30,
  },
  onboarding: {
    marginTop: 20,
  },
  linkText: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  highlight: {
    color: Colors.yellow,
    fontWeight: 'bold',
  },
});
