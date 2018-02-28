const fetch = require('jest-fetch-mock');
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

function createStorage() {
  let store = {};

  const clear = () => {
    store = {};
  };

  const getItem = key => store[key] || null;

  const removeItem = key => delete store[key];

  const setItem = (key, value) => {
    store[key] = value.toString();
  };

  return {
    clear,
    getItem,
    removeItem,
    setItem,
  };
}

global.fetch = fetch;
global.sessionStorage = createStorage();
