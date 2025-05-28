import { City } from "@/types"

// 주요 도시들과 타임존 정보
export const CITIES: Record<string, City[]> = {
  ko: [
    // 아시아-태평양
    { name: "서울", timezone: "Asia/Seoul" },
    { name: "도쿄", timezone: "Asia/Tokyo" },
    { name: "베이징", timezone: "Asia/Shanghai" },
    { name: "상하이", timezone: "Asia/Shanghai" },
    { name: "홍콩", timezone: "Asia/Hong_Kong" },
    { name: "싱가포르", timezone: "Asia/Singapore" },
    { name: "방콕", timezone: "Asia/Bangkok" },
    { name: "자카르타", timezone: "Asia/Jakarta" },
    { name: "마닐라", timezone: "Asia/Manila" },
    { name: "쿠알라룸푸르", timezone: "Asia/Kuala_Lumpur" },
    { name: "뭄바이", timezone: "Asia/Kolkata" },
    { name: "뉴델리", timezone: "Asia/Kolkata" },
    { name: "방갈로르", timezone: "Asia/Kolkata" },
    { name: "두바이", timezone: "Asia/Dubai" },
    { name: "시드니", timezone: "Australia/Sydney" },
    { name: "멜버른", timezone: "Australia/Melbourne" },
    { name: "오클랜드", timezone: "Pacific/Auckland" },

    // 유럽
    { name: "런던", timezone: "Europe/London" },
    { name: "파리", timezone: "Europe/Paris" },
    { name: "베를린", timezone: "Europe/Berlin" },
    { name: "암스테르담", timezone: "Europe/Amsterdam" },
    { name: "취리히", timezone: "Europe/Zurich" },
    { name: "로마", timezone: "Europe/Rome" },
    { name: "마드리드", timezone: "Europe/Madrid" },
    { name: "바르셀로나", timezone: "Europe/Madrid" },
    { name: "스톡홀름", timezone: "Europe/Stockholm" },
    { name: "코펜하겐", timezone: "Europe/Copenhagen" },
    { name: "오슬로", timezone: "Europe/Oslo" },
    { name: "헬싱키", timezone: "Europe/Helsinki" },
    { name: "모스크바", timezone: "Europe/Moscow" },
    { name: "이스탄불", timezone: "Europe/Istanbul" },
    { name: "아테네", timezone: "Europe/Athens" },
    { name: "프라하", timezone: "Europe/Prague" },
    { name: "부다페스트", timezone: "Europe/Budapest" },
    { name: "바르샤바", timezone: "Europe/Warsaw" },

    // 북미
    { name: "뉴욕", timezone: "America/New_York" },
    { name: "로스앤젤레스", timezone: "America/Los_Angeles" },
    { name: "시카고", timezone: "America/Chicago" },
    { name: "휴스턴", timezone: "America/Chicago" },
    { name: "피닉스", timezone: "America/Phoenix" },
    { name: "필라델피아", timezone: "America/New_York" },
    { name: "샌안토니오", timezone: "America/Chicago" },
    { name: "샌디에이고", timezone: "America/Los_Angeles" },
    { name: "댈러스", timezone: "America/Chicago" },
    { name: "샌프란시스코", timezone: "America/Los_Angeles" },
    { name: "시애틀", timezone: "America/Los_Angeles" },
    { name: "보스턴", timezone: "America/New_York" },
    { name: "토론토", timezone: "America/Toronto" },
    { name: "밴쿠버", timezone: "America/Vancouver" },
    { name: "몬트리올", timezone: "America/Toronto" },
    { name: "멕시코시티", timezone: "America/Mexico_City" },

    // 남미
    { name: "상파울루", timezone: "America/Sao_Paulo" },
    { name: "리우데자네이루", timezone: "America/Sao_Paulo" },
    { name: "부에노스아이레스", timezone: "America/Argentina/Buenos_Aires" },
    { name: "산티아고", timezone: "America/Santiago" },
    { name: "리마", timezone: "America/Lima" },
    { name: "보고타", timezone: "America/Bogota" },
    { name: "카라카스", timezone: "America/Caracas" },

    // 아프리카
    { name: "카이로", timezone: "Africa/Cairo" },
    { name: "라고스", timezone: "Africa/Lagos" },
    { name: "요하네스버그", timezone: "Africa/Johannesburg" },
    { name: "케이프타운", timezone: "Africa/Johannesburg" },
    { name: "나이로비", timezone: "Africa/Nairobi" },
    { name: "카사블랑카", timezone: "Africa/Casablanca" },

    // 중동
    { name: "텔아비브", timezone: "Asia/Jerusalem" },
    { name: "리야드", timezone: "Asia/Riyadh" },
    { name: "도하", timezone: "Asia/Qatar" },
    { name: "쿠웨이트시티", timezone: "Asia/Kuwait" },
    { name: "테헤란", timezone: "Asia/Tehran" },
  ],
  en: [
    // Asia-Pacific
    { name: "Seoul", timezone: "Asia/Seoul" },
    { name: "Tokyo", timezone: "Asia/Tokyo" },
    { name: "Beijing", timezone: "Asia/Shanghai" },
    { name: "Shanghai", timezone: "Asia/Shanghai" },
    { name: "Hong Kong", timezone: "Asia/Hong_Kong" },
    { name: "Singapore", timezone: "Asia/Singapore" },
    { name: "Bangkok", timezone: "Asia/Bangkok" },
    { name: "Jakarta", timezone: "Asia/Jakarta" },
    { name: "Manila", timezone: "Asia/Manila" },
    { name: "Kuala Lumpur", timezone: "Asia/Kuala_Lumpur" },
    { name: "Mumbai", timezone: "Asia/Kolkata" },
    { name: "New Delhi", timezone: "Asia/Kolkata" },
    { name: "Bangalore", timezone: "Asia/Kolkata" },
    { name: "Dubai", timezone: "Asia/Dubai" },
    { name: "Sydney", timezone: "Australia/Sydney" },
    { name: "Melbourne", timezone: "Australia/Melbourne" },
    { name: "Auckland", timezone: "Pacific/Auckland" },

    // Europe
    { name: "London", timezone: "Europe/London" },
    { name: "Paris", timezone: "Europe/Paris" },
    { name: "Berlin", timezone: "Europe/Berlin" },
    { name: "Amsterdam", timezone: "Europe/Amsterdam" },
    { name: "Zurich", timezone: "Europe/Zurich" },
    { name: "Rome", timezone: "Europe/Rome" },
    { name: "Madrid", timezone: "Europe/Madrid" },
    { name: "Barcelona", timezone: "Europe/Madrid" },
    { name: "Stockholm", timezone: "Europe/Stockholm" },
    { name: "Copenhagen", timezone: "Europe/Copenhagen" },
    { name: "Oslo", timezone: "Europe/Oslo" },
    { name: "Helsinki", timezone: "Europe/Helsinki" },
    { name: "Moscow", timezone: "Europe/Moscow" },
    { name: "Istanbul", timezone: "Europe/Istanbul" },
    { name: "Athens", timezone: "Europe/Athens" },
    { name: "Prague", timezone: "Europe/Prague" },
    { name: "Budapest", timezone: "Europe/Budapest" },
    { name: "Warsaw", timezone: "Europe/Warsaw" },

    // North America
    { name: "New York", timezone: "America/New_York" },
    { name: "Los Angeles", timezone: "America/Los_Angeles" },
    { name: "Chicago", timezone: "America/Chicago" },
    { name: "Houston", timezone: "America/Chicago" },
    { name: "Phoenix", timezone: "America/Phoenix" },
    { name: "Philadelphia", timezone: "America/New_York" },
    { name: "San Antonio", timezone: "America/Chicago" },
    { name: "San Diego", timezone: "America/Los_Angeles" },
    { name: "Dallas", timezone: "America/Chicago" },
    { name: "San Francisco", timezone: "America/Los_Angeles" },
    { name: "Seattle", timezone: "America/Los_Angeles" },
    { name: "Boston", timezone: "America/New_York" },
    { name: "Toronto", timezone: "America/Toronto" },
    { name: "Vancouver", timezone: "America/Vancouver" },
    { name: "Montreal", timezone: "America/Toronto" },
    { name: "Mexico City", timezone: "America/Mexico_City" },

    // South America
    { name: "Sao Paulo", timezone: "America/Sao_Paulo" },
    { name: "Rio de Janeiro", timezone: "America/Sao_Paulo" },
    { name: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires" },
    { name: "Santiago", timezone: "America/Santiago" },
    { name: "Lima", timezone: "America/Lima" },
    { name: "Bogota", timezone: "America/Bogota" },
    { name: "Caracas", timezone: "America/Caracas" },

    // Africa
    { name: "Cairo", timezone: "Africa/Cairo" },
    { name: "Lagos", timezone: "Africa/Lagos" },
    { name: "Johannesburg", timezone: "Africa/Johannesburg" },
    { name: "Cape Town", timezone: "Africa/Johannesburg" },
    { name: "Nairobi", timezone: "Africa/Nairobi" },
    { name: "Casablanca", timezone: "Africa/Casablanca" },

    // Middle East
    { name: "Tel Aviv", timezone: "Asia/Jerusalem" },
    { name: "Riyadh", timezone: "Asia/Riyadh" },
    { name: "Doha", timezone: "Asia/Qatar" },
    { name: "Kuwait City", timezone: "Asia/Kuwait" },
    { name: "Tehran", timezone: "Asia/Tehran" },
  ]
}

export const getCitiesByLanguage = (language: "ko" | "en") => {
  return CITIES[language] || CITIES.en
}
