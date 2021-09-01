'use strict';

/*get the labels*/
const cntTodayConf = document.querySelector('#country-today-confirmed');
const cntTotalConf = document.querySelector('#country-total-confirmed');

const cntTodayActv = document.querySelector('#country-today-active');
const cntTotalActv = document.querySelector('#country-total-active');

const cntTodayRecvd = document.querySelector('#country-today-recovered');
const cntTotalRecvd = document.querySelector('#country-total-recovered');

const cntTodayDcsd = document.querySelector('#country-today-deceased');
const cntTotalDcsd = document.querySelector('#country-total-deceased');

const cntTodayVcc = document.querySelector('#country-today-vaccinated');
const cntTotalVcc = document.querySelector('#country-total-vaccinated');

const cntTodayTPR = document.querySelector("#country-today-TPR");
const cntWeekTPR= document.querySelector('#country-week-TPR');

const indiaUpdatedAt =document.querySelector('.country-stats-updated');

const locale='hi-IN';

fetch('https://data.covid19india.org/v4/min/data.min.json').then(function(response)
{
    return response.json();
}).then(function(dataa)
{
    console.log(dataa);
    const deltaConf = dataa.TT.delta.confirmed;
    const deltaDeceased = dataa.TT.delta.deceased;
    const deltaRecovered = dataa.TT.delta.recovered;
    const vaccinatedToday = (dataa.TT.delta.vaccinated1 + dataa.TT.delta.vaccinated2);

    const fullConf = dataa.TT.total.confirmed;
    const fullRecovered = dataa.TT.total.recovered;
    const fullDeceased = dataa.TT.total.deceased;
    const fullVaccinated = (dataa.TT.total.vaccinated1 + dataa.TT.total.vaccinated2);
    const activeInCountry = fullConf - fullRecovered -fullDeceased -dataa.TT.total.other;

    const currentTPR = ((deltaConf / dataa.TT.delta.tested)*100);
    const weekTPR = ((dataa.TT.delta7.confirmed / dataa.TT.delta7.tested)*100);
    
    cntTodayConf.textContent = `Today: ${new Intl.NumberFormat(locale).format(deltaConf)}`;
    cntTodayRecvd.textContent=`Today: ${new Intl.NumberFormat(locale).format(deltaRecovered)}`;
    cntTodayDcsd.textContent=`Today: ${new Intl.NumberFormat(locale).format(deltaDeceased)}`;
    cntTodayVcc.textContent=`Today: ${new Intl.NumberFormat(locale).format(vaccinatedToday)}`;

    cntTotalConf.textContent=`Total: ${new Intl.NumberFormat(locale).format(fullConf)}`;
    cntTotalDcsd.textContent=`Total: ${new Intl.NumberFormat(locale).format(fullDeceased)}`;
    cntTotalRecvd.textContent=`Total: ${new Intl.NumberFormat(locale).format(fullRecovered)}`;
    cntTotalVcc.textContent=`Total: ${new Intl.NumberFormat(locale).format(fullVaccinated)}`;

    cntTodayActv.textContent=`Now: ${new Intl.NumberFormat(locale).format(activeInCountry)}`;
    cntTodayTPR.textContent=`Current: ${currentTPR.toFixed(2)}%`;
    cntWeekTPR.textContent=`7 - Day: ${weekTPR.toFixed(2)}%`;

    let dateFetched = new Date(dataa.TT.meta.last_updated);
    
    
    const options = 
    {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
        hour :"numeric",
        minute:"numeric",
        second:"numeric"
    }
    dateFetched=new Intl.DateTimeFormat(navigator.geolocation,options).format(dateFetched);
    indiaUpdatedAt.textContent=`Updated: ${dateFetched}`;

    
    

})

