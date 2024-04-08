import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    patientData : 
        {
        firstName: '',
        lastName: '',
        patientName:'',
        dateOfBirth: '',
        age: '',
        gender: 'NA',
        email: '',
        phoneNumber: '',
        zipCode: '',
        medicalHistory: '',
        referringDoctor: '',
        collection: '',
    },
    reportData: []
}

export const formSlice = createSlice({
    name: "formData",
    initialState,
    reducers: {
        setPatientData: (state, action) => {
            state.patientData[action.payload.name] = action.payload.value
        },
        addReportData: (state, action) => {
            // state.reportData.push(action.payload);
            // const data = action.payload.filter((data) => data);
            state.reportData = action.payload.filter((data) => data);;
        }
    }
});

export const { setPatientData, addReportData } = formSlice.actions;
export default formSlice.reducer;
