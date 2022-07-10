import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
}

let postBookAppointment = async (data) => {
    try {
        if (!data.email || !data.doctorId || !data.timeType || !data.date
            || !data.fullName || !data.selectedGender || !data.address
        ) {
            return {
                error: 1,
                errorMessage: 'Missing required parameter'
            }
        } else {

            let token = uuidv4();
            await emailService.sendSimpleEmail({
                receiverEmail: data.email,
                patientName: data.fullName,
                time: data.timeString,
                doctorName: data.doctorName,
                language: data.language,
                redirectLink: buildUrlEmail(data.doctorId, token),
            })

            // upsert patient
            let user = await db.User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    email: data.email,
                    roleId: 'R3',
                    gender: data.selectedGender,
                    address: data.address,
                    firstName: data.fullName
                },
            })

            if (user && user[0]) {
                await db.Booking.findOrCreate({
                    where: { patientId: user[0].id },
                    defaults: {
                        statusId: 'S1',
                        doctorId: data.doctorId,
                        patientId: user[0].id,
                        date: data.date,
                        timeType: data.timeType,
                        token: token,
                    }
                })

            }
            return ({
                errCode: 0,
                errMessage: 'Save info patient succeed!'
            })
        }
    } catch (e) {
        throw e;
    }
}

let postVerifyBookAppointment = async (data) => {
    try {
        if (!data.token || !data.doctorId) {
            return ({
                errCode: 1,
                errMessage: 'Missing required parameter!'
            })
        } else {
            let appointment = await db.Booking.findOne({
                where: {
                    doctorId: data.doctorId,
                    token: data.token,
                    statusId: 'S1'
                },
                raw: false,
            })

            if (appointment) {
                appointment.statusId = 'S2';
                await appointment.save();

                return {
                    errCode: 0,
                    errMessage: 'Update the appointment successfully!'
                }
            } else {
                return {
                    errCode: 2,
                    errMessage: 'Appointment has been activated or does not exist'
                }
            }
        }
    } catch (e) {
        throw e;
    }
}

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment
}