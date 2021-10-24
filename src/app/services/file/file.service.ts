import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private fireStorage: AngularFireStorage) {}

  uploadAndGetLink = async (uid: string, file: File): Promise<string> => {
    return await this.fireStorage
      .upload(uid + '/' + file.name, file)
      .then(async () => {
        return await this.fireStorage.storage
          .ref(uid + '/' + file.name)
          .getDownloadURL()
          .then((url: string) => url);
      });
  };
}
