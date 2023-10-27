const urlApi = 'https://localhost:44325/api/';

export const environment = {
    production: false,
    urlApi: urlApi,
    companyContactsCtrl:{
        getById:urlApi+'GetById',
        getAll:urlApi+'CompanyContacts/GetAll',
        create:urlApi+'Create',
        update:urlApi+'Update',
        delete:urlApi+'Delete'
    }
}