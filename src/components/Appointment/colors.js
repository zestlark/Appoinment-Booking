import { appointmentTypes } from "./appointmentTypes";

export const colors = [
    "#ffafcc", "#ffd6ff", "#e7c6ff", "#c8b6ff", "#b8c0ff", "#bbd0ff", "#f4cae0", "#ffdfd3", "#d6c6ff", "#f0d3ff"
];

export const getAppoinmentTypeColor = (appoinmentType) => {
    return colors[appointmentTypes.indexOf(appoinmentType)] || colors[0];
}