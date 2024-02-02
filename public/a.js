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
var Filter = /** @class */ (function () {
    function Filter() {
        this.keyword = "";
        this.recherche_alternant = false;
    }
    return Filter;
}());
var CompanyLocation = /** @class */ (function () {
    function CompanyLocation(home_address, street_address, lib_cedex_address, postal_code, home_establishment_municipality, country) {
        this.home_address = home_address;
        this.street_address = street_address;
        this.lib_cedex_address = lib_cedex_address;
        this.postal_code = postal_code;
        this.home_establishment_municipality = home_establishment_municipality;
        this.country = country;
    }
    return CompanyLocation;
}());
var CompanyContact = /** @class */ (function () {
    function CompanyContact(email, website, phone, fax) {
        this.email = email;
        this.website = website;
        this.phone = phone;
        this.fax = fax;
    }
    return CompanyContact;
}());
var ProfessionalTutor = /** @class */ (function () {
    function ProfessionalTutor(name, surname, mail, phone, function_) {
        this.name = name;
        this.surname = surname;
        this.mail = mail;
        this.phone = phone;
        this.function = function_;
    }
    return ProfessionalTutor;
}());
var ReceptionService = /** @class */ (function () {
    function ReceptionService(name, home_address, street_address, cedex_address, postal_code, home_establishment_municipality, country) {
        this.name = name;
        this.home_address = home_address;
        this.street_address = street_address;
        this.cedex_address = cedex_address;
        this.postal_code = postal_code;
        this.home_establishment_municipality = home_establishment_municipality;
        this.country = country;
    }
    return ReceptionService;
}());
var Company = /** @class */ (function () {
    function Company(year, subject, host_name_establishment, siret, location, reception_service, contact, professional_tutor, juridical_status, structure_type, staff, naf_code) {
        this.year = year;
        this.subject = subject;
        this.host_name_establishment = host_name_establishment;
        this.siret = siret;
        this.location = location;
        this.juridical_status = juridical_status;
        this.structure_type = structure_type;
        this.staff = staff;
        this.naf_code = naf_code;
        this.reception_service = reception_service;
        this.contact = contact;
        this.professional_tutor = professional_tutor;
    }
    return Company;
}());
// [
//     'Année',
//     'Sujet',
//     "Nom Etablissement d'accueil",
//     'Siret',
//     'Adresse Residence',
//     'Adresse Voie',
//     'Adresse lib cedex',
//     'Code Postal',
//     "Etablissement d'Accueil - Commune",
//     'Pays',
//     'Statut Juridique',
//     'Type de Structure',
//     'Effectif',
//     'Code NAF',
//     'Téléphone',
//     'Fax',
//     'Mail',
//     'SiteWeb',
//     "Service d'accueil - Nom",
//     "Service d'accueil - Residence",
//     "Service d'accueil - Voie",
//     "Service d'accueil - Cedex",
//     "Service d'accueil - Code postal",
//     "Service d'accueil - Commune",
//     "Service d'accueil - Pays",
//     'Nom Tuteur Professionnel',
//     'Prenom Tuteur Professionnel',
//     'Mail Tuteur professionnel',
//     'Téléphone Tuteur Professionnel',
//     'Fonction Tuteur Professionnel',
// ]
function parse_companies(filter) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, []];
        });
    });
}
