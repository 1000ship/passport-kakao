"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOptions = void 0;
var passport_oauth2_1 = __importDefault(require("passport-oauth2"));
var util_1 = require("util");
var DEFAULT_CLIENT_SECRET = 'kakao';
var OAUTH_HOST = 'https://kauth.kakao.com';
var USER_PROFILE_URL = 'https://kapi.kakao.com/v2/user/me';
var buildOptions = function (options) {
    options.authorizationURL = "".concat(OAUTH_HOST, "/oauth/authorize");
    options.tokenURL = "".concat(OAUTH_HOST, "/oauth/token");
    if (!options.clientSecret) {
        options.clientSecret = DEFAULT_CLIENT_SECRET;
    }
    options.scopeSeparator = options.scopeSeparator || ',';
    options.customHeaders = options.customHeaders || {};
    if (!options.customHeaders['User-Agent']) {
        options.customHeaders['User-Agent'] = options.userAgent || 'passport-kakao';
    }
    return options;
};
exports.buildOptions = buildOptions;
/**
 * KaKaoStrategy 생성자 함수.<br/>
 * @param options.clientID 필수. kakao rest app key.
 * @param options.callbackURL 필수. 로그인 처리 후 호출할 URL
 * @param verify
 * @constructor
 */
function Strategy(options, verify) {
    if (options === void 0) { options = {}; }
    passport_oauth2_1.default.call(this, (0, exports.buildOptions)(options), verify);
    this.name = 'kakao';
    this._userProfileURL = USER_PROFILE_URL;
}
/**
 * `OAuth2Stragegy`를 상속 받는다.
 */
(0, util_1.inherits)(Strategy, passport_oauth2_1.default);
/**
 * kakao 사용자 정보를 얻는다.<br/>
 * 사용자 정보를 성공적으로 조회하면 아래의 object가 done 콜백함수 호출과 함꼐 넘어간다.
 *
 *   - `provider`         kakao 고정
 *   - `id`               kakao user id number
 *   - `username`         사용자의 kakao nickname
 *   - `_raw`             json string 원문
 *   _ `_json`            json 원 데이터
 *
 * @param {String} accessToken
 * @param {Function} done
 */
Strategy.prototype.userProfile = function (accessToken, done) {
    this._oauth2.get(this._userProfileURL, accessToken, function (err, body) {
        if (err) {
            return done(err);
        }
        try {
            var json = JSON.parse(body);
            // 카카오톡이나 카카오스토리에 연동한 적이 없는 계정의 경우
            // properties가 비어있다고 한다. 없을 경우의 처리
            var properties = json.properties || {
                nickname: '미연동 계정',
            };
            var profile = {
                provider: 'kakao',
                id: json.id,
                username: properties.nickname,
                displayName: properties.nickname,
                _raw: body,
                _json: json,
            };
            return done(null, profile);
        }
        catch (e) {
            return done(e);
        }
    });
};
Strategy.prototype.authorizationParams = function (options) {
    var params = {};
    if (options.client_id)
        params.client_id = options.client_id;
    if (options.redirect_uri)
        params.redirect_uri = options.redirect_uri;
    if (options.response_type)
        params.response_type = options.response_type;
    if (options.scope)
        params.scope = options.scope;
    if (options.prompt)
        params.prompt = options.prompt;
    if (options.login_hint)
        params.login_hint = options.login_hint;
    if (options.service_terms)
        params.service_terms = options.service_terms;
    if (options.state)
        params.state = options.state;
    if (options.nonce)
        params.nonce = options.nonce;
    return params;
};
exports.default = Strategy;
