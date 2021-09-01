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

/*For Bihar*/
const biharcntTodayConf = document.querySelector('#bihar-today-confirmed');
const biharcntTotalConf = document.querySelector('#bihar-total-confirmed');

const biharcntTodayActv = document.querySelector('#bihar-today-active');
const biharcntTotalActv = document.querySelector('#bihar-total-active');

const biharcntTodayRecvd = document.querySelector('#bihar-today-recovered');
const biharcntTotalRecvd = document.querySelector('#bihar-total-recovered');

const biharcntTodayDcsd = document.querySelector('#bihar-today-deceased');
const biharcntTotalDcsd = document.querySelector('#bihar-total-deceased');

const biharcntTodayVcc = document.querySelector('#bihar-today-vaccinated');
const biharcntTotalVcc = document.querySelector('#bihar-total-vaccinated');

const biharcntTodayTPR = document.querySelector("#bihar-today-TPR");
const biharcntWeekTPR= document.querySelector('#bihar-week-TPR');

const biharUpdatedAt =document.querySelector('.bihar-stats-updated');
/*---------------------------------------------------------------------*/

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
    const vaccinatedToday = (dataa.TT?.delta?.vaccinated1 + dataa.TT?.delta?.vaccinated2);
    if(Number.isFinite(vaccinatedToday)==false)
        cntTodayVcc.textContent=`Today: Not Announced`;
    else
        cntTodayVcc.textContent=`Today: ${new Intl.NumberFormat(locale).format(vaccinatedToday)}`;



    const fullConf = dataa.TT.total.confirmed;
    const fullRecovered = dataa.TT.total.recovered;
    const fullDeceased = dataa.TT.total.deceased;
    const fullVaccinated = (dataa.TT.total.vaccinated1 + dataa.TT.total.vaccinated2);
    const activeInCountry = fullConf - fullRecovered -fullDeceased -dataa.TT.total.other;
    const weekTPR = ((dataa.TT.delta7.confirmed / dataa.TT.delta7.tested)*100);
    const currentTPR = ((deltaConf / dataa.TT?.delta?.tested)*100);
    
    cntTodayConf.textContent = `Today: ${new Intl.NumberFormat(locale).format(deltaConf)}`;
    cntTodayRecvd.textContent=`Today: ${new Intl.NumberFormat(locale).format(deltaRecovered)}`;
    cntTodayDcsd.textContent=`Today: ${new Intl.NumberFormat(locale).format(deltaDeceased)}`;
    
    cntTotalConf.textContent=`Total: ${new Intl.NumberFormat(locale).format(fullConf)}`;
    cntTotalDcsd.textContent=`Total: ${new Intl.NumberFormat(locale).format(fullDeceased)}`;
    cntTotalRecvd.textContent=`Total: ${new Intl.NumberFormat(locale).format(fullRecovered)}`;
    cntTotalVcc.textContent=`Total: ${new Intl.NumberFormat(locale).format(fullVaccinated)}`;
    cntWeekTPR.textContent=`7 - Day: ${weekTPR.toFixed(2)}%`;
    if(Number.isFinite(currentTPR)==false)
        cntTodayTPR.textContent=`Today: Not Announced`;
    else
        cntTodayTPR.textContent=`Today: ${currentTPR.toFixed(2)}%`;

    cntTodayActv.textContent=`Now: ${new Intl.NumberFormat(locale).format(activeInCountry)}`;
    

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

    /*For Bihar*/
  

    const biharfullConf = dataa.BR.total.confirmed;
    const biharfullRecovered = dataa.BR.total.recovered;
    const biharfullDeceased = dataa.BR.total.deceased;
    const biharfullVaccinated = (dataa.BR.total.vaccinated1 + dataa.BR.total.vaccinated2);
    const activeInBihar = biharfullConf - biharfullRecovered -biharfullDeceased -dataa.BR.total.other;
    const biharweekTPR = ((dataa.BR.delta7.confirmed / dataa.BR.delta7.tested)*100);

    biharcntTotalConf.textContent=`Total: ${new Intl.NumberFormat(locale).format(biharfullConf)}`;
    biharcntTotalRecvd.textContent=`Total: ${new Intl.NumberFormat(locale).format(biharfullRecovered)}`;
    biharcntTotalDcsd.textContent=`Total: ${new Intl.NumberFormat(locale).format(biharfullDeceased)}`;
    biharcntTotalVcc.textContent=`Total: ${new Intl.NumberFormat(locale).format(biharfullVaccinated)}`;
    biharcntTodayActv.textContent=`Now: ${new Intl.NumberFormat(locale).format(activeInBihar)}`;
    biharcntWeekTPR.textContent=`7 - Day: ${biharweekTPR.toFixed(4)}%`;

    let bihardateFetched = new Date(dataa.BR.meta.last_updated);
    bihardateFetched=new Intl.DateTimeFormat(navigator.geolocation,options).format(bihardateFetched);
    biharUpdatedAt.textContent=`Updated: ${bihardateFetched}`;

    const bihardeltaConf = dataa?.BR?.delta?.confirmed;
    if(bihardeltaConf===undefined)
        biharcntTodayConf.textContent = `Today: Not Announced`;
    else
        biharcntTodayConf.textContent = `Today: ${new Intl.NumberFormat(locale).format(bihardeltaConf)}`;

    const bihardeltaDeceased = dataa?.BR?.delta?.deceased;
    if(bihardeltaDeceased===undefined)
        biharcntTodayDcsd.textContent = `Today: 0`;
    else
        biharcntTodayDcsd.textContent = `Today: ${new Intl.NumberFormat(locale).format(bihardeltaDeceased)}`;
    
    const bihardeltaRecovered = dataa?.BR?.delta?.recovered;
    if(bihardeltaRecovered===undefined)
        biharcntTodayRecvd.textContent = `Today: Not Announced`;
    else
        biharcntTodayConf.textContent = `Today: ${new Intl.NumberFormat(locale).format(bihardeltaRecovered)}`;

    const biharvaccinatedToday = (dataa.BR?.delta?.vaccinated1 + dataa.BR?.delta?.vaccinated2);
    if(Number.isFinite(biharvaccinatedToday)==false)
        biharcntTodayVcc.textContent = `Today: Not Announced`;
    else
        biharcntTodayVcc.textContent = `Today: ${new Intl.NumberFormat(locale).format(biharvaccinatedToday)}`;

    const biharcurrentTPR = ((dataa.BR?.delta?.confirmed / dataa.BR?.delta?.tested)*100);
    if(Number.isFinite(biharcurrentTPR)==false)
        biharcntTodayTPR.textContent = `Today: Not Announced`;
    else
        biharcntTodayTPR.textContent = `Today: ${new Intl.NumberFormat(locale).format(biharcurrentTPR)}%`;

})

