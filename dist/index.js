"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// const { addDoc } = require('firebase/firestore');
// const bodyParser = require('body-parser');
// const express = require("express");
// const cors = require("cors");
// const User = require("./config");
// import { express } from 'express'
var body_parser_1 = require("body-parser");
var cors_1 = tslib_1.__importDefault(require("cors"));
var express_1 = tslib_1.__importDefault(require("express"));
var config_1 = require("./utils/config");
var corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:51759/'],
};
var app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({
    extended: true,
}));
app.use((0, cors_1.default)(corsOptions));
app.post("/Create", function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, docRef, _data;
    return tslib_1.__generator(this, function (_a) {
        try {
            data = req.body;
            docRef = config_1.usersDB.doc();
            _data = {
                id: docRef.id,
            };
            docRef.set(_data);
            res.send({ userId: docRef.id });
        }
        catch (err) {
            res.status(404).send({ msg: "failed" });
        }
        return [2 /*return*/];
    });
}); });
app.get("/Get/:id", function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var response, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, config_1.linkDb.doc(req.params.id).get()];
            case 1:
                response = _a.sent();
                console.log(response.data());
                res.send(response.data());
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.send({ msg: "failed" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/GetLink", function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, docRef, _data, err_2;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = req.body;
                docRef = config_1.linkDb.doc();
                _data = {
                    url: data.url,
                    id: docRef.id,
                    userId: data.userId
                };
                console.log(_data);
                return [4 /*yield*/, docRef.set(_data)];
            case 1:
                _a.sent();
                res.send({ id: docRef.id });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2.message);
                res.send({ msg: "failed" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/MyUrls", function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, retData_1, urls, err_3;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = req.body;
                retData_1 = [];
                return [4 /*yield*/, config_1.linkDb.where('userId', '==', data.userId).get()];
            case 1:
                urls = _a.sent();
                urls.docs.forEach(function (doc) {
                    retData_1.push(doc.data());
                    console.log(doc.id, ' => ', doc.data());
                });
                res.send({ url: retData_1 });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.send({ msg: "failed" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(9999, function () { console.log(" listen in 9999"); });
//# sourceMappingURL=index.js.map