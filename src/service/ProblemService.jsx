export const ProblemService = {
    getData() {
        return [
            {
                id: 1,
                Cve: 'Bad Update',
                Cwe: 'Authentification Problem',
                Vendor: 'Apple',
                Products: 'Smart Watch',
            },
            {
                id: 2,
                Cve: 'Bad Update',
                Cwe: 'Authentification Problem',
                Vendor: 'LG',
                Products: 'Smart Watch',
            },
            {
                id: 3,
                Cve: 'Bad Update',
                Cwe: 'Authentification Problem',
                Vendor: 'Google',
                Products: 'Smart Watch',
            },
            {
                id: 4,
                Cve: 'Privacy',
                Cwe: 'Authentification Problem',
                Vendor: 'Lenovo',
                Products: 'Camera',
            },
            {
                id: 5,
                Cve: 'Network',
                Cwe: 'Physical Card',
                Vendor: 'Cisco',
                Products: 'Nexus99',
            },
        ];
    },

    getProblems() {
        //return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
        return Promise.resolve(this.getData());
    }
};
