/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const impact = {};
const severeImpact = {};


// #CHALLENGE ONE

const currentlyInfectedEst = (data) => {
  const { reportedCases, periodType } = data;
  let { timeToElapse } = data;

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  if (periodType === 'weeks') {
    timeToElapse *= 7;
  }

  if (periodType === 'months') {
    timeToElapse *= 30;
  }

  data.timeToElapse = timeToElapse;

  const powerFactor = Math.trunc(timeToElapse / 3);

  impact.infectionsByRequestedTime = Math.trunc(impact.currentlyInfected * (2 ** powerFactor));
  severeImpact.infectionsByRequestedTime = Math.trunc(severeImpact.currentlyInfected * (2 ** powerFactor));
};

// #CHALLENGE TWO

const severeCasesByRequestedTimeEst = (data) => {
  const powerFactor = Math.trunc(data.timeToElapse / 3);

  impact.severeCasesByRequestedTime = Math.trunc(0.15 * impact.currentlyInfected * (2 ** powerFactor));
  severeImpact.severeCasesByRequestedTime = Math.trunc(0.15 * severeImpact.currentlyInfected * (2 ** powerFactor));
// eslint-disable-next-line linebreak-style
};
const hospitalBedsByRequestedTimeEst = (data) => {
  const bedAvailabilityInHospitals = 0.35 * data.totalHospitalBeds;

  impact.hospitalBedsByRequestedTime = Math.trunc(bedAvailabilityInHospitals - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(bedAvailabilityInHospitals - severeImpact.severeCasesByRequestedTime);
};

// #CHALLENGE THREE
const casesForICUByRequestedTimeEst = () => {
  impact.casesForICUByRequestedTime = Math.trunc(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * severeImpact.infectionsByRequestedTime);
};
const casesForVentilatorsByRequestedTimeEst = () => {
  impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * severeImpact.infectionsByRequestedTime);
};

const dollarsInFlightEst = (data) => {
  impact.dollarsInFlight = Math.trunc((
    impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / data.timeToElapse);
  severeImpact.dollarsInFlight = Math.trunc((
    severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / data.timeToElapse);
};

const covid19ImpactEstimator = (data) => {
  const estFunctions = () => {
    currentlyInfectedEst(data);
    severeCasesByRequestedTimeEst(data);
    hospitalBedsByRequestedTimeEst(data);
    casesForICUByRequestedTimeEst(data);
    casesForVentilatorsByRequestedTimeEst(data);
    dollarsInFlightEst(data);
  };
  estFunctions(data);
  return ({ data, impact, severeImpact });
};
export default covid19ImpactEstimator;
