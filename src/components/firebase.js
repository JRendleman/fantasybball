import app from 'firebase/app';

class Firebase {
    constructor() {

        const config = {
            apiKey: 'AIzaSyCeAMBVZrBKH3-QAToBNsEGJ2IgLOKmQK4',
            authDomain: 'fantasy-bball-metrix.firebaseapp.com',
            databaseURL: 'https://fantasy-bball-metrix.firebaseio.com',
            projectId: 'fantasy-bball-metrix',
            storageBucket: 'fantasy-bball-metrix.appspot.com',
            messagingSenderId: '923062709518'
        };

        app.initializeApp(config);

        this.db = app.database();

    }
}

export default Firebase;