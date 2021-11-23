import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private fireStorage: AngularFireStorage) {}

  handleFiles = async (user: User, uid: string, files: Array<File>) =>
    await Promise.all(
      Array.from(files).map(async (file) => {
        let url = await this.uploadAndGetLink(uid, file);
        user.img_urls.push(url);
      })
    );

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
