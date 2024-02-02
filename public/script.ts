const SERVER_HOST: string = "http://172.21.197.80:64873"

async function fetch_companies(n: number): Promise<Array<Object>> {
    return new Promise(function(resolve, reject){
        fetch(
        `${SERVER_HOST}/companies?ratio=${n}&passwd=${given_mdp}${query_filter.length > 0 ? `&${query_filter}` : ""}`,
        {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(
        async (res) => {
            if (res.status == 200)
                return resolve(await res.json())
            else if (res.status == 401)
                return bad_password()
            else
                return reject()
        },
        reject
    )
    })
}

async function get_companies_count(): Promise<number> {
    return new Promise(function(resolve, reject){
        fetch(
        `${SERVER_HOST}/companies/get_count?passwd=${given_mdp}${query_filter.length > 0 ? `&${query_filter}` : ""}`,
        {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(
        async (res) => {
            if (res.status == 200)
                return resolve(await res.json())
            else if (res.status == 401)
                return bad_password()
            else
                return reject()
        },
        reject
    )
    })
}

let N: number = 0;
let query_filter: string = "";

async function add_companies(){
    let companies = await fetch_companies(N);

    let login = document.querySelectorAll(".login");
    if (login.length > 0)
        login.forEach((e) => e.remove())

    // Si N < 1, ça veut dire qu'il n'y avait aucune entreprise
    // donc on doit retirer le loader
    if (N < 1) {
        document.getElementById("alternance").innerHTML = "";
        if (companies.length > 0) {
            let count = await get_companies_count();
            document.getElementById("count")
                .innerHTML = `<p><strong>${count}</strong> résultats</p>`
        }
    }

    if (companies.length > 0) {
        N++;
        companies.forEach(add_company)
    } else if (N < 1) {
        document.getElementById("alternance").innerHTML += "<p>Aucune entreprise ne correspond à votre recherche</p>"
    }
}

function get_filter_query(): string {
    let query = "";

    let research_alternance_required = document.getElementById("research_alternance_required") as HTMLInputElement;
    console.log(research_alternance_required.checked)
    research_alternance_required.checked ? query += "alternance_required=true" : query += "alternance_required=false";

    let keyword = document.getElementById("search") as HTMLInputElement;
    if (keyword.value !== "") {
        if (query.length > 0)
            query += "&";
        query += `keyword=${encodeURIComponent(keyword.value)}`;
    }

    return query
}

function apply_filter(){
    document.getElementById("alternance").innerHTML = `<div class="loading"><div class="dot-spinner"><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div><div class="dot-spinner__dot"></div></div><p>Les données chargent...</p></div>`;
    document.getElementById("count").innerHTML = "";

    N = 0;
    query_filter = get_filter_query();

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

    // 3 RUE DU DOCTEUR FRERY - CS 50199, 90000 BELFORT CEDEX, FRANCE

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

    <button type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path></svg>
        Voir toutes les informations
    </button>
</div>`

    document.getElementById("alternance").innerHTML += html;
}

function bad_password(){
    window.location.reload();
}

async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

let given_mdp = "";

function mdp_listener(){
    let pwd = document.getElementById("passwd");
    pwd.addEventListener("keydown", function(k){
            if (k.key === "Enter") {
                let passwd = (pwd as HTMLInputElement).value;
                hashPassword(passwd).then(function(hash){
                    given_mdp = hash;
                    console.log(given_mdp);

                    code_entered();
                })
            }
        })
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
});

document.addEventListener("keydown", function(k){
    if (k.key === "Enter" && given_mdp === ""){
        let passwd = document.getElementById("passwd") as HTMLInputElement;
        hashPassword(passwd.value).then(function(hash){
            given_mdp = hash;
            console.log(given_mdp);

            code_entered();
        })
    }
})

function auto_scroll_loader(){
    let el = document.getElementById("fuck_this_shit");

    function isElementInViewport(el) {
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

function code_entered(){
    add_companies();
    auto_scroll_loader();
}