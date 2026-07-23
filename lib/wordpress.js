/**
 * Tính toán số tiền đóng BHYT Hộ gia đình lũy tiến
 * Áp dụng mức lương cơ sở mới: 2.530.000đ/tháng từ 01/07/2026
 * 
 * @param {number} numMembers - Số lượng người trong hộ gia đình cùng tham gia đóng đợt này
 * @param {number} durationMonths - Thời hạn đóng (3, 6, hoặc 12 tháng)
 * @returns {object} - Trả về tổng tiền và chi tiết mức đóng của từng thành viên
 */
export function calculateBHYTHoGiaDinh(numMembers, durationMonths = 12) {
    const BASE_SALARY = 2530000; // Lương cơ sở cập nhật theo Nghị định 161/2026/NĐ-CP
    const MONTHLY_RATE_1ST = BASE_SALARY * 0.045; // Đơn giá người thứ nhất: 113.850đ/tháng
  
    // Tỷ lệ đóng lũy tiến quy định: Người thứ 1 (100%), thứ 2 (70%), thứ 3 (60%), thứ 4 (50%), thứ 5+ (40%)
    const discountRates = [1.0, 0.7, 0.6, 0.5, 0.4]; 
    
    let total = 0;
    const details = [];
  
    for (let i = 1; i <= numMembers; i++) {
      // Từ người thứ 5 trở đi, áp dụng chung mức giảm trừ 40% (chỉ mục số 4 trong mảng)
      const rateIndex = Math.min(i - 1, 4);
      const rateMultiplier = discountRates[rateIndex];
      
      // Tính tiền cho từng cá nhân dựa trên thời hạn đóng
      const personPrice = Math.round(MONTHLY_RATE_1ST * rateMultiplier * durationMonths);
      
      total += personPrice;
      details.push({
        memberPosition: i,
        multiplierPercent: rateMultiplier * 100,
        price: personPrice
      });
    }
  
    return {
      total,            // Tổng số tiền cả hộ phải đóng
      durationMonths,   // Thời hạn đóng (tháng)
      details           // Chi tiết số tiền của từng người
    };
  }