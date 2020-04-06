const assert = require('assert').strict;

exports.areDeepEqual = (a, b) => {
    try {
        assert.deepStrictEqual(a, b);
        return true;
    } catch(error) {
        if (error.name === 'AssertionError')
            return false;
        throw error;
    }
}