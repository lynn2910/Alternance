var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SERVER_HOST = "http://172.21.197.80:64873";
function fetch_companies(n) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var _this = this;
                    fetch("".concat(SERVER_HOST, "/companies?ratio=").concat(n, "&passwd=").concat(given_mdp).concat(query_filter.length > 0 ? "&".concat(query_filter) : ""), {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(res.status == 200)) return [3 /*break*/, 2];
                                    _a = resolve;
                                    return [4 /*yield*/, res.json()];
                                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                                case 2:
                                    if (res.status == 401)
                                        return [2 /*return*/, bad_password()];
                                    else
                                        return [2 /*return*/, reject()];
                                    _b.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }, reject);
                })];
        });
    });
}
function get_companies_count() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var _this = this;
                    fetch("".concat(SERVER_HOST, "/companies/get_count?passwd=").concat(given_mdp).concat(query_filter.length > 0 ? "&".concat(query_filter) : ""), {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(res.status == 200)) return [3 /*break*/, 2];
                                    _a = resolve;
                                    return [4 /*yield*/, res.json()];
                                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                                case 2:
                                    if (res.status == 401)
                                        return [2 /*return*/, bad_password()];
                                    else
                                        return [2 /*return*/, reject()];
                                    _b.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }, reject);
                })];
        });
    });
}
var N = 0;
var query_filter = "";
function add_companies() {
    return __awaiter(this, void 0, void 0, function () {
        var companies, login, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch_companies(N)];
                case 1:
                    companies = _a.sent();
                    login = document.querySelectorAll(".login");
                    if (login.length > 0)
                        login.forEach(function (e) { return e.remove(); });
                    if (!(N < 1)) return [3 /*break*/, 3];
                    document.getElementById("alternance").innerHTML = "";
                    if (!(companies.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, get_companies_count()];
                case 2:
                    count = _a.sent();
                    document.getElementById("count")
                        .innerHTML = "<p><strong>".concat(count, "</strong> r\u00E9sultats</p>");
                    _a.label = 3;
                case 3:
                    if (companies.length > 0) {
                        N++;
                        companies.forEach(add_company);
                    }
                    else if (N < 1) {
                        document.getElementById("alternance").innerHTML += "<p>Aucune entreprise ne correspond à votre recherche</p>";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function get_filter_query() {
    var query = "";
    var research_alternance_required = document.getElementById("research_alternance_required");
    console.log(research_alternance_required.checked);
    research_alternance_required.checked ? query += "alternance_required=true" : query += "alternance_required=false";
    var keyword = document.getElementById("search");
    if (keyword.value !== "") {
        if (query.length > 0)
            query += "&";
        query += "keyword=".concat(encodeURIComponent(keyword.value));
    }
    return query;
}
function apply_filter() {
    document.getElementById("alternance").innerHTML = "<div class=\"loading\"><div class=\"dot-spinner\"><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div></div><p>Les donn\u00E9es chargent...</p></div>";
    document.getElementById("count").innerHTML = "";
    N = 0;
    query_filter = get_filter_query();
    add_companies().then(function () {
        console.log("Filter applied !");
    });
}
function clear_filter() {
    var research_alternance_required = document.getElementById("research_alternance_required");
    research_alternance_required.checked = false;
    var keyword = document.getElementById("search");
    keyword.value = "";
    apply_filter();
}
function add_company(company) {
    var address = "".concat(company.street_address, " - ").concat(company.postal_code, " - ").concat(company.country)
        .replace(/\s{2,}/g, " ");
    // 3 RUE DU DOCTEUR FRERY - CS 50199, 90000 BELFORT CEDEX, FRANCE
    var html = "\n<div class=\"company\">\n    <div class=\"head\">\n        <h3>".concat(company.host_name_establishment, "</h3>\n        <p>").concat(company.year, "</p>\n    </div>\n    <p class=\"type\"><strong>Type d'entreprise\u00A0: </strong>").concat(company.structure_type, "</p>\n    <p class=\"description\">").concat(company.subject, "</p>\n    <div class=\"localisation\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            <path d=\"M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        </svg>\n        <a target=\"_blank\" href=\"https://www.google.fr/maps/search/").concat(encodeURIComponent(address), "\">").concat(address, "</a>\n    </div>\n\n    <button type=\"button\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z\"></path><path d=\"M11 11h2v6h-2zm0-4h2v2h-2z\"></path></svg>\n        Voir toutes les informations\n    </button>\n</div>");
    document.getElementById("alternance").innerHTML += html;
}
function bad_password() {
    window.location.reload();
}
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function () {
        var encoder, data, hashBuffer, hashArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encoder = new TextEncoder();
                    data = encoder.encode(password);
                    return [4 /*yield*/, crypto.subtle.digest('SHA-256', data)];
                case 1:
                    hashBuffer = _a.sent();
                    hashArray = Array.from(new Uint8Array(hashBuffer));
                    return [2 /*return*/, hashArray.map(function (byte) { return byte.toString(16).padStart(2, '0'); }).join('')];
            }
        });
    });
}
var given_mdp = "";
function mdp_listener() {
    var pwd = document.getElementById("passwd");
    pwd.addEventListener("keydown", function (k) {
        if (k.key === "Enter") {
            var passwd = pwd.value;
            hashPassword(passwd).then(function (hash) {
                given_mdp = hash;
                console.log(given_mdp);
                code_entered();
            });
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    mdp_listener();
    document.getElementById("apply_filter")
        .addEventListener("click", apply_filter);
    document.getElementById("clear_filter")
        .addEventListener("click", clear_filter);
    document.getElementById("filter_container")
        .addEventListener("keydown", function (k) {
        if (k.key === "Enter") {
            apply_filter();
        }
    });
});
document.addEventListener("keydown", function (k) {
    if (k.key === "Enter" && given_mdp === "") {
        var passwd = document.getElementById("passwd");
        hashPassword(passwd.value).then(function (hash) {
            given_mdp = hash;
            console.log(given_mdp);
            code_entered();
        });
    }
});
function auto_scroll_loader() {
    var el = document.getElementById("fuck_this_shit");
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth));
    }
    window.addEventListener('scroll', function () {
        if (isElementInViewport(el)) {
            add_companies();
        }
    });
}
function code_entered() {
    add_companies();
    auto_scroll_loader();
}
