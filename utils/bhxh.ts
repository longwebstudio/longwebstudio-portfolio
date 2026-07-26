// utils/bhxh.ts

export interface BHXHInput {
  name: string;
  birthMonth: number;
  birthYear: number;
  gender: 'nam' | 'nu';
  paidYears: number; 
}

export interface BHXHResult {
  currentAgeYears: number;
  currentAgeMonths: number;
  lawRetirementAgeYears: number;
  lawRetirementAgeMonths: number;
  lawRetirementMonth: number;
  lawRetirementYear: number;
  eligibleRetirementMonth: number;
  eligibleRetirementYear: number;
  yearsToLawRetire: number;
  periodicYears: number; 
  lumpSumYears: number;  
  totalAtLawRetire: number;
  isDelayed: boolean; 
}

export function calculateBHXH(input: BHXHInput): BHXHResult {
  const currentMonth = 7; 
  const currentYear = 2026;
  
  const totalCurrentMonths = (currentYear - input.birthYear) * 12 + (currentMonth - input.birthMonth);
  const currentAgeYears = Math.floor(totalCurrentMonths / 12);
  const currentAgeMonths = totalCurrentMonths % 12;

  let lawRetirementAgeYears = 62;
  let lawRetirementAgeMonths = 0;
  const birthTimeline = input.birthYear * 12 + (input.birthMonth - 1);

  if (input.gender === 'nam') {
    if (birthTimeline <= 1960 * 12 + 11) {
      lawRetirementAgeYears = 60; lawRetirementAgeMonths = 0;
    } else if (birthTimeline <= 1961 * 12 + 8) {
      lawRetirementAgeYears = 60; lawRetirementAgeMonths = 3;
    } else if (birthTimeline <= 1962 * 12 + 5) {
      lawRetirementAgeYears = 60; lawRetirementAgeMonths = 6;
    } else if (birthTimeline <= 1963 * 12 + 2) {
      lawRetirementAgeYears = 60; lawRetirementAgeMonths = 9;
    } else if (birthTimeline <= 1963 * 12 + 11) {
      lawRetirementAgeYears = 61; lawRetirementAgeMonths = 0;
    } else if (birthTimeline <= 1964 * 12 + 8) {
      lawRetirementAgeYears = 61; lawRetirementAgeMonths = 3;
    } else if (birthTimeline <= 1965 * 12 + 5) {
      lawRetirementAgeYears = 61; lawRetirementAgeMonths = 6;
    } else if (birthTimeline <= 1966 * 12 + 2) {
      lawRetirementAgeYears = 61; lawRetirementAgeMonths = 9;
    } else {
      lawRetirementAgeYears = 62; lawRetirementAgeMonths = 0;
    }
  } else {
    if (birthTimeline <= 1965 * 12 + 11) {
      lawRetirementAgeYears = 55; lawRetirementAgeMonths = 0;
    } else if (birthTimeline <= 1966 * 12 + 7) {
      lawRetirementAgeYears = 55; lawRetirementAgeMonths = 4;
    } else if (birthTimeline <= 1967 * 12 + 3) {
      lawRetirementAgeYears = 55; lawRetirementAgeMonths = 8;
    } else if (birthTimeline <= 1967 * 12 + 11) {
      lawRetirementAgeYears = 56; lawRetirementAgeMonths = 0;
    } else if (birthTimeline <= 1968 * 12 + 7) {
      lawRetirementAgeYears = 56; lawRetirementAgeMonths = 4;
    } else if (birthTimeline <= 1969 * 12 + 3) {
      lawRetirementAgeYears = 56; lawRetirementAgeMonths = 8;
    } else if (birthTimeline <= 1969 * 12 + 11) {
      lawRetirementAgeYears = 57; lawRetirementAgeMonths = 0;
    } else if (birthTimeline <= 1970 * 12 + 7) {
      lawRetirementAgeYears = 57; lawRetirementAgeMonths = 4;
    } else if ((input.birthYear === 1970 && input.birthMonth >= 9) || (input.birthYear === 1971 && input.birthMonth <= 4)) {
      lawRetirementAgeYears = 57; lawRetirementAgeMonths = 8;
    } else if (input.birthYear === 1971 && input.birthMonth >= 5 && input.birthMonth <= 12) {
      lawRetirementAgeYears = 58; lawRetirementAgeMonths = 0;
    } else if (input.birthYear === 1972 && input.birthMonth <= 8) {
      lawRetirementAgeYears = 58; lawRetirementAgeMonths = 4;
    } else if ((input.birthYear === 1972 && input.birthMonth >= 9) || (input.birthYear === 1973 && input.birthMonth <= 4)) {
      lawRetirementAgeYears = 58; lawRetirementAgeMonths = 8;
    } else if (input.birthYear === 1973 && input.birthMonth >= 5 && input.birthMonth <= 12) {
      lawRetirementAgeYears = 59; lawRetirementAgeMonths = 0;
    } else if (input.birthYear === 1974 && input.birthMonth <= 8) {
      lawRetirementAgeYears = 59; lawRetirementAgeMonths = 4;
    } else if ((input.birthYear === 1974 && input.birthMonth >= 9) || (input.birthYear === 1975 && input.birthMonth <= 3)) {
      lawRetirementAgeYears = 59; lawRetirementAgeMonths = 8;
    } else {
      lawRetirementAgeYears = 60; lawRetirementAgeMonths = 0;
    }
  }

  const totalRetireMonthsFromBirth = birthTimeline + (lawRetirementAgeYears * 12 + lawRetirementAgeMonths);
  const lawRetirementYear = Math.floor(totalRetireMonthsFromBirth / 12);
  const lawRetirementMonth = (totalRetireMonthsFromBirth % 12) + 1;

  const yearsToLawRetire = Math.max(0, lawRetirementYear - currentYear);
  const totalAtLawRetire = input.paidYears + yearsToLawRetire;

  let periodicYears = 0;
  let lumpSumYears = 0;
  let eligibleRetirementYear = lawRetirementYear;
  let eligibleRetirementMonth = lawRetirementMonth;

  if (totalAtLawRetire >= 15) {
    periodicYears = Math.max(0, 15 - input.paidYears);
    lumpSumYears = 0;
  } else if (totalAtLawRetire >= 10) {
    periodicYears = yearsToLawRetire;
    lumpSumYears = 15 - totalAtLawRetire;
  } else {
    periodicYears = 10 - input.paidYears; 
    lumpSumYears = 5; 
    eligibleRetirementYear = currentYear + periodicYears;
    eligibleRetirementMonth = input.birthMonth;
  }

  const isDelayed = eligibleRetirementYear > lawRetirementYear || (eligibleRetirementYear === lawRetirementYear && eligibleRetirementMonth > lawRetirementMonth);

  return {
    currentAgeYears,
    currentAgeMonths,
    lawRetirementAgeYears,
    lawRetirementAgeMonths,
    lawRetirementMonth,
    lawRetirementYear,
    eligibleRetirementMonth,
    eligibleRetirementYear,
    yearsToLawRetire,
    periodicYears,
    lumpSumYears,
    totalAtLawRetire,
    isDelayed
  };
}
