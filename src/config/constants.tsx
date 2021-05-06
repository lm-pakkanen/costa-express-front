const constants = {
    BASE_URI: 'https://costaexpress.fi',
    BASE_URI_DEV: 'http://localhost:3000',
    BASE_API_URI: 'https://api.harriot.fi/',
    BASE_API_URI_DEV: 'http://api.harriot.fi/',
    WEBMASTER_EMAIL: 'jukka.pakkanen@qnet.fi',
    ANALYTICS: {
        GOOGLE: {
            TRACKING_ID: 'UA-xxxxxxx'
        }
    },
    PASSWORD_STRENGTH_LEVEL: 1,
    COOKIES_LEVELS: {
        NONE: -1,
        ALL: 0,
        BASIC: 1,
        ANALYTICS: 2,
        MARKETING: 3
    },
    API: {
        ENDPOINTS: {}
    }
};

// TODO: Change placeholder information when ready
// TODO: Change to production URI when ready
constants.BASE_URI = constants.BASE_URI_DEV;
constants.BASE_API_URI = constants.BASE_API_URI_DEV;

export default constants;