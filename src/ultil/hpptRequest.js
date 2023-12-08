import axios from 'axios';
export const httpRequest = axios.create({
    baseURL: 'https://workflow-sever.onrender.com',
});
export const get = async (path, headers = {}) => {
    try {
        const response = await httpRequest.get(path, headers);
        return response;
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.status);
            console.error('Error info:', error.response.data);
        } else if (error.request) {
            console.error('No response received from the server.');
        } else {
            console.error('Error:', error.message);
        }
        return error.response;
    }
};
export const post = async (path, option = {}, headers) => {
    try {
        const response = await httpRequest.post(path, option, headers);
        return response;
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.status);
            console.error('Error info:', error.response.data);
        } else if (error.request) {
            console.error('No response received from the server.');
        } else {
            console.error('Error:', error.message);
        }
        return error.response;
    }
};
export const put = async (path, option = {}, headers) => {
    try {
        const response = await httpRequest.put(path, option, headers);
        return response;
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.status);
            console.error('Error info:', error.response.data);
        } else if (error.request) {
            console.error('No response received from the server.');
        } else {
            console.error('Error:', error.message);
        }
        return error.response;
    }
};
export const remove = async (path, option = {}, header) => {
    try {
        const response = await httpRequest.delete(path, option, header);
        return response;
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.status);
            console.error('Error info:', error.response.data);
        } else if (error.request) {
            console.error('No response received from the server.');
        } else {
            console.error('Error:', error.message);
        }
        return error.response;
    }
};
export const patch = async (path, option = {}, headers = {}) => {
    try {
        const response = await httpRequest.patch(path, option, headers);
        return response;
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.status);
            console.error('Error info:', error.response.data);
        } else if (error.request) {
            console.error('No response received from the server.');
        } else {
            console.error('Error:', error.message);
        }
        return error.response;
    }
};
