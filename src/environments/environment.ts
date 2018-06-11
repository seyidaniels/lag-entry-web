// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBSBbMBwztFWpWKfqkMaEwu0nvstUibmKM',
    authDomain: 'lagentry-web.firebaseapp.com',
    databaseURL: 'https://lagentry-web.firebaseio.com',
    projectId: 'lagentry-web',
    storageBucket: 'lagentry-web.appspot.com',
    messagingSenderId: '869275687060'
  }
};
