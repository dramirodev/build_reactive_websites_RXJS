import { fromEvent, merge, ReplaySubject, Subject, AsyncSubject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { webSocket } from 'rxjs/webSocket';
import { map, filter, tap, switchMap, withLatestFrom, scan } from 'rxjs/operators';
import { showLoadingSpinner, closeLoginModal, renderRoomButtons, setActiveRoom, writeMessageToPage, setUnread } from './chatlib';

// Login modal
let loginBtn = <HTMLElement>document.querySelector('#login-button');
let loginInput = <HTMLInputElement>document.querySelector('#login-input');

// Sending a message
let msgBox = <HTMLInputElement>document.querySelector('#msg-box');
let sendBtn = <HTMLElement>document.querySelector('#send-button');

let roomList = <HTMLElement>document.querySelector('#room-list');

// ===== Websocket =====

// ===== Login =====

// ===== Rooms =====

// ===== Unread =====

// ===== Sending Messages =====

