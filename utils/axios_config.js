import axios from 'axios';
import { Platform } from 'react-native';

const getBaseURL = () => {
    if (Platform.OS === 'ios') {
        return 'http://localhost:3001';
    } else if (Platform.OS === 'android') {
        return 'http://172.30.132.204:3001';
        // for android emulator 'http://10.0.2.2:3001'
    }
};

const instance = axios.create({
    baseURL: getBaseURL(),
});

export default instance;
