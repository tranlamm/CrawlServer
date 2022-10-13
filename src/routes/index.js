import jobReducer from './job.js';

export default (app) => {
    app.use('/jobs', jobReducer);
};
