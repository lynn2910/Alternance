const SERVER_HOST: string = document.location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+/)
    ? "https://alternance.chamallow.xyz"
    : "http://192.168.1.46:64863";

let is_prod = (/[a-zA-Z0-9]+\.[a-zA-Z]+/).test(document.location.host.toString());

async function fetch_companies(n: number): Promise<{ count: number, companies: Array<Object> }> {
    return new Promise(function(resolve, reject){
        fetch(
        `${SERVER_HOST}/companies?ratio=${n}`,
        {
                method: "POST",
                mode: "cors",
                body: query_filter,
                headers: {
                    "TOKEN": localStorage.getItem("token")
                }
            }
        ).then(
            async (res) => {
                if (res.status == 200)
                    return resolve(await res.json())
                else if (res.status == 401)
                    return bad_credentials()
                else
                    return reject()
            },
            reject
        )
    })
}

async function get_company_informations(id: string): Promise<any> {
    return new Promise(function(resolve, reject){
        let form_data = new FormData();
        form_data.set("company_id", id)

        fetch(
        `${SERVER_HOST}/companies/get_company_informations`,
        {
                method: "POST",
                mode: "cors",
                headers: {
                    "TOKEN": localStorage.getItem("token")
                },
                body: form_data
            }
        ).then(
            async (res) => {
                if (res.status == 200)
                    return resolve(await res.json())
                else if (res.status == 401)
                    return bad_credentials()
                else
                    return reject()
            },
            reject
        )
    })
}


let N: number = 0;
let query_filter: FormData = new FormData();

async function add_companies(){
    let { count, companies } = await fetch_companies(N);

    let login = document.querySelectorAll(".login");
    if (login.length > 0)
        login.forEach((e) => e.remove())

    // Si N < 1, ça veut dire qu'il n'y avait aucune entreprise
    // donc on doit retirer l'élément de chargement
    if (N < 1) {
        document.getElementById("alternance").innerHTML = "";
        document.getElementById("count")
            .innerHTML = `<p><strong>${count}</strong> résultats</p>`
    }

    if (companies.length > 0) {
        N++;
        companies.forEach(add_company)
    } else if (N < 1) {
        document.getElementById("alternance").innerHTML += "<p>Aucune entreprise ne correspond à votre recherche</p>"
    }
}

function apply_current_filter_params() {
    // reset the current filter
    query_filter = new FormData();

    let research_alternance_required = document.getElementById("research_alternance_required") as HTMLInputElement;
    query_filter.set("alternance_required", research_alternance_required.checked ? "true" : "false");

    let keyword = document.getElementById("search") as HTMLInputElement;
    if (keyword.value !== "")
        query_filter.set("keyword", keyword.value);
}

function apply_filter(){
    document.getElementById("alternance").innerHTML = `<div class="loading"><div class="dot-spinner"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div><p>Les données chargent...</p></div>`;
    document.getElementById("count").innerHTML = "";

    N = 0;
    apply_current_filter_params();

    add_companies().then(function(){
        console.log("Filter applied !")
    })
}

function clear_filter(){
    let research_alternance_required = document.getElementById("research_alternance_required") as HTMLInputElement;
    research_alternance_required.checked = false;

    let keyword = document.getElementById("search") as HTMLInputElement;
    keyword.value = "";

    apply_filter();
}

function add_company(company: any){
    let address = `${company.street_address} - ${company.postal_code} - ${company.country}`
        .replace(/\s{2,}/g, " ");

    let html = `
<div class="company">
    <div class="head">
        <h3>${company.host_name_establishment}</h3>
        <p>${company.year}</p>
    </div>
    <p class="type"><strong>Type d'entreprise : </strong>${company.structure_type}</p>
    <p class="description">${company.subject}</p>
    <div class="localisation">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <a target="_blank" href="https://www.google.fr/maps/search/${encodeURIComponent(address)}">${address}</a>
    </div>

    <div class="bottom">
        <button onclick="open_company_informations_popup(${company.company_id})" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path></svg>
            Voir toutes les informations
        </button>
        <p>Cette offre <strong>${company.research_students != 0 ? "est toujours disponible" : `date de l'année ${company.year}`}</strong></p>
    </div>
    
</div>`

    document.getElementById("alternance").innerHTML += html;
}

function bad_credentials(){
    window.location.reload();
}

async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function mdp_listener(){
    let pwd = document.getElementById("passwd");

    let key_pressed = false;

    pwd.addEventListener("keydown", function(k){
        if (!key_pressed)
            key_pressed = true;

        if (k.key === "Enter") {
            if (is_entering_new_password)
                define_new_password();
            else
                login();
        }
    })

    let token = localStorage.getItem("token");
    let credentials = localStorage.getItem("credentials");

    if (token && token.length > 0 && credentials && credentials.length > 0) {
        let parsed_credentials = JSON.parse(atob(credentials));

        let name = parsed_credentials["name"];
        let passwd = parsed_credentials["passwd"];

        login_backend(name, passwd);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    mdp_listener();

    document.getElementById("apply_filter")
        .addEventListener("click", apply_filter);

    document.getElementById("clear_filter")
        .addEventListener("click", clear_filter);

    document.getElementById("filter_container")
        .addEventListener("keydown", function(k){
            if (k.key === "Enter") {
                apply_filter();
            }
        });

    document.addEventListener("keydown", function(k){
        if (k.key === "Enter" && !is_logged) {
            if (is_entering_new_password)
                define_new_password();
            else
                login();
        }

        if (k.key === "Escape" && document.getElementById("popup").classList.contains("opened")) {
            close_popup()
        }
    })

});

function auto_scroll_loader(){
    let el = document.getElementById("fuck_this_shit");

    function isElementInViewport(el: HTMLElement) {
        let rect = el.getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    window.addEventListener('scroll', function() {
        if (isElementInViewport(el)) {
            add_companies();
        }
    });
}

function credentials_entered(name: string, passwd: string){
    let credentials = btoa(JSON.stringify({ name, passwd }))
    localStorage.setItem("credentials", credentials);

    add_companies();
    auto_scroll_loader();
}

async function open_company_informations_popup(id: string) {
    document.getElementById("popup").classList.add("opened");
    document.getElementById("popup").classList.add("loading");
    document.body.style["overflow"] = "hidden";

    let informations = await get_company_informations(id);

    let address = `${informations.street_address} - ${informations.postal_code} - ${informations.country}`
        .replace(/\s{2,}/g, " ");

    document.getElementById("map")
        .setAttribute("src", `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`);

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
        .textContent = `${informations["rs.street_address"]} - ${informations["rs.postal_code"]} - ${informations["rs.location_country"]}`
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
}

function close_popup(){
    document.getElementById("popup").classList.remove("opened");
    document.body.style["overflow"] = "";
}

let is_entering_new_password = false;
let is_logged = false;

async function login(){
    let name = (document.getElementById("id_name") as HTMLInputElement).value;
    let passwd = (document.getElementById("passwd") as HTMLInputElement).value;

    await login_backend(name, await hashPassword(passwd));
}

async function login_backend(name: string, passwd: string){
    let form = new FormData();
    form.set("name", name);
    form.set("passwd", passwd);

    fetch(
        `${SERVER_HOST}/auth/login`,
        {
            body: form,
            method: "POST"
        }
    ).then(
        async function(res){
            switch (res.status) {
                case 200: {
                    let data = await res.json();
                    // set the token in the localStorage
                    localStorage.setItem("token", data["token"])

                    // don't call await, as this is asynchronous to not block the user interface
                    new_device(name);

                    if (data["is_passwd_default"] == 1){
                        let credentials_base64 = btoa(JSON.stringify({ name, passwd }));
                        localStorage.setItem("credentials", credentials_base64);

                        is_entering_new_password = true;
                        document.getElementById("id_info").style["display"] = "none";

                        document.getElementById("login_title")
                            .textContent = "Définir un nouveau mot de passe";

                        document.getElementById("passwd")
                            .setAttribute("placeholder", "Nouveau mot de passe");

                        document.getElementById("passwd_label")
                            .textContent = "Nouveau mot de passe";

                        (document.getElementById("passwd") as HTMLInputElement).value = "";

                        document.getElementById("login_btn").textContent = "Définir le nouveau mot de passe";

                        document.getElementById("login_btn").onclick = () => define_new_password();
                    }
                    else {
                        is_logged = true;
                        credentials_entered(name, passwd)
                    }
                    break;
                }
                case 401: {
                    alert("Mot de passe ou identifiant incorrect")
                    break;
                }
                default:
                    alert("Erreur lors de la connexion: CODE " + res.status.toString())
            }
        },
        (e) => {
            alert("Erreur lors de la connexion: " + e.toString())
        }
    )
}

async function new_device(id: string) {
    let previous_connections = localStorage.getItem("previous_connections") || "";
    let parsed_previous_connections: string[] = previous_connections.split(/,/g).filter(e => e.length > 0);

    console.log(parsed_previous_connections, id)

    // check if the current device is already known
    if (!parsed_previous_connections.includes(id)) {
        if (parsed_previous_connections.length > 0)
            previous_connections += `,${id}`;
        else previous_connections = id;

        localStorage.setItem("previous_connections", previous_connections);

        // tell the api that a new device is connected to the account
        await fetch(
        `${SERVER_HOST}/auth/new_device`,
        {
                headers: {
                    "TOKEN": localStorage.getItem("token")
                }
            }
        )
    }
}

async function define_new_password(){
    is_logged = true;

    let new_passwd = await hashPassword((document.getElementById("passwd") as HTMLInputElement).value);

    let data = new FormData();
    data.set("new_passwd", new_passwd);

    fetch(
        `${SERVER_HOST}/auth/define_new_password`,
        {
            method: "POST",
            body: data,
            headers: {
                "TOKEN": localStorage.getItem("token")
            }
        }
    ).then(
        async function(res){
            switch (res.status) {
                case 200: {
                    alert("Le mot de passe a été modifié avec succès");

                    let credentials = JSON.parse(atob(localStorage.getItem("credentials")));
                    credentials_entered(credentials["name"], new_passwd);
                    break;
                }
                case 401: {
                    alert("Vous n'êtes pas connecté");
                    bad_credentials();
                    break;
                }
                default:
                    alert("Erreur lors de la connexion: CODE " + res.status.toString())
            }
        },
        (e) => {
            alert("Erreur lors de la connexion: " + e.toString())
        }
    )
}
