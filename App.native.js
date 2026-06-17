import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, StatusBar, Alert, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Updates from 'expo-updates';

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState('Checking for updates...');
  const [canGoBack, setCanGoBack] = useState(false);
  const appUrl = 'https://ais-pre-v34xginxljpq6xipwhhifj-859970137966.asia-east1.run.app'; // PWA URL
  let webViewRef = null;

  // Handle Android Native Back Button to navigate inside the Shorof Digital Pro history
  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef) {
        webViewRef.goBack();
        return true; // prevents exiting the app
      }
      return false; // use default system exit
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [canGoBack]);

  // Handle EAS Updates checking automatically on startup
  useEffect(() => {
    async function checkAndApplyUpdates() {
      if (__DEV__) {
        setInitialLoading(false);
        return;
      }
      try {
        setUpdateStatus('Memeriksa pembaruan otomatis...');
        const updateCheck = await Updates.checkForUpdateAsync();
        if (updateCheck.isAvailable) {
          setUpdateStatus('Mengunduh versi lafadz terbaru...');
          await Updates.fetchUpdateAsync();
          setUpdateStatus('Memasang pembaruan...');
          Alert.alert(
            'Pembaruan Diunduh',
            'Sistem selesai mengunduh data versi terbaru. Izinkan kami menyelaraskan sejenak untuk memperbarui database lafadz.',
            [{ text: 'Lanjutkan', onPress: async () => await Updates.reloadAsync() }]
          );
        } else {
          setInitialLoading(false);
        }
      } catch (error) {
        console.log('Error update checking:', error);
        setInitialLoading(false); // Graceful fallback
      }
    }
    checkAndApplyUpdates();
  }, []);

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <ActivityIndicator size="large" color="#059669" />
        <Text style={styles.loadingText}>Shorof Digital Pro</Text>
        <Text style={styles.subText}>{updateStatus}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WebView
        ref={(ref) => (webViewRef = ref)}
        source={{ uri: appUrl }}
        style={styles.webView}
        startInLoadingState={true}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
        }}
        renderLoading={() => (
          <View style={styles.webviewLoader}>
            <ActivityIndicator size="small" color="#059669" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 16,
  },
  subText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  webviewLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
