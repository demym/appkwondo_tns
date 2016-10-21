'use strict';
function serialize(data) {
    switch (typeof data) {
        case 'string':
        case 'boolean':
        case 'number':
            return data;
        case 'object':
            return data;
        default:
            return null;
    }
}
exports.serialize = serialize;
function deserialize(nativeData) {
    if (nativeData === null || typeof nativeData !== 'object') {
        return nativeData;
    }
    return {};
}
exports.deserialize = deserialize;
//# sourceMappingURL=helpers.js.map