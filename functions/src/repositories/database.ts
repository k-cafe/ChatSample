import * as admins from 'firebase-admin';

admins.app();

export const database = admins.database();