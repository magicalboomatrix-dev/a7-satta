import { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

/* =========================
   1. UTC DATE (GLOBAL)
   ========================= */
const getUTCDateString = () => {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD (UTC)
};

/* =========================
   2. DAILY NUMBER GENERATOR
   ========================= */
const getDailyNumbers = () => {
  const date = getUTCDateString();
  let seed = Number(date.replaceAll('-', ''));

  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return Math.floor((seed / 233280) * 99) + 1;
  };

  return [
    [[random(), random()], [random(), random()]],
    [[random(), random()], [random(), random()]],
    [[random(), random()], [random(), random()]],
  ];
};

/* =========================
   3. TIME UNTIL NEXT UTC MIDNIGHT
   ========================= */
const msUntilNextUTCMidnight = () => {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setUTCHours(24, 0, 0, 0);
  return nextMidnight - now;
};

/* =========================
   4. COMPONENT
   ========================= */
const Luckynumber = () => {
  const [numbers, setNumbers] = useState(getDailyNumbers());

  useEffect(() => {
    const updateNumbers = () => {
      setNumbers(getDailyNumbers());
    };

    // Update exactly at UTC midnight
    const timeout = setTimeout(updateNumbers, msUntilNextUTCMidnight());

    // Safety check every minute (tab sleep / browser pause)
    const interval = setInterval(updateNumbers, 60 * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={3}
      spaceBetween={50}
      loop
      navigation
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 0 },
        640: { slidesPerView: 1, spaceBetween: 0 },
        1024: { slidesPerView: 2, spaceBetween: 50 },
      }}
    >
      {numbers.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="pair-flex">
            {slide.map((pair, j) => (
              <div className="numpair" key={j}>
                <h3>{pair[0]}</h3>
                <h3>{pair[1]}</h3>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Luckynumber;
