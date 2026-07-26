'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from './components/Header';
import SeoIntro from './components/SeoIntro';
import PaymentPeriod from './components/PaymentPeriod';
import MemberSlider from './components/MemberSlider';
import MemberList from './components/MemberList';
import ResultCard from './components/ResultCard';
import GuideTable from './components/GuideTable';
import Footer from './components/Footer';

const LUONG_CO_SO = 2530000; 
const TY_LE_GIAM_TRU = [1.0, 0.7, 0.6, 0.5, 0.4];

export default function BHYTCalculator() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [months, setMonths] = useState(12);
  const [members, setMembers] = useState([
    { id: 1, name: 'Thành viên 1', isShared: false },
    { id: 2, name: 'Thành viên 2', isShared: false },
    { id: 3, name: 'Thành viên 3', isShared: false },
    { id: 4, name: 'Thành viên 4', isShared: false },
    { id: 5, name: 'Thành viên 5', isShared: false },
  ]);

  useEffect(() => {
    const queryData = searchParams.get('data');
    const queryMonths = searchParams.get('months');
    
    if (queryMonths) {
      const parsedMonths = parseInt(queryMonths, 10);
      if ([3, 6, 12].includes(parsedMonths)) setMonths(parsedMonths);
    }

    if (queryData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(queryData));
        if (Array.isArray(parsed) && parsed.length > 0) setMembers(parsed);
      } catch (e) {
        console.error("Lỗi đọc url query:", e);
      }
    }
  }, [searchParams]);

  const updateUrlQuery = (currentMembers, currentMonths) => {
    const queryString = encodeURIComponent(JSON.stringify(currentMembers));
    router.push(`?data=${queryString}&months=${currentMonths}`, { scroll: false });
  };

  const handlePeriodChange = (selectedMonths) => {
    setMonths(selectedMonths);
    updateUrlQuery(members, selectedMonths);
  };

  const handleCountChange = (count) => {
    let updated = [...members];
    if (count > members.length) {
      for (let i = members.length + 1; i <= count; i++) {
        updated.push({ id: i, name: `Thành viên ${i}`, isShared: false });
      }
    } else if (count < members.length) {
      updated = updated.slice(0, count);
    }
    setMembers(updated);
    updateUrlQuery(updated, months);
  };

  const toggleSharedStatus = (id) => {
    const updated = members.map(m => m.id === id ? { ...m, isShared: !m.isShared } : m);
    setMembers(updated);
    updateUrlQuery(updated, months);
  };

  const handleNameChange = (id, newName) => {
    const updated = members.map(m => m.id === id ? { ...m, name: newName } : m);
    setMembers(updated);
    updateUrlQuery(updated, months);
  };

  const mucDongMotThangChuan = LUONG_CO_SO * 0.045; 
  let tongTienKetQua = 0; 

  const processedMembers = members.map((member, index) => {
    const rateIndex = index < TY_LE_GIAM_TRU.length ? index : TY_LE_GIAM_TRU.length - 1;
    const tyLeGiamTruHienTai = TY_LE_GIAM_TRU[rateIndex];

    if (member.isShared) {
      return { 
        ...member, 
        amountCurrentPeriod: 0, 
        note: `Đã đóng đợt trước (Nấc ${index + 1} - Giảm ${Math.round((1 - tyLeGiamTruHienTai) * 100)}%)` 
      };
    }
    
    const amountByPeriod = mucDongMotThangChuan * months * tyLeGiamTruHienTai;
    tongTienKetQua += amountByPeriod;

    return {
      ...member,
      amountCurrentPeriod: Math.round(amountByPeriod), 
      note: `Thu đợt này (Nấc ${index + 1} - Đóng ${tyLeGiamTruHienTai * 100}%)`
    };
  });

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <SeoIntro />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <PaymentPeriod months={months} onChange={handlePeriodChange} />
            <MemberSlider count={members.length} onChange={handleCountChange} />
            <MemberList 
              members={processedMembers} 
              onToggle={toggleSharedStatus} 
              onNameChange={handleNameChange}
            />
          </div>
          <div>
            <ResultCard 
              members={processedMembers} 
              tongTien={tongTienKetQua} 
              luongCoSo={LUONG_CO_SO} 
              months={months}
            />
          </div>
        </div>
        <GuideTable luongCoSo={LUONG_CO_SO} months={months} />
      </main>
      <Footer />
    </>
  );
}
