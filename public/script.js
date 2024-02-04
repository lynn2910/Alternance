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
var SERVER_HOST = document.location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+/)
    ? "https://alternance.chamallow.xyz"
    : "http://192.168.1.46:64863";
var is_prod = (/[a-zA-Z0-9]+\.[a-zA-Z]+/).test(document.location.host.toString());
function fetch_companies(n) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var _this = this;
                    fetch("".concat(SERVER_HOST, "/companies?ratio=").concat(n), {
                        method: "POST",
                        mode: "cors",
                        body: query_filter,
                        headers: {
                            "TOKEN": localStorage.getItem("token")
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
                                        return [2 /*return*/, bad_credentials()];
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
function get_company_informations(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var _this = this;
                    var form_data = new FormData();
                    form_data.set("company_id", id);
                    fetch("".concat(SERVER_HOST, "/companies/get_company_informations"), {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "TOKEN": localStorage.getItem("token")
                        },
                        body: form_data
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
                                        return [2 /*return*/, bad_credentials()];
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
var query_filter = new FormData();
function add_companies() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, count, companies, login;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch_companies(N)];
                case 1:
                    _a = _b.sent(), count = _a.count, companies = _a.companies;
                    login = document.querySelectorAll(".login");
                    if (login.length > 0)
                        login.forEach(function (e) { return e.remove(); });
                    // Si N < 1, ça veut dire qu'il n'y avait aucune entreprise
                    // donc on doit retirer l'élément de chargement
                    if (N < 1) {
                        document.getElementById("alternance").innerHTML = "";
                        document.getElementById("count")
                            .innerHTML = "<p><strong>".concat(count, "</strong> r\u00E9sultats</p>");
                    }
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
function apply_current_filter_params() {
    // reset the current filter
    query_filter = new FormData();
    var research_alternance_required = document.getElementById("research_alternance_required");
    query_filter.set("alternance_required", research_alternance_required.checked ? "true" : "false");
    var keyword = document.getElementById("search");
    if (keyword.value !== "")
        query_filter.set("keyword", keyword.value);
}
function apply_filter() {
    document.getElementById("alternance").innerHTML = "<div class=\"loading\"><div class=\"dot-spinner\"><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div><div class=\"dot-spinner__dot\"></div></div><p>Les donn\u00E9es chargent...</p></div>";
    document.getElementById("count").innerHTML = "";
    N = 0;
    apply_current_filter_params();
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
    var html = "\n<div class=\"company\">\n    <div class=\"head\">\n        <h3>".concat(company.host_name_establishment, "</h3>\n        <p>").concat(company.year, "</p>\n    </div>\n    <p class=\"type\"><strong>Type d'entreprise\u00A0: </strong>").concat(company.structure_type, "</p>\n    <p class=\"description\">").concat(company.subject, "</p>\n    <div class=\"localisation\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            <path d=\"M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        </svg>\n        <a target=\"_blank\" href=\"https://www.google.fr/maps/search/").concat(encodeURIComponent(address), "\">").concat(address, "</a>\n    </div>\n\n    <div class=\"bottom\">\n        <button onclick=\"open_company_informations_popup(").concat(company.company_id, ")\" type=\"button\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z\"></path><path d=\"M11 11h2v6h-2zm0-4h2v2h-2z\"></path></svg>\n            Voir toutes les informations\n        </button>\n        <p>Cette offre <strong>").concat(company.research_students != 0 ? "est toujours disponible" : "date de l'ann\u00E9e ".concat(company.year), "</strong></p>\n    </div>\n    \n</div>");
    document.getElementById("alternance").innerHTML += html;
}
function bad_credentials() {
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
function mdp_listener() {
    var pwd = document.getElementById("passwd");
    var key_pressed = false;
    pwd.addEventListener("keydown", function (k) {
        if (!key_pressed)
            key_pressed = true;
        if (k.key === "Enter") {
            if (is_entering_new_password)
                define_new_password();
            else
                login();
        }
    });
    var token = localStorage.getItem("token");
    var credentials = localStorage.getItem("credentials");
    if (token && token.length > 0 && credentials && credentials.length > 0) {
        var parsed_credentials = JSON.parse(atob(credentials));
        var name_1 = parsed_credentials["name"];
        var passwd = parsed_credentials["passwd"];
        login_backend(name_1, passwd);
    }
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
    document.addEventListener("keydown", function (k) {
        if (k.key === "Enter" && !is_logged) {
            if (is_entering_new_password)
                define_new_password();
            else
                login();
        }
        if (k.key === "Escape" && document.getElementById("popup").classList.contains("opened")) {
            close_popup();
        }
    });
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
function credentials_entered(name, passwd) {
    var credentials = btoa(JSON.stringify({ name: name, passwd: passwd }));
    localStorage.setItem("credentials", credentials);
    add_companies();
    auto_scroll_loader();
}
function open_company_informations_popup(id) {
    return __awaiter(this, void 0, void 0, function () {
        var informations, address;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    document.getElementById("popup").classList.add("opened");
                    document.getElementById("popup").classList.add("loading");
                    document.body.style["overflow"] = "hidden";
                    return [4 /*yield*/, get_company_informations(id)];
                case 1:
                    informations = _a.sent();
                    address = "".concat(informations.street_address, " - ").concat(informations.postal_code, " - ").concat(informations.country)
                        .replace(/\s{2,}/g, " ");
                    document.getElementById("map")
                        .setAttribute("src", "https://maps.google.com/maps?q=".concat(encodeURIComponent(address), "&t=&z=13&ie=UTF8&iwloc=&output=embed"));
                    // update contact information in the popup
                    document.getElementById("phone_contact")
                        .textContent = informations.phone.length > 0 ? informations.phone : "Aucun téléphone";
                    document.getElementById("mail_contact")
                        .textContent = informations.email.length > 0 ? informations.email : "Aucun mail";
                    document.getElementById("website_contact")
                        .textContent = informations.website.length > 0 ? informations.website : "Aucun site web";
                    document.getElementById("fax_contact")
                        .textContent = informations.fax.length > 0 ? informations.fax : "Aucun fax";
                    // update localisation information in the popup
                    document.getElementById("name_localisation")
                        .textContent = informations.name.length > 0 ? informations.name : "Aucun nom précisé";
                    document.getElementById("home_address_localisation")
                        .textContent = informations.home_address.length > 0 ? informations.home_address : "Aucune résidence précisée";
                    document.getElementById("street_localisation")
                        .textContent = informations.street_address.length > 0 ? informations.street_address : "Aucune adresse précisée";
                    document.getElementById("cedex_localisation")
                        .textContent = informations.cedex_address.length > 0 ? informations.cedex_address : "Aucun cedex";
                    document.getElementById("postal_code_localisation")
                        .textContent = informations.postal_code.length > 0 ? informations.postal_code : "Aucun code postal précisé";
                    document.getElementById("municipality_localisation")
                        .textContent = informations["location_municipality"].length > 0 ? informations["location_municipality"] : "Aucune commune précisée";
                    document.getElementById("country_localisation")
                        .textContent = informations["location_country"].length > 0 ? informations["location_country"] : "Aucun pays précisé";
                    // update reception service information in the popup
                    document.getElementById("name_reception_service")
                        .textContent = informations["rs.name"].length > 0 ? informations["rs.name"] : "Aucun nom";
                    document.getElementById("home_address_reception_service")
                        .textContent = informations["rs.home_address"].length > 0 ? informations["rs.home_address"] : "Aucune adresse";
                    document.getElementById("street_reception_service")
                        .textContent = "".concat(informations["rs.street_address"], " - ").concat(informations["rs.postal_code"], " - ").concat(informations["rs.location_country"])
                        .replace(/\s{2,}/g, " ");
                    document.getElementById("cedex_reception_service")
                        .textContent = informations["rs.cedex_address"].length > 0 ? informations["rs.cedex_address"] : "Aucun cedex";
                    document.getElementById("postal_code_reception_service")
                        .textContent = informations["rs.postal_code"].length > 0 ? informations["rs.postal_code"] : "Aucun code postal";
                    document.getElementById("municipality_reception_service")
                        .textContent = informations["reception_service_municipality"].length > 0 ? informations["reception_service_municipality"] : "Aucune commune";
                    document.getElementById("country_reception_service")
                        .textContent = informations["reception_service_country"].length > 0 ? informations["reception_service_country"] : "Aucun pays";
                    // update tutors informations
                    document.getElementById("tutor_name")
                        .textContent = informations["t.name"].length > 0 ? informations["t.name"] : "Aucun nom";
                    document.getElementById("tutor_surname")
                        .textContent = informations["surname"].length > 0 ? informations["surname"] : "Aucun prénom";
                    document.getElementById("tutor_function")
                        .textContent = informations["function"].length > 0 ? informations["function"] : "Aucune fonction";
                    document.getElementById("tutor_mail")
                        .textContent = informations["mail"].length > 0 ? informations["mail"] : "Aucun mail";
                    document.getElementById("tutor_phone")
                        .textContent = informations["t.phone"].length > 0 ? informations["t.phone"] : "Aucun téléphone";
                    document.getElementById("popup").classList.remove("loading");
                    return [2 /*return*/];
            }
        });
    });
}
function close_popup() {
    document.getElementById("popup").classList.remove("opened");
    document.body.style["overflow"] = "";
}
var is_entering_new_password = false;
var is_logged = false;
function login() {
    return __awaiter(this, void 0, void 0, function () {
        var name, passwd, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    name = document.getElementById("id_name").value;
                    passwd = document.getElementById("passwd").value;
                    _a = login_backend;
                    _b = [name];
                    return [4 /*yield*/, hashPassword(passwd)];
                case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function login_backend(name, passwd) {
    return __awaiter(this, void 0, void 0, function () {
        var form;
        return __generator(this, function (_a) {
            form = new FormData();
            form.set("name", name);
            form.set("passwd", passwd);
            fetch("".concat(SERVER_HOST, "/auth/login"), {
                body: form,
                method: "POST"
            }).then(function (res) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, data, credentials_base64;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = res.status;
                                switch (_a) {
                                    case 200: return [3 /*break*/, 1];
                                    case 401: return [3 /*break*/, 3];
                                }
                                return [3 /*break*/, 4];
                            case 1: return [4 /*yield*/, res.json()];
                            case 2:
                                data = _b.sent();
                                // set the token in the localStorage
                                localStorage.setItem("token", data["token"]);
                                // don't call await, as this is asynchronous to not block the user interface
                                new_device(name);
                                if (data["is_passwd_default"] == 1) {
                                    credentials_base64 = btoa(JSON.stringify({ name: name, passwd: passwd }));
                                    localStorage.setItem("credentials", credentials_base64);
                                    is_entering_new_password = true;
                                    document.getElementById("id_info").style["display"] = "none";
                                    document.getElementById("login_title")
                                        .textContent = "Définir un nouveau mot de passe";
                                    document.getElementById("passwd")
                                        .setAttribute("placeholder", "Nouveau mot de passe");
                                    document.getElementById("passwd_label")
                                        .textContent = "Nouveau mot de passe";
                                    document.getElementById("passwd").value = "";
                                    document.getElementById("login_btn").textContent = "Définir le nouveau mot de passe";
                                    document.getElementById("login_btn").onclick = function () { return define_new_password(); };
                                }
                                else {
                                    is_logged = true;
                                    credentials_entered(name, passwd);
                                }
                                return [3 /*break*/, 5];
                            case 3:
                                {
                                    alert("Mot de passe ou identifiant incorrect");
                                    return [3 /*break*/, 5];
                                }
                                _b.label = 4;
                            case 4:
                                alert("Erreur lors de la connexion: CODE " + res.status.toString());
                                _b.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            }, function (e) {
                alert("Erreur lors de la connexion: " + e.toString());
            });
            return [2 /*return*/];
        });
    });
}
function new_device(id) {
    return __awaiter(this, void 0, void 0, function () {
        var previous_connections, parsed_previous_connections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    previous_connections = localStorage.getItem("previous_connections") || "";
                    parsed_previous_connections = previous_connections.split(/,/g).filter(function (e) { return e.length > 0; });
                    console.log(parsed_previous_connections, id);
                    if (!!parsed_previous_connections.includes(id)) return [3 /*break*/, 2];
                    if (parsed_previous_connections.length > 0)
                        previous_connections += ",".concat(id);
                    else
                        previous_connections = id;
                    localStorage.setItem("previous_connections", previous_connections);
                    // tell the api that a new device is connected to the account
                    return [4 /*yield*/, fetch("".concat(SERVER_HOST, "/auth/new_device"), {
                            headers: {
                                "TOKEN": localStorage.getItem("token")
                            }
                        })];
                case 1:
                    // tell the api that a new device is connected to the account
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function define_new_password() {
    return __awaiter(this, void 0, void 0, function () {
        var new_passwd, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    is_logged = true;
                    return [4 /*yield*/, hashPassword(document.getElementById("passwd").value)];
                case 1:
                    new_passwd = _a.sent();
                    data = new FormData();
                    data.set("new_passwd", new_passwd);
                    fetch("".concat(SERVER_HOST, "/auth/define_new_password"), {
                        method: "POST",
                        body: data,
                        headers: {
                            "TOKEN": localStorage.getItem("token")
                        }
                    }).then(function (res) {
                        return __awaiter(this, void 0, void 0, function () {
                            var credentials;
                            return __generator(this, function (_a) {
                                switch (res.status) {
                                    case 200: {
                                        alert("Le mot de passe a été modifié avec succès");
                                        credentials = JSON.parse(atob(localStorage.getItem("credentials")));
                                        credentials_entered(credentials["name"], new_passwd);
                                        break;
                                    }
                                    case 401: {
                                        alert("Vous n'êtes pas connecté");
                                        bad_credentials();
                                        break;
                                    }
                                    default:
                                        alert("Erreur lors de la connexion: CODE " + res.status.toString());
                                }
                                return [2 /*return*/];
                            });
                        });
                    }, function (e) {
                        alert("Erreur lors de la connexion: " + e.toString());
                    });
                    return [2 /*return*/];
            }
        });
    });
}
