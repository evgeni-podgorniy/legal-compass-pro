
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.legalcompasspro',
  appName: 'legal-compass-pro',
  webDir: 'dist',
  server: {
    url: 'https://8dd304f0-898e-4e1f-ad27-7e7205677a58.lovableproject.com?forceHideBadge=true',
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
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
