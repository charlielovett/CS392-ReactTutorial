import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyAPwao3DmcfOgoOd3-GyAmMapZNWXLhYhE",
    authDomain: "cs392-reacttutorial.firebaseapp.com",
    databaseURL: "https://cs392-reacttutorial-default-rtdb.firebaseio.com",
    projectId: "cs392-reacttutorial",
    storageBucket: "cs392-reacttutorial.appspot.com",
    messagingSenderId: "103874154782",
    appId: "1:103874154782:web:8203f65eda2d504f26f90f",
    measurementId: "G-7ML9R8PVKN"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => (
        onValue(ref(database, path), (snapshot) => {
            setData(snapshot.val());
        }, (error) => {
            setError(error);
        })
    ), [path]);

    return [data, error];
};

const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
        update(ref(database, path), value)
            .then(() => setResult(makeResult()))
            .catch((error) => setResult(makeResult(error)))
    }, [database, path]);

    return [updateData, result];
};