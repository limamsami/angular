const urlApi = 'https://localhost:44325/api/';

export const environment = {
    production: false,
    urlApi: urlApi,
    companyContactsCtrl:{
        getById:urlApi+'CompanyContacts/GetById',
        getAll:urlApi+'CompanyContacts/GetAll',
        create:urlApi+'CompanyContacts/Create',
        update:urlApi+'CompanyContacts/Update',
        delete:urlApi+'CompanyContacts/Delete',
        deleteAll:urlApi+'CompanyContacts/DeleteAll'

    },
    usersCtrl: {
        login: urlApi + 'Users/authenticate',
        signup: urlApi + 'Users'

    }
}