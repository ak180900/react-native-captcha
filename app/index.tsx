import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

const Index: React.FC = () => {
  const [isWebViewVisible, setWebViewVisible] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const onMessage = (event: WebViewMessageEvent) => {
    const token = event.nativeEvent.data;
    console.log('reCAPTCHA token:', token);
    setRecaptchaVerified(true); // Mark the reCAPTCHA as verified
    setWebViewVisible(false);   // Close the WebView after verification
  };

  const recaptchaHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <script type="text/javascript">
          function onSubmit(token) {
            window.ReactNativeWebView.postMessage(token);
          }
        </script>
      </head>
      <body>
        <form>
          <div class="g-recaptcha" 
               data-sitekey="6Le75FIqAAAAAOSw6y4JK2kuCty2E7eT0RIYe1Rw"
               data-callback="onSubmit">
          </div>
        </form>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <Text style={{ color: 'red' }}>index</Text>

      {recaptchaVerified ? (
        <Text style={{ color: 'green' }}>reCAPTCHA Verified!</Text>
      ) : (
        <Text style={{ color: 'orange' }}>Please verify reCAPTCHA below</Text>
      )}

      {isWebViewVisible ? (
        <WebView
          originWhitelist={['*']}
          source={{ html: recaptchaHtml }}
          onMessage={onMessage}
          style={{ height: 400, width: 300 }} // Adjust to fit design
        />
      ) : (
        <Text
          style={{ color: 'blue', marginTop: 20 }}
          onPress={() => setWebViewVisible(true)}
        >
          Open reCAPTCHA
        </Text>
      )}

      <Link href='./profile'>Go to Profile</Link>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
