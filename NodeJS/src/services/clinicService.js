import db from '../models/index';

let createClinic = async (data) => {
    try {
        if (!data.name || !data.address ||
            !data.imageBase64 ||
            !data.descriptionHTML ||
            !data.descriptionMarkdown
        ) {
            return {
                errCode: 1,
                errMessage: 'Missing required parameter!!!'
            }
        } else {
            await db.Clinic.create({
                name: data.name,
                address: data.address,
                image: data.imageBase64,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown
            })

            return {
                errCode: 0,
                errMessage: 'OK'
            }
        }
    } catch (e) {
        throw e;
    }
}

let getAllClinic = async () => {
    try {
        let data = await db.Clinic.findAll({

        });

        if (data && data.length > 0) {
            data.map(item => {
                item.image = new Buffer(item.image, 'base64').toString('binary');
                return item;
            })
        }
        return {
            errCode: 0,
            errMessage: 'Ok',
            data
        }
    } catch (e) {
        throw e;
    }
}

let getDetailClinicById = async (inputId) => {
    try {
        if (!inputId) {
            return {
                errorCode: 1,
                errorMessage: 'Missing parameter!!!!'
            };
        } else {
            let data = await db.Clinic.findOne({
                where: {
                    id: inputId
                },
                attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown']
            })

            if (data) {
                let doctorClinic = [];
                doctorClinic = await db.Doctor_Infor.findAll({
                    where: { clinicId: inputId },
                    attributes: ['doctorId', 'provinceId']
                })
                data.doctorClinic = doctorClinic;
            } else {
                data = {}
            }

            return {
                errCode: 0,
                errMessage: 'Ok',
                data
            }

        }


    } catch (e) {
        throw e;
    }
}

module.exports = {
    createClinic,
    getAllClinic,
    getDetailClinicById
}