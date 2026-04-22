import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';
import { addIcons } from 'ionicons';
import { add, arrowBackOutline, chatbubblesOutline, logOutOutline, logoWechat, peopleOutline, personCircleOutline, send } from 'ionicons/icons';


addIcons({
  'logo-wechat': logoWechat,
  add,
  'log-out-outline': logOutOutline,
  'chatbubbles-outline': chatbubblesOutline,
  'people-outline': peopleOutline,
  'person-circle-outline': personCircleOutline,
  'arrow-back-outline': arrowBackOutline,
  send
});

bootstrapApplication(App, appConfig).then(async () => {
  // Only run on native platforms
    if (Capacitor.isNativePlatform()) {
      await Keyboard.setResizeMode({
        mode: KeyboardResize.Ionic,
      });
    }
}).catch((err) => console.error(err));