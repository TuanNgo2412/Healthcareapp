import bcrypt from 'bcrypt';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = async (password) => {
    try {
        let hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (e) {
        throw e;
    }

}

let handleUserLogin = async (email, password) => {
    try {
        let userData = {};
        let isExist = await checkUserEmail(email);

        if (isExist) {
            // user already exists
            let user = await db.User.findOne({
                attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                where: { email: email },
                raw: true
            })
            if (user) {
                // Compare password
                let check = await bcrypt.compare(password, user.password);

                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = 'OK';

                    delete user.password;
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = `Wrong password!!!`;
                }

            } else {
                userData.errCode = 2;
                userData.errMessage = `User's not found`;
            }
        } else {
            userData.errCode = 1;
            userData.errorMessage = `Your's email isn't exist in your system. Please try other email`;
        }
        return userData;
    } catch (e) {
        throw e;
    }
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

async function getAllUsers(userId) {
    try {
        let users = '';

        if (userId === 'ALL') {
            users = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                }
            })
        }

        if (userId && userId !== 'ALL') {
            users = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password']
                }
            })

        }
        return users;
    } catch (e) {
        throw e;
    }
}

let createNewUser = async (data) => {
    try {
        // Check email is exist ?
        let check = await checkUserEmail(data.email);
        if (check) {
            return ({
                errCode: 1,
                errMessage: 'Email is already in use. Please try another email!!!'
            })
        } else {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                roleId: data.roleId,
                positionId: data.positionId,
                image: data.avatar,
            })
            return ({
                errCode: 0,
                message: 'OK'
            });
        }
    } catch (e) {
        throw e;
    }
}

let deleteUser = async (userId) => {
    let user = await db.User.findOne({
        where: { id: userId }
    })
    if (!user) {
        return {
            errCode: 2,
            errMessage: `The user isn't exist`
        }
    }

    await db.User.destroy({
        where: { id: userId },
    })

    return {
        errCode: 0,
        message: 'The user has been deleted'
    }
}

let editUser = async (data) => {
    try {
        if (!data.id || !data.roleId || !data.positionId || !data.gender) {
            return {
                errCode: 2,
                errMessage: 'Missing require parameter'
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id },
            raw: false
        })
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.roleId = data.roleId;
            user.positionId = data.positionId;
            user.gender = data.gender;
            user.phonenumber = data.phonenumber;
            if (data.avatar) {
                user.image = data.avatar;
            }

            await user.save();
            return {
                errCode: 0,
                message: `Update user successfully`
            };
        } else {
            return {
                errCode: 1,
                errMessage: `User's not found`
            };
        }
    } catch (e) {
        throw e;
    }
}

let getAllCodeService = async (inputType) => {
    try {
        if (!inputType) {
            return ({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        } else {
            let res = {};
            let allCode = await db.Allcode.findAll({
                where: { type: inputType },
            });
            res.errCode = 0;
            res.data = allCode;
            return res;
        }
    } catch (e) {
        throw e;
    }
}

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    editUser,
    deleteUser,
    getAllCodeService

}