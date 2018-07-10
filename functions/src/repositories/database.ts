import * as admins from 'firebase-admin';

admins.initializeApp();

export const database = admins.database();