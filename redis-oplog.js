import publishWithRedis from './lib/publishWithRedis';
import { RedisPipe, Events } from './lib/constants';
import { Meteor } from 'meteor/meteor';
import stats from './lib/utils/stats';
import init from './lib/init';
import SyntheticMutator from './lib/mongo/SyntheticMutator';

const RedisOplog = {
    init,
    stats
};

// Warnings
Meteor.startup(function () {
    if (Package['insecure']) {
        console.log("RedisOplog does not support the insecure package.")
    }
});

export {
    RedisOplog,
    SyntheticMutator,
    publishWithRedis,
    RedisPipe,
    Events
}

if (Meteor.settings.redisOplog) {
    init(Meteor.settings.redisOplog);
}
