
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.legalcompasspro',
  appName: 'Правовой Компас',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    hostname: '8dd304f0-898e-4e1f-ad27-7e7205677a58.lovableproject.com',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystorePassword: null,
      keystoreAlias: null,
      keystoreAliasPassword: null,
    },
    minSdkVersion: 22,
    allowMixedContent: true,
    javaVersion: "21",
    targetSdkVersion: 33,
    compileSdkVersion: 33,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#2563eb",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      spinnerColor: "#ffffff"
    }
  }
};

export default config;
