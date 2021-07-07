import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private message = '';
  private messageColor = '';
  private isActive = false;

  constructor() {}

  getMessage() {
    return this.message;
  }

  setMessage(message) {
    this.message = message;
  }

  getMessageColor() {
    return this.messageColor;
  }

  setMessageColor(color) {
    this.messageColor = color;
  }

  getIsActive() {
    return this.isActive;
  }

  setIsActive(isActive) {
    this.isActive = isActive;
  }

  catchHeader(resHeader) {
    this.setIsActive(true);
    if (resHeader.status === 200) {
      this.setMessage('Basarili Bir Sekilde Olusturuldu.');
      this.setMessageColor('green');
    } else if (resHeader.status === 403) {
      this.setMessage('Yetkisiz Erisim');
      this.setMessageColor('red');
    } else {
      this.setMessage('Server error');
      this.setMessageColor('red');
    }
    setTimeout(() => {
      this.setIsActive(false);
    }, 2000);
  }
}
