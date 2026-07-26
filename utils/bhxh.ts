// utils/bhxh.ts

export interface BHXHInput {
  name: string;
  birthYear: number;
  gender: 'nam' | 'nu';
  paidYears: number;
}

export interface BHXHResult {
  currentAge: number;
  lawRetirementAge: number;     // Tuổi nghỉ hưu chính xác theo lộ trình luật tăng tuổi
  lawRetirementYear: number;    // Năm đạt tuổi nghỉ hưu theo luật
  eligibleRetirementAge: number;// Tuổi thực tế đủ điều kiện đóng gộp (đã tính tuổi quy định + đóng cho đủ 10 năm nền)
  eligibleRetirementYear: number;// Năm thực tế đủ điều kiện đóng gộp hưởng hưu
  yearsToLawRetire: number;
  periodicYears: number;
  lumpSumYears: number;
  totalAtRetire: number;
}

export function calculateBHXH(input: BHXHInput): BHXHResult {
  const currentYear = 2026;
  const currentAge = currentYear - input.birthYear;
  
  let lawRetirementAge = 62; // Mặc định cho Nam sinh từ năm 1966 trở đi (đủ 62 tuổi từ năm 2028)
  let lawRetirementYear = input.birthYear + 62;

  // 1. ÁP DỤNG CHÍNH XÁC LỘ TRÌNH TĂNG TUỔI NGHỈ HƯU THEO LUẬT
  if (input.gender === 'nam') {
    // Lao động Nam đạt 62 tuổi từ năm 2028 trở đi. 
    // Người sinh năm 1965 sẽ đủ tuổi hưu vào năm 2026 (61 tuổi 3 tháng) hoặc 2027 (61 tuổi 6 tháng)
    if (input.birthYear === 1965) {
      lawRetirementAge = 61.5; // Đủ tuổi nghỉ hưu ở mốc 61 tuổi 6 tháng vào năm 2026.5
      lawRetirementYear = 2026;
    } else if (input.birthYear < 1965) {
      // Các trường hợp sinh trước năm 1965 đã quá tuổi nghỉ hưu quy định từ trước năm 2026
      lawRetirementAge = 61; 
      lawRetirementYear = input.birthYear + 61;
    }
  } else {
    // Lao động Nữ: Mỗi năm tăng 4 tháng, đạt mốc 60 tuổi vào năm 2035
    // Tính toán năm đạt tuổi hưu dựa theo năm sinh của Nữ
    if (input.birthYear <= 1970) {
      lawRetirementAge = 56; // Đã đủ tuổi từ trước 2026
      lawRetirementYear = input.birthYear + 56;
    } else if (input.birthYear === 1971) { lawRetirementAge = 56.33; lawRetirementYear = 2027; } // 56 tuổi 4 tháng
    else if (input.birthYear === 1972) { lawRetirementAge = 56.66; lawRetirementYear = 2028; } // 56 tuổi 8 tháng
    else if (input.birthYear === 1973) { lawRetirementAge = 57;    lawRetirementYear = 2030; } // 57 tuổi
    else if (input.birthYear === 1974) { lawRetirementAge = 57.33; lawRetirementYear = 2031; } // 57 tuổi 4 tháng
    else if (input.birthYear === 1975) { lawRetirementAge = 57.66; lawRetirementYear = 2032; } // 57 tuổi 8 tháng
    else if (input.birthYear === 1976) { lawRetirementAge = 58;    lawRetirementYear = 2034; } // 58 tuổi
    else if (input.birthYear === 1977) { lawRetirementAge = 58.33; lawRetirementYear = 2035; } // 58 tuổi 4 tháng
    else {
      // Nữ sinh từ năm 1978 trở đi chính thức áp dụng mốc kịch trần là đủ 60 tuổi
      lawRetirementAge = 60;
      lawRetirementYear = input.birthYear + 60;
    }
  }

  const yearsToLawRetire = Math.max(0, lawRetirementYear - currentYear);
  
  // 2. Tính số năm tích lũy thực tế khi chạm mốc năm nghỉ hưu quy định
  const totalAtRetire = input.paidYears + yearsToLawRetire;
  
  let periodicYears = 0;
  let lumpSumYears = 0;
  let eligibleRetirementYear = lawRetirementYear;

  // 3. Phân luồng tính toán tuổi đủ điều kiện đóng gộp theo mốc 10 năm nền
  if (totalAtRetire >= 15) {
    periodicYears = Math.max(0, 15 - input.paidYears);
    lumpSumYears = 0;
    eligibleRetirementYear = lawRetirementYear;
  } else if (totalAtRetire >= 10) {
    periodicYears = yearsToLawRetire;
    lumpSumYears = 15 - totalAtRetire;
    eligibleRetirementYear = lawRetirementYear;
  } else {
    // Nếu chưa đủ 10 năm nền tại năm nghỉ hưu, bắt buộc phải đóng định kỳ kéo dài qua tuổi hưu
    periodicYears = 10 - input.paidYears; 
    lumpSumYears = 5; 
    eligibleRetirementYear = currentYear + periodicYears;
  }

  const eligibleRetirementAge = eligibleRetirementYear - input.birthYear;

  return {
    currentAge,
    lawRetirementAge: Math.round(lawRetirementAge * 100) / 100, // Làm tròn 2 chữ số thập phân
    lawRetirementYear,
    eligibleRetirementAge,
    eligibleRetirementYear,
    yearsToLawRetire,
    periodicYears,
    lumpSumYears,
    totalAtRetire
  };
}
