// Dil seçeneği yönetimi
const languages = {
    tr: {
        // Hero Section
        heroTitle: 'Balık Avı Optimizer',
        heroSubtitle: 'Hava durumu verilerini analiz ederek balık avı için en optimum zamanları bulun.\nBilimsel algoritmalarımızla başarılı avlanma şansınızı artırın.',
        
        // Search Section
        searchTitle: 'Konum Seçin',
        searchSubtitle: 'Balık avı yapmak istediğiniz şehri veya bölgeyi arayın',
        searchPlaceholder: 'İstanbul, Ankara, İzmir...',
        mapToggleShow: '📍 Haritadan Seç',
        mapToggleHide: '🗺️ Haritayı Gizle',
        searchButton: 'Ara',
        
        // Status Messages
        loadingMessage: 'Hava durumu verileri analiz ediliyor...',
        errorNoResults: 'Konum bulunamadı. Farklı bir arama terimi deneyin.',
        errorMinChars: 'Lütfen en az 2 karakter girin',
        errorFetch: 'Hava durumu verileri alınamadı. Lütfen tekrar deneyin.',
        noResultsMessage: 'Uygun Zaman Bulunamadı',
        noResultsDescription: 'Seçtiğiniz konumda önümüzdeki 3 gün içinde iyi balık avı koşulları bulunmuyor.',
        
        // Results Section
        resultsTitle: 'Optimum Zamanlar',
        resultsSubtitle: 'En iyi balık avı koşulları için önerilen zamanlar',
        chartTitle: '72 Saatlik Tahmin',
        chartSubtitle: 'Balık aktivitesi skorları',
        chartHint: 'Grafik çubuklarına tıklayarak detaylı analizi görebilirsiniz',
        chartYAxisLabel: 'Aktivite Skoru',
        
        // Weather Items
        temperature: 'Sıcaklık',
        wind: 'Rüzgar',
        cloud: 'Bulut',
        
        // Categories
        categories: {
            excellent: 'Mükemmel',
            veryGood: 'Çok İyi',
            good: 'İyi',
            fair: 'Orta',
            poor: 'Zayıf'
        },
        
        // Modal
        pressure: 'Basınç',
        precipitation: 'Yağış',
        impactFactors: 'Etki Faktörleri',
        weatherDetails: 'Hava Durumu',
        windSpeed: 'Rüzgar Hızı',
        cloudCover: 'Bulutluluk',
        
        // Factors
        factorTemperature: 'Sıcaklık',
        factorPressure: 'Basınç',
        factorPressureTrend: 'Basınç Trendi',
        factorWindSpeed: 'Rüzgar Hızı',
        factorPrecipitation: 'Yağış',
        factorCloudCover: 'Bulutluluk',
        factorTimeOfDay: 'Gün Saati',
        factorMoonPhase: 'Ay Evresi',
        
        // Factor Values
        optimal: 'Optimal',
        ideal: 'İdeal',
        good: 'İyi',
        medium: 'Orta',
        poor: 'Zayıf',
        veryStrong: 'Çok Güçlü',
        strong: 'Güçlü',
        weak: 'Sakin',
        stable: 'Stabil',
        extreme: 'Aşırı',
        normal: 'Normal',
        
        // Precipitation types
        heavyRain: 'Şiddetli Yağmur',
        lightRain: 'Hafif Yağmur',
        mediumRain: 'Orta Yağmur',
        noRain: 'Yok',
        
        // Cloud conditions
        veryCloudy: 'Çok Bulutlu',
        partiallyCloudy: 'Kısmen Bulutlu',
        veryClear: 'Çok Açık',
        
        // Time of day
        goldenHours: 'Altın Saatler (Şafak/Alacakaranlık)',
        goodHours: 'İyi Saatler',
        noon: 'Öğle (En Kötü)',
        night: 'Gece',
        
        // Moon phases
        newMoon: 'Yeni Ay',
        fullMoon: 'Dolunay',
        firstQuarter: 'İlk Dördün',
        lastQuarter: 'Son Dördün',
        normalPhase: 'Normal Evre',
        
        // Pressure trends
        fastDecreasing: 'Hızlı Düşüyor',
        decreasing: 'Düşüyor',
        fastIncreasing: 'Hızlı Yükseliyor',
        increasing: 'Yükseliyor',
        
        // Wind descriptions
        idealWind: 'İdeal',
        mediumWind: 'Orta',
        
        // Language switcher
        language: 'Dil',
        turkish: 'Türkçe',
        english: 'English',
        status: 'Durum'
    },
    en: {
        // Hero Section
        heroTitle: 'Fishing Optimizer',
        heroSubtitle: 'Find the optimal times for fishing by analyzing weather data.\nIncrease your chances of successful fishing with our scientific algorithms.',
        
        // Search Section
        searchTitle: 'Select Location',
        searchSubtitle: 'Search for the city or region where you want to fish',
        searchPlaceholder: 'Istanbul, Ankara, Izmir...',
        mapToggleShow: '📍 Select from Map',
        mapToggleHide: '🗺️ Hide Map',
        searchButton: 'Search',
        
        // Status Messages
        loadingMessage: 'Analyzing weather data...',
        errorNoResults: 'Location not found. Try a different search term.',
        errorMinChars: 'Please enter at least 2 characters',
        errorFetch: 'Could not retrieve weather data. Please try again.',
        noResultsMessage: 'No Suitable Times Found',
        noResultsDescription: 'There are no good fishing conditions in your selected location for the next 3 days.',
        
        // Results Section
        resultsTitle: 'Optimal Times',
        resultsSubtitle: 'Recommended times for the best fishing conditions',
        chartTitle: '72-Hour Forecast',
        chartSubtitle: 'Fish activity scores',
        chartHint: 'Click on chart bars to view detailed analysis',
        chartYAxisLabel: 'Activity Score',
        
        // Weather Items
        temperature: 'Temperature',
        wind: 'Wind',
        cloud: 'Cloud',
        
        // Categories
        categories: {
            excellent: 'Excellent',
            veryGood: 'Very Good',
            good: 'Good',
            fair: 'Fair',
            poor: 'Poor'
        },
        
        // Modal
        pressure: 'Pressure',
        precipitation: 'Precipitation',
        impactFactors: 'Impact Factors',
        weatherDetails: 'Weather Details',
        windSpeed: 'Wind Speed',
        cloudCover: 'Cloud Cover',
        
        // Factors
        factorTemperature: 'Temperature',
        factorPressure: 'Pressure',
        factorPressureTrend: 'Pressure Trend',
        factorWindSpeed: 'Wind Speed',
        factorPrecipitation: 'Precipitation',
        factorCloudCover: 'Cloud Cover',
        factorTimeOfDay: 'Time of Day',
        factorMoonPhase: 'Moon Phase',
        
        // Factor Values
        optimal: 'Optimal',
        ideal: 'Ideal',
        good: 'Good',
        medium: 'Medium',
        poor: 'Poor',
        veryStrong: 'Very Strong',
        strong: 'Strong',
        weak: 'Calm',
        stable: 'Stable',
        extreme: 'Extreme',
        normal: 'Normal',
        
        // Precipitation types
        heavyRain: 'Heavy Rain',
        lightRain: 'Light Rain',
        mediumRain: 'Medium Rain',
        noRain: 'None',
        
        // Cloud conditions
        veryCloudy: 'Very Cloudy',
        partiallyCloudy: 'Partly Cloudy',
        veryClear: 'Very Clear',
        
        // Time of day
        goldenHours: 'Golden Hours (Dawn/Dusk)',
        goodHours: 'Good Hours',
        noon: 'Noon (Worst)',
        night: 'Night',
        
        // Moon phases
        newMoon: 'New Moon',
        fullMoon: 'Full Moon',
        firstQuarter: 'First Quarter',
        lastQuarter: 'Last Quarter',
        normalPhase: 'Normal Phase',
        
        // Pressure trends
        fastDecreasing: 'Rapidly Decreasing',
        decreasing: 'Decreasing',
        fastIncreasing: 'Rapidly Increasing',
        increasing: 'Increasing',
        
        // Wind descriptions
        idealWind: 'Ideal',
        mediumWind: 'Medium',
        
        // Language switcher
        language: 'Language',
        turkish: 'Türkçe',
        english: 'English',
        status: 'Status'
    }
};

// Mevcut dili al (localStorage'dan veya varsayılan olarak Türkçe)
function getCurrentLanguage() {
    const savedLang = localStorage.getItem('fishingAppLanguage');
    return savedLang || 'tr';
}

// Dili ayarla
function setLanguage(lang) {
    if (languages[lang]) {
        localStorage.setItem('fishingAppLanguage', lang);
        return lang;
    }
    return getCurrentLanguage();
}

// Çeviri almak için yardımcı fonksiyon
function t(key) {
    const lang = getCurrentLanguage();
    const keys = key.split('.');
    let value = languages[lang];
    
    for (let k of keys) {
        value = value ? value[k] : undefined;
    }
    
    return value || key;
}

// HTML'de dilleri güncelle
function updatePageLanguage(lang) {
    setLanguage(lang);
    
    // Hero Section
    document.querySelector('.hero-title').textContent = t('heroTitle');
    document.querySelector('.hero-subtitle').textContent = t('heroSubtitle');
    
    // Search Section
    document.querySelector('.search-title').textContent = t('searchTitle');
    document.querySelector('.search-subtitle').textContent = t('searchSubtitle');
    document.getElementById('searchInput').placeholder = t('searchPlaceholder');
    document.querySelector('.map-toggle').textContent = t('mapToggleShow');
    document.querySelector('.search-btn').textContent = t('searchButton');
    
    // Results Section
    const resultsTitle = document.getElementById('resultsTitle');
    if (resultsTitle) {
        resultsTitle.textContent = t('resultsTitle');
    }
    const resultsSubtitle = document.getElementById('resultsSubtitle');
    if (resultsSubtitle) {
        resultsSubtitle.textContent = t('resultsSubtitle');
    }
    
    // Chart Section
    const chartTitle = document.getElementById('chartTitle');
    if (chartTitle) {
        chartTitle.textContent = t('chartTitle');
    }
    const chartSubtitle = document.getElementById('chartSubtitle');
    if (chartSubtitle) {
        chartSubtitle.textContent = t('chartSubtitle');
    }
    const chartHint = document.getElementById('chartHint');
    if (chartHint) {
        chartHint.textContent = t('chartHint');
    }
    
    // Modal Sections
    const impactFactorsTitle = document.getElementById('impactFactorsTitle');
    if (impactFactorsTitle) {
        impactFactorsTitle.textContent = t('impactFactors');
    }
    const weatherDetailsTitle = document.getElementById('weatherDetailsTitle');
    if (weatherDetailsTitle) {
        weatherDetailsTitle.textContent = t('weatherDetails');
    }
    
    // Chart'ı yeniden oluştur (eğer veri varsa)
    if (window.currentData && window.fishingChart) {
        window.fishingChart.destroy();
        window.fishingChart = null;
        window.createChart(window.currentData);
    }
    
    // Dil seçiciyi güncelle
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // HTML dil atributunu güncelle
    document.documentElement.lang = lang;
    
    // RTL/LTR kontrol (Türkçe için LTR, İngilizce için LTR)
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
    
    // Chart'ı yeniden oluştur eğer veriler varsa
    if (typeof window.currentData !== 'undefined' && window.currentData) {
        setTimeout(() => {
            if (typeof displayBestTimes !== 'undefined') {
                displayBestTimes(window.currentData);
                if (typeof createChart !== 'undefined') {
                    createChart(window.currentData);
                }
            }
        }, 100);
    }
}

// Sayfa yüklendiğinde dili uygula
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLanguage();
    updatePageLanguage(currentLang);
});
