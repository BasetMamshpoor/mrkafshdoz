export default function (params) {
    let errors = {};

    // title
    if (!params.title) {
        errors.title = true
    } else if (!params.title.trim()) {
        errors.title = true
    } else {
        delete errors.title
    }
    // address
    if (!params.address) {
        errors.address = true
    } else if (!params.address.trim()) {
        errors.address = true
    } else {
        delete errors.address
    }
    // province
    if (!params.province) {
        errors.province = true
    } else if (!params.province.trim()) {
        errors.province = true
    } else {
        delete errors.province
    }
    // city
    if (!params.city) {
        errors.city = true
    } else {
        delete errors.city
    }

    // number
    if (!params.number) {
        errors.number = true
    } else {
        delete errors.number
    }
    // postalcode
    if (!params.postalcode) {
        errors.postalcode = true
    } else {
        delete errors.postalcode
    }
    // name
    if (!params.name) {
        errors.name = true
    } else if (!params.name.trim()) {
        errors.name = true
    } else {
        delete errors.name
    }
    // cellphone
    if (!params.cellphone) {
        errors.cellphone = true
    } else if (!params.cellphone.trim()) {
        errors.cellphone = true
    } else {
        delete errors.cellphone
    }

    return errors;
}
