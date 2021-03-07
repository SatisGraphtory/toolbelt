import {exiftool} from 'exiftool-vendored';

export namespace exe {
  export const getExeVersion = (exePath: string) => {
    return new Promise((resolve, reject) => {
      exiftool
        .read(exePath)
        .then((tags: any) => {
          const match = tags.ProductVersion.match(/[0-9]{5}[0-9]+$/)![0];
          resolve(match);
        })
        .catch(err => {
          console.error('Something terrible happened: ', err);
          reject(err);
        });
    })
  }

}
