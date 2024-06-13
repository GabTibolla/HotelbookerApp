import axios from 'axios';
import { Platform } from 'react-native';

const getBaseURL = () => {
    if (Platform.OS === 'ios') {
        return 'http://192.168.100.7:8080';
    } else if (Platform.OS === 'android') {
        return 'http://192.168.100.7:8080';
        // for android emulator 'http://10.0.2.2:3001'
    }
};

const instance = axios.create({
    baseURL: getBaseURL(),
});

export default instance;
