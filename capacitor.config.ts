
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8dd304f0898e4e1fad277e7205677a58',
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
    }
  }
};

export default config;
