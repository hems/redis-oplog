// https://github.com/luin/ioredis#connect-to-redis
import Config from './config';
import extendMongoCollection from './mongo/extendMongoCollection';
import RedisSubscriptionManager from './redis/RedisSubscriptionManager';
import publishWithRedis from './publishWithRedis';

let isInitialized = false;

export default (config = {}) => {
    if (isInitialized) {
        throw 'You cannot initialize RedisOplog twice.';
    }

    isInitialized = true;

    _.extend(Config, config, {
        isInitialized: true,
        oldPublish: Meteor.publish,
    });

    extendMongoCollection();

    Meteor.publishWithRedis = publishWithRedis.bind(Meteor);

    if (Config.overridePublishFunction) {
        Meteor.publish = Meteor.publishWithRedis;
    }

    RedisSubscriptionManager.init();
}
