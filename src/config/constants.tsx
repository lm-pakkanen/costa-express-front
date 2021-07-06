const constants = {
    BASE_URI: '',
    BASE_API_URI: '',
    COOKIES_LEVELS: {
        NONE: -1,
        BASIC: 1,
        ANALYTICS: 2,
        MARKETING: 3,
    },
    API: {
        ENDPOINTS: {

        }
    }
};

if (process.env.NODE_ENV === 'development') {
    constants.BASE_URI = process.env.REACT_APP_BASE_URI_DEV ?? '';
    constants.BASE_API_URI = process.env.REACT_APP_BASE_API_URI_DEV ?? '';
} else {
    constants.BASE_URI = process.env.REACT_APP_BASE_URI ?? '';
    constants.BASE_API_URI = process.env.REACT_APP_BASE_API_URI ?? '';
}

export default constants;