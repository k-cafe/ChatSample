"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admins = require("firebase-admin");
admins.initializeApp();
exports.database = admins.database();
//# sourceMappingURL=database.js.map