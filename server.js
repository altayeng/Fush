const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ay evresi hesaplama (0-1 arası, 0=yeni ay, 0.5=dolunay)
function getMoonPhase(date) {
    const refNewMoon = new Date('2000-01-06').getTime();
    const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000; // milisaniye
    const elapsed = date.getTime() - refNewMoon;
    const phase = (elapsed % synodicMonth) / synodicMonth;
    return phase;
}

// Balık aktivitesi skorlama algoritması (Gerçekçi ve dengeli)
function calculateFishingScore(weatherData, hour) {
    const data = weatherData.hourly;
    const idx = hour;
    
    let score = 30; // Daha düşük başlangıç skoru (gerçekçi)
    let factors = [];
    
    // 1. Sıcaklık analizi (Optimal: 12-22°C - daha dar aralık)
    const temp = data.temperature_2m[idx];
    if (temp >= 12 && temp <= 22) {
        const tempBonus = 10 - Math.abs(temp - 17) * 0.5; // 17°C ideal
        score += tempBonus;
        factors.push({ name: 'Sıcaklık', value: `Optimal (${temp.toFixed(1)}°C)`, impact: Math.round(tempBonus) });
    } else if (temp >= 8 && temp <= 28) {
        const penalty = Math.abs(temp - 17) * 0.3;
        score -= penalty;
        factors.push({ name: 'Sıcaklık', value: `Orta (${temp.toFixed(1)}°C)`, impact: -Math.round(penalty) });
    } else {
        score -= 15;
        factors.push({ name: 'Sıcaklık', value: `Zayıf (${temp.toFixed(1)}°C)`, impact: -15 });
    }
    
    // 2. Basınç analizi (Çok kritik faktör)
    const pressure = data.surface_pressure[idx];
    const prevPressure = idx > 0 ? data.surface_pressure[idx - 1] : pressure;
    const pressureChange = pressure - prevPressure;
    
    // Basınç değeri
    if (pressure >= 1013 && pressure <= 1020) {
        score += 8;
        factors.push({ name: 'Basınç', value: `Stabil (${pressure.toFixed(0)} hPa)`, impact: 8 });
    } else if (pressure < 1000 || pressure > 1030) {
        score -= 12;
        factors.push({ name: 'Basınç', value: `Aşırı (${pressure.toFixed(0)} hPa)`, impact: -12 });
    } else {
        factors.push({ name: 'Basınç', value: `Normal (${pressure.toFixed(0)} hPa)`, impact: 0 });
    }
    
    // Basınç trendi (çok önemli!)
    if (pressureChange < -1) {
        score += 12;
        factors.push({ name: 'Basınç Trendi', value: 'Hızlı Düşüyor', impact: 12 });
    } else if (pressureChange < -0.3) {
        score += 8;
        factors.push({ name: 'Basınç Trendi', value: 'Düşüyor', impact: 8 });
    } else if (pressureChange > 1) {
        score -= 8;
        factors.push({ name: 'Basınç Trendi', value: 'Hızlı Yükseliyor', impact: -8 });
    } else if (pressureChange > 0.3) {
        score -= 4;
        factors.push({ name: 'Basınç Trendi', value: 'Yükseliyor', impact: -4 });
    }
    
    // 3. Rüzgar analizi (Daha sıkı kontrol)
    const windSpeed = data.wind_speed_10m[idx];
    if (windSpeed >= 5 && windSpeed <= 12) {
        score += 10;
        factors.push({ name: 'Rüzgar Hızı', value: `İdeal (${windSpeed.toFixed(1)} km/s)`, impact: 10 });
    } else if (windSpeed >= 13 && windSpeed <= 20) {
        score += 3;
        factors.push({ name: 'Rüzgar Hızı', value: `Orta (${windSpeed.toFixed(1)} km/s)`, impact: 3 });
    } else if (windSpeed > 25) {
        score -= 18;
        factors.push({ name: 'Rüzgar Hızı', value: `Çok Güçlü (${windSpeed.toFixed(1)} km/s)`, impact: -18 });
    } else {
        score -= 6;
        factors.push({ name: 'Rüzgar Hızı', value: `Çok Sakin (${windSpeed.toFixed(1)} km/s)`, impact: -6 });
    }
    
    // 4. Yağış analizi (Kritik)
    const precipitation = data.precipitation[idx];
    if (precipitation > 10) {
        score -= 25;
        factors.push({ name: 'Yağış', value: `Şiddetli Yağmur (${precipitation.toFixed(1)} mm)`, impact: -25 });
    } else if (precipitation > 5) {
        score -= 12;
        factors.push({ name: 'Yağış', value: `Orta Yağmur (${precipitation.toFixed(1)} mm)`, impact: -12 });
    } else if (precipitation > 0.5 && precipitation <= 2) {
        score += 5;
        factors.push({ name: 'Yağış', value: `Hafif Yağmur (${precipitation.toFixed(1)} mm)`, impact: 5 });
    } else if (precipitation === 0) {
        factors.push({ name: 'Yağış', value: 'Yok', impact: 0 });
    }
    
    // 5. Bulutluluk (Önemli ama değişken)
    const cloudCover = data.cloud_cover[idx];
    if (cloudCover >= 40 && cloudCover <= 75) {
        score += 7;
        factors.push({ name: 'Bulutluluk', value: `İdeal (${cloudCover}%)`, impact: 7 });
    } else if (cloudCover > 90) {
        score -= 5;
        factors.push({ name: 'Bulutluluk', value: `Çok Bulutlu (${cloudCover}%)`, impact: -5 });
    } else if (cloudCover < 20) {
        score -= 3;
        factors.push({ name: 'Bulutluluk', value: `Çok Açık (${cloudCover}%)`, impact: -3 });
    } else {
        factors.push({ name: 'Bulutluluk', value: `Orta (${cloudCover}%)`, impact: 0 });
    }
    
    // 6. Günün saati analizi (EN ÖNEMLI FAKTÖR)
    const hourOfDay = new Date(data.time[idx]).getHours();
    if ((hourOfDay >= 5 && hourOfDay <= 7) || (hourOfDay >= 18 && hourOfDay <= 20)) {
        score += 18; // Prime time bonusu
        factors.push({ name: 'Gün Saati', value: 'Altın Saatler (Şafak/Alacakaranlık)', impact: 18 });
    } else if ((hourOfDay >= 8 && hourOfDay <= 10) || (hourOfDay >= 16 && hourOfDay <= 17)) {
        score += 8;
        factors.push({ name: 'Gün Saati', value: 'İyi Saatler', impact: 8 });
    } else if (hourOfDay >= 12 && hourOfDay <= 15) {
        score -= 12;
        factors.push({ name: 'Gün Saati', value: 'Öğle (En Kötü)', impact: -12 });
    } else if (hourOfDay >= 21 || hourOfDay <= 4) {
        score -= 8;
        factors.push({ name: 'Gün Saati', value: 'Gece', impact: -8 });
    } else {
        score += 2;
        factors.push({ name: 'Gün Saati', value: 'Normal', impact: 2 });
    }
    
    // 7. Ay evresi (Orta etki)
    const date = new Date(data.time[idx]);
    const moonPhase = getMoonPhase(date);
    
    if (moonPhase < 0.05 || moonPhase > 0.95) {
        score += 10;
        factors.push({ name: 'Ay Evresi', value: 'Yeni Ay', impact: 10 });
    } else if (moonPhase >= 0.45 && moonPhase <= 0.55) {
        score += 10;
        factors.push({ name: 'Ay Evresi', value: 'Dolunay', impact: 10 });
    } else if (moonPhase >= 0.2 && moonPhase <= 0.3) {
        score += 4;
        factors.push({ name: 'Ay Evresi', value: 'İlk Dördün', impact: 4 });
    } else if (moonPhase >= 0.7 && moonPhase <= 0.8) {
        score += 4;
        factors.push({ name: 'Ay Evresi', value: 'Son Dördün', impact: 4 });
    } else {
        score -= 2;
        factors.push({ name: 'Ay Evresi', value: 'Normal Evre', impact: -2 });
    }
    
    // Skoru 0-100 arasında tut
    score = Math.max(0, Math.min(100, score));
    
    return { score: Math.round(score), factors };
}

// Skor kategorisi belirleme (Daha gerçekçi eşikler)
function getScoreCategory(score) {
    if (score >= 75) return { label: 'Mükemmel', color: '#10b981', emoji: '🎣' };
    if (score >= 60) return { label: 'Çok İyi', color: '#3b82f6', emoji: '🐟' };
    if (score >= 45) return { label: 'İyi', color: '#6366f1', emoji: '🌊' };
    if (score >= 30) return { label: 'Orta', color: '#f59e0b', emoji: '⚠️' };
    return { label: 'Zayıf', color: '#ef4444', emoji: '❌' };
}

// Open-Meteo API'den hava durumu verisi çekme
app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Enlem ve boylam gerekli' });
        }
        
        // Open-Meteo API çağrısı
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: lat,
                longitude: lon,
                hourly: 'temperature_2m,precipitation,cloud_cover,wind_speed_10m,surface_pressure',
                forecast_days: 3,
                timezone: 'auto'
            }
        });
        
        const weatherData = response.data;
        
        // Her saat için balık aktivitesi skorunu hesapla
        const hourlyAnalysis = [];
        const hoursToAnalyze = 72; // 3 gün * 24 saat
        
        for (let i = 0; i < hoursToAnalyze && i < weatherData.hourly.time.length; i++) {
            const analysis = calculateFishingScore(weatherData, i);
            const category = getScoreCategory(analysis.score);
            
            hourlyAnalysis.push({
                time: weatherData.hourly.time[i],
                score: analysis.score,
                category: category,
                factors: analysis.factors,
                weather: {
                    temperature: weatherData.hourly.temperature_2m[i],
                    precipitation: weatherData.hourly.precipitation[i],
                    windSpeed: weatherData.hourly.wind_speed_10m[i],
                    cloudCover: weatherData.hourly.cloud_cover[i],
                    pressure: weatherData.hourly.surface_pressure[i]
                }
            });
        }
        
        // En iyi zamanları bul (skor >= 60, daha gerçekçi eşik)
        const bestTimes = hourlyAnalysis
            .filter(h => h.score >= 60)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8);
        
        res.json({
            hourly: hourlyAnalysis,
            bestTimes: bestTimes,
            location: {
                latitude: weatherData.latitude,
                longitude: weatherData.longitude,
                timezone: weatherData.timezone
            }
        });
        
    } catch (error) {
        console.error('API Hatası:', error.message);
        res.status(500).json({ error: 'Hava durumu verileri alınamadı' });
    }
});

// Geocoding (lokasyon arama)
app.get('/api/geocode', async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: 'Arama sorgusu gerekli' });
        }
        
        const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
            params: {
                name: query,
                count: 5,
                language: 'tr',
                format: 'json'
            }
        });
        
        if (!response.data.results) {
            return res.json({ results: [] });
        }
        
        res.json({ results: response.data.results });
        
    } catch (error) {
        console.error('Geocoding Hatası:', error.message);
        res.status(500).json({ error: 'Lokasyon araması yapılamadı' });
    }
});

app.listen(PORT, () => {
    console.log(`🎣 Balık Avı Optimizer çalışıyor: http://localhost:${PORT}`);
});
