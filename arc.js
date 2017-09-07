function getWeek(date) {
  var nDay = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - nDay + 3);
  var n1stThursday = date.valueOf();
  date.setMonth(0, 1);
  if (date.getDay() !== 4) {
    date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7);
  }
  return 2 + Math.ceil((n1stThursday - date) / 604800000);
}

function getWeekID(date){
  if (!(date instanceof Date)) date = new Date();
  let weekNum = getWeek(date);
  return date.getFullYear()*1000+weekNum;
}

var dayToFrench = {
  0:"Lundi",
  1:"Mardi",
  2:"Mercredi",
  3:"Jeudi",
  4:"Vendredi",
  5:"Samedi",
  6:"Dimanche"
};

function weekToFrench(weekid, weekstart){
  switch(weekid){
    case getWeekID(): return "Cette semaine";
    case getWeekID()+1 : return "La semaine prochaine";
    default : return "Semaine du "+weekstart;
  }
}

function ParseCP(){
    var entries ={};
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vTEMyAwsSzIG81OPfEN4KUC2PFdif1KfrODE8EukJ4o3dZp7gxhmBlzxf6kCx-yqFFUCs1K94Azycoo/pub?gid=0&single=true&output=csv",{
      download:true,
      header:true,
      complete:function(results){
        let data = results.data;
        let go = true;
        let i = 0;
        while(go){
          week = data[i]["weekid"];
          if(week>=getWeekID()){
            day = data[i]["day"];
            if(!(week in entries)) entries[week] = {};
            if(!(day in entries[week])) entries[week][day] = [];
            entries[week][day].push(data[i]);
          }
          i++;
          if(data[i]["weekid"]=="1899053") go= false;
        }
        str = "";
        Object.keys(entries).forEach(function(weekid){
          let days = entries[weekid];
          str += "<h2>"+weekToFrench(Number(weekid),entries[weekid][Object.keys(days)[0]][0]["weekstart"])+"</h2>";
          Object.keys(days).forEach(function(day){
            str += "<table><tr>"
            str += "<th rowspan='"+(entries[weekid][day].length+1)+"' >"+dayToFrench[day]+"</th></tr>"
              entries[weekid][day].forEach(function(entry){
                str += "<tr><td>"+entry["Cours"]+"</td><td>"+entry["Type"]+"</td></li>";
              });
            str += "</table>";
          });
        });
        CPL.innerHTML = str;
      }
    });
  }

  function loadSchedule(){
    const req = new XMLHttpRequest();
    req.open('GET', 'schedule.html', false);
    req.send(null);
    schedule.innerHTML = req.responseText;

  }
