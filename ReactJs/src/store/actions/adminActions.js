import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctorsServices, saveDetailDoctorService,
    getAllSpecialty, getAllClinic
} from '../../services/userService';
import { toast } from "react-toastify";


export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
            return;
        } catch (e) {
            dispatch(fetchGenderFail());
            console.error('fetchGenderStart error', e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
            return;
        } catch (e) {
            dispatch(fetchPositionFail());
            console.error('fetchPositionStart error', e);
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
            return;
        } catch (e) {
            dispatch(fetchRoleFail());
            console.error('fetchRoleStart error', e);
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('CREATE SUCCEED!!!');
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            } else {
                toast.success('Create new user failed!!!');
                dispatch(saveUserFail());
            }
            return;
        } catch (e) {
            toast.error('Create new user failed!!!');
            dispatch(saveUserFail());
            console.error('saveUserFail error', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS',
})

export const saveUserFail = () => ({
    type: 'CREATE_USER_FAIL',
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFail());
            }
            return;
        } catch (e) {
            dispatch(fetchAllUsersFail());
            console.error('fetchAllUsersFail error', e);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: data
})

export const fetchAllUsersFail = () => ({
    type: 'FETCH_ALL_USERS_FAIL',
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete a user successfully!!!!');
                dispatch(deleteAUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Delete a user error!');
                dispatch(deleteAUserFail());
            }
            return;
        } catch (e) {
            toast.error('Delete a user error!');
            dispatch(deleteAUserFail());
            console.error('deleteAUserFail error', e);
        }
    }
}

export const deleteAUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteAUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Update a user successfully!!!!');
                dispatch(editAUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Update a user error!');
                dispatch(editAUserFail());
            }
            return;
        } catch (e) {
            toast.error('Update a user error!');
            dispatch(editAUserFail());
            console.error('editAUserFail error', e);
        }
    }
}

export const editAUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editAUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAIL', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAIL
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsServices();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIL
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAIL', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAIL
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success('Save info detail doctor succeed!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error('Save info detail doctor error');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
                })
            }
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTOR_FAIL', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.SAVE_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.SAVE_ALLCODE_SCHEDULE_TIME_FAIL
                })
            }
        } catch (e) {
            console.log('SAVE_ALLCODE_SCHEDULE_TIME_FAIL', e)
            dispatch({
                type: actionTypes.SAVE_ALLCODE_SCHEDULE_TIME_FAIL
            })
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.infor.errCode === 0
                && resClinic && resClinic.infor.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.infor.data,
                    resClinic: resClinic.infor.data,

                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFail());

            }

        } catch (e) {
            dispatch(fetchRequiredDoctorInforFail());
            console.log('fetchGenderStart error', e);
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL,
})






