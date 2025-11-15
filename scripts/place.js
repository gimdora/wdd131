const tempC = 5;
const windKmh = 12;

document.getElementById('tVal').textContent = tempC;
document.getElementById('wVal').textContent = windKmh;

const calculateWindChill = (t, v) => Math.round((13.12 + 0.6215*t - 11.37*Math.pow(v,0.16) + 0.3965*t*Math.pow(v,0.16))*10)/10;

const shouldCalc = tempC <= 10 && windKmh > 4.8;
document.getElementById('wcVal').textContent = shouldCalc ? `${calculateWindChill(tempC, windKmh)} °C` : 'N/A';

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastmod').textContent = document.lastModified;
