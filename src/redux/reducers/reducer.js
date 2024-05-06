import { combineReducers } from 'redux';
import domainreducer from './domainreducer';
import notificationreducer from './notificationreducer';

export default combineReducers({
    domainreducer: domainreducer,
    notificationreducer: notificationreducer
});
