import config from 'config'; 

const  _config =  {
    get: (str) => config.get(str),
    util:config.util,
    has:  (str) => config.util(str),
    // placeholder/mock for getting secure config values like db passwords
    secure:  (str) => config.get(str),
    _: config
} 
export default _config;