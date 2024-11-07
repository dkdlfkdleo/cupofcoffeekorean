import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, TextInput, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 홈 아이콘을 위해 사용 (Expo 필요)

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const sentences = [
    { korean: "안녕하세요!", english: "Hello!" },
    { korean: "오늘의 날씨는 어때요?", english: "How's the weather today?" },
    { korean: "커피 한 잔 하실래요?", english: "Would you like a cup of coffee?" },
    { korean: "같이 걸을까요?", english: "Would you like to take a walk?" },
    { korean: "여행 가고 싶어요!", english: "I want to travel!" },
    { korean: "책 읽는 것을 좋아해요.", english: "I love reading books." }
  ];

  const handleTryService = () => {
    Alert.alert("안내", "한국어 문장을 클릭하면 영어로 번역된 문장이 표시됩니다.");
    setCurrentSentenceIndex(0);
    setShowTranslation(false);
    setCurrentScreen('Quiz');
  };

  const handleFriendRequest = () => {
    setCurrentScreen('FriendForm');
  };

  const handleSubscribe = () => {
    const paypalUrl = "https://bit.ly/3N4OKR4"; // 페이팔 링크로 대체
    Linking.openURL(paypalUrl);
  };

  const nextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
      setShowTranslation(false);
    } else {
      setCurrentScreen('SubscribePrompt');
    }
  };

  const handleFormSubmit = () => {
    // DB 저장 대신 콘솔에 정보 출력 (실제 DB 저장은 서버 연동이 필요)
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    alert('친구 신청이 완료되었습니다!');
    setCurrentScreen('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen !== 'Home' && (
        <TouchableOpacity style={styles.homeButton} onPress={() => setCurrentScreen('Home')}>
          <Ionicons name="home" size={24} color="black" /> {/* Home 아이콘 */}
          <Text style={styles.homeText}>HOME</Text>
        </TouchableOpacity>
      )}

      {currentScreen === 'Home' && (
        <>
          <Text style={styles.paragraph}>
            <Text style={styles.welcome}>Welcome to</Text>{"\n"}
            <Text style={styles.title}>CUP of COFFEE KOREAN!</Text>{"\n"}{"\n"}
            <Text style={styles.korean}>CUP of COFFEE KOREAN에 {"\n"} 오신걸 환영해요!</Text>
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleTryService}>
            <Text style={styles.buttonText}>서비스 체험하기{"\n"}Try Our Service</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleFriendRequest}>
            <Text style={styles.buttonText}>친구하기{"\n"}Be Friends with Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
            <Text style={styles.buttonText}>구독하기{"\n"}Subscribe</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNvZmZlZXxlbnwwfHx8fDE2MzcwNzM3OTg&ixlib=rb-1.2.1&q=80&w=400' }}
              style={styles.image}
            />
          </View>
        </>
      )}

      {currentScreen === 'FriendForm' && (
        <>
          <Text style={styles.quizText}>친구 신청하기</Text>
          <TextInput style={styles.input} placeholder="이름" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="이메일" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="연락처" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
            <Text style={styles.buttonText}>제출하기</Text>
          </TouchableOpacity>
        </>
      )}

      {currentScreen === 'Quiz' && (
        <>
          <Text style={styles.quizText}>퀴즈 문장:</Text>
          <TouchableOpacity onPress={() => setShowTranslation(!showTranslation)}>
            <Text style={styles.sentence}>
              {showTranslation ? sentences[currentSentenceIndex].english : sentences[currentSentenceIndex].korean}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={nextSentence}>
            <Text style={styles.buttonText}>다음 문장</Text>
          </TouchableOpacity>
        </>
      )}

      {currentScreen === 'SubscribePrompt' && (
        <>
          <Text style={styles.quizText}>더 많은 문장을 학습해보세요!</Text>
          <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
            <Text style={styles.buttonText}>구독하여 계속하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen('Home')}>
            <Text style={styles.buttonText}>홈으로 돌아가기</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16 
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 5,
  },
  homeText: {
    marginLeft: 5,
    fontSize: 18,
  },
  paragraph: { 
    textAlign: 'center', 
    marginBottom: 20 
  },
  welcome: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'black' 
  },
  korean: { 
    fontSize: 16, 
    color: 'blue' 
  },
  button: { 
    backgroundColor: '#FF8C00', 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    margin: 10, 
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5
  },
  buttonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center'
  },
  image: {
    width: 250,
    height: 300,
    borderRadius: 8,
  },
  quizText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  sentence: { 
    fontSize: 20, 
    textAlign: 'center', 
    marginBottom: 20 
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10
  }
});








