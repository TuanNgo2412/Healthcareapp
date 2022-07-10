import db from '../models/index';

let createSpecialty = async (data) => {
    try {
        if (!data.name ||
            !data.imageBase64 ||
            !data.descriptionHTML ||
            !data.descriptionMarkdown
        ) {
            return {
                errCode: 1,
                errMessage: 'Missing required parameter!!!'
            }
        } else {
            await db.Specialty.create({
                name: data.name,
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

let getAllSpecialty = async () => {
    try {
        let data = await db.Specialty.findAll({

        });

        if (data && data.length > 0) {
            data.map(item => {
                item.image = new Buffer(item.image, 'base64').toString('binary');
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

let getDetailSpecialtyById = async (inputId, location) => {
    try {
        if (!inputId || !location) {
            return {
                errorCode: 1,
                errorMessage: 'Missing parameter!!!!'
            };
        } else {
            let data = await db.Specialty.findOne({
                where: {
                    id: inputId
                },
                attributes: ['descriptionHTML', 'descriptionMarkdown']
            })

            if (data) {
                let doctorSpecialty = [];
                if (location === 'ALL') {
                    doctorSpecialty = await db.Doctor_Infor.findAll({
                        where: {
                            specialtyId: inputId
                        },
                        attributes: ['doctorId', 'provinceId']
                    })
                } else {
                    // find by location
                    doctorSpecialty = await db.Doctor_Infor.findAll({
                        where: {
                            specialtyId: inputId,
                            provinceId: location
                        },
                        attributes: ['doctorId', 'provinceId']
                    })
                }

                data.doctorSpecialty = doctorSpecialty;
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
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById
}