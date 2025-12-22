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
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
};

/* =========================
   2. TIME UNTIL NEXT UTC MIDNIGHT
   ========================= */
const msUntilNextUTCMidnight = () => {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setUTCHours(24, 0, 0, 0);
  return nextMidnight - now;
};

/* =========================
   3. DAILY UNIQUE NUMBER GENERATOR
   - Unique across ALL slides
   - Range: 00–49
   ========================= */
const getDailyNumbers = () => {
  const date = getUTCDateString();
  let seed = Number(date.replaceAll('-', ''));

  // Seeded random (deterministic)
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // Create pool 00–49
  const pool = Array.from({ length: 50 }, (_, i) => i);

  // Shuffle pool (Fisher–Yates)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // We need 12 unique numbers total (3 slides × 4)
  const picked = pool.slice(0, 12).map(n =>
    n.toString().padStart(2, '0')
  );

  return [
    [
      [picked[0], picked[1]],
      [picked[2], picked[3]],
    ],
    [
      [picked[4], picked[5]],
      [picked[6], picked[7]],
    ],
    [
      [picked[8], picked[9]],
      [picked[10], picked[11]],
    ],
  ];
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

    // Safety check (tab sleep / browser pause)
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
