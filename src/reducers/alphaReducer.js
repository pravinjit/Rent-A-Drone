import { QUAD } from '../config';
import { CHARGE_ALPHA_DR, RENT_ALPHA_DR, RETURN_ALPHA_DR } from '../config';

/* Calculate Available FlightTime and Group It */
let initialState = QUAD.filter((v, k) => {
  if (k < 6) {
    v.maxFlightTime = parseFloat(v.maxFlightTime.split('%')[0]);
    v.charge = parseFloat(v.charge.split('%')[0]);
    v.availableFlightTime = Math.ceil((v.maxFlightTime * v.charge) / 100);
    v.station = 'alpha';
    return v;
  }
  return null;
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CHARGE_ALPHA_DR:
      return state.map(val => {
        if (val.manufacturer === action.data.manufacturer && val.model === action.data.model) {
          /* Alter Charge and Available FlightTime  */
          val.charge = val.charge + 1;
          val.availableFlightTime = Math.ceil((val.maxFlightTime * val.charge) / 100);
        }
        return val;
      });
    case RENT_ALPHA_DR:
      return state.filter(val => val.manufacturer !== action.data.manufacturer && val.model !== action.data.model);
    case RETURN_ALPHA_DR:
      return [
        ...state,
        action.data
      ];
    default:
      return state;
  }
}