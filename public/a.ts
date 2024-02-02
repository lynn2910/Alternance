class Filter {
    public keyword: string = "";
    public recherche_alternant: boolean = false;
}

class CompanyLocation {
    public home_address: string;
    public street_address: string;
    public lib_cedex_address: string;
    public postal_code: number;
    public home_establishment_municipality: string;
    public country: string;

    constructor(home_address: string,
                street_address: string,
                lib_cedex_address: string,
                postal_code: number,
                home_establishment_municipality: string,
                country: string) {
        this.home_address = home_address;
        this.street_address = street_address;
        this.lib_cedex_address = lib_cedex_address;
        this.postal_code = postal_code;
        this.home_establishment_municipality = home_establishment_municipality;
        this.country = country;
    }
}

class CompanyContact {
    public email: string;
    public website: string;
    public phone: string;
    public fax: string | undefined;

    constructor(email: string,
                website: string,
                phone: string,
                fax: string | undefined) {
        this.email = email;
        this.website = website;
        this.phone = phone;
        this.fax = fax;
    }
}

class ProfessionalTutor {
    public name: string;
    public surname: string;
    public mail: string;
    public phone: string;
    public function: string;

    constructor(name: string,
                surname: string,
                mail: string,
                phone: string,
                function_: string) {
        this.name = name;
        this.surname = surname;
        this.mail = mail;
        this.phone = phone;
        this.function = function_;
    }
}

class ReceptionService  {
    public name: string;
    public home_address: string;
    public street_address: string;
    public cedex_address: string;
    public postal_code: number;
    public home_establishment_municipality: string;
    public country: string;

    constructor(name: string,
                home_address: string,
                street_address: string,
                cedex_address: string,
                postal_code: number,
                home_establishment_municipality: string,
                country: string) {
        this.name = name;
        this.home_address = home_address;
        this.street_address = street_address;
        this.cedex_address = cedex_address;
        this.postal_code = postal_code;
        this.home_establishment_municipality = home_establishment_municipality;
        this.country = country;
    }
}

class Company {
    // Formaté au format '2022/2023' par exemple
    public year: string;
    public subject: string;

    public host_name_establishment: string;
    public siret: number;

    public location: CompanyLocation;
    public reception_service: ReceptionService;
    public contact: CompanyContact;
    public professional_tutor: ProfessionalTutor;

    public juridical_status: string;
    public structure_type: string;
    public staff: string;

    public naf_code: string;

    constructor(year: string,
                subject: string,
                host_name_establishment: string,
                siret: number,
                location: CompanyLocation,
                reception_service: ReceptionService,
                contact: CompanyContact,
                professional_tutor: ProfessionalTutor,
                juridical_status: string,
                structure_type: string,
                staff: string,
                naf_code: string) {
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
}


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

async function parse_companies(filter: Filter): Promise<Company[]> {
    return []
}