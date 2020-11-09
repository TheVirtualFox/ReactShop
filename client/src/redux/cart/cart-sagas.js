import { all, call, takeLatest, put } from 'redux-saga/effects';

import CartActionsTypes from './cart-types';
import UserActionTypes from '../user/user-types';
import { clearCard } from "./cart-actions";

export function* clearCartOnSignOut() {
    yield put(clearCard());
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
    yield (all([
        call(onSignOutSuccess)
    ]));
}