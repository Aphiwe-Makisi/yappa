import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';
import { addIcons } from 'ionicons';
import { logoWechat } from 'ionicons/icons';


addIcons({
  'logo-wechat': logoWechat
});

bootstrapApplication(App, appConfig).then(async () => {
  // Only run on native platforms
    if (Capacitor.isNativePlatform()) {
      await Keyboard.setResizeMode({
        mode: KeyboardResize.Ionic,
      });
    }
}).catch((err) => console.error(err));