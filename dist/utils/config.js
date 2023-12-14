"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkDb = exports.usersDB = void 0;
var tslib_1 = require("tslib");
var firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
var key_json_1 = tslib_1.__importDefault(require("./key.json"));
console.log(typeof key_json_1.default);
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(key_json_1.default)
});
exports.usersDB = firebase_admin_1.default.firestore().collection("Users");
exports.linkDb = firebase_admin_1.default.firestore().collection("Links");
//# sourceMappingURL=config.js.map