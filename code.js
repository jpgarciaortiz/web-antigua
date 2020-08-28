var ant;
var req;
var info;
var curl = "";
var cur = null;
var cur2 = null;
var curId = null;
var spanish = true;
var files = "files/";
var base = "http://www.ace.ual.es/~jportiz/";


function initialize()
{
  var obj;

  info = new Object();

  info["personal"] = obj = new Object();
  obj.text = "Informaci&oacute;n personal";
  obj.text2 = "Personal information";
  obj.name2 = "Personal";
  obj.deng = true;

  info["files"] = obj = new Object();
  obj.text = "Archivos para descargar";
  obj.text2 = "Files to download";
  obj.name2 = "Files";
  obj.url = files;

  info["research"] = obj = new Object();
  obj.name2 = "Research";
  obj.table = true;

  info["links"] = obj = new Object();
  obj.text = "Enlaces de inter&eacute;s";
  obj.text2 = "Interesting links";
  obj.name2 = "Links";

  info["areas"] = obj = new Object();
  obj.text = "Areas de investigaci&oacute;n";
  obj.text2 = "Research areas";
  obj.name2 = "Areas";
  obj.deng = true;

  info["conferences"] = obj = new Object();
  obj.text = "Art&iacute;culos publicados en congresos";
  obj.text2 = "Conference papers";
  obj.name2 = "Conferences";

  info["journals"] = obj = new Object();
  obj.text = "Art&iacute;culos publicados en revistas";
  obj.text2 = "Journal papers";
  obj.name2 = "Journals";

  info["books"] = obj = new Object();
  obj.text = "Libros publicados";
  obj.text2 = "Published books";
  obj.name2 = "Books";

  info["projects"] = obj = new Object();
  obj.text = "Participaci&oacute;n en grupos y proyectos de investigaci&oacute;n";
  obj.text2 = "Participation in research groups and projects";
  obj.name2 = "Projects";
  obj.deng = true;

  ini = document.getElementById('personal');
  emph(ini);
  select(ini);
}

function changeLang()
{
  var aux, obj;

  for(key in info) {
    aux = info[key].text;
    info[key].text = info[key].text2;
    info[key].text2 = aux;

    obj = document.getElementById(key);
    if(obj) {
      aux = obj.innerHTML;
      obj.innerHTML = info[key].name2;
      info[key].name2 = aux;
    }
  }

  spanish = !spanish;
  obj = document.getElementById("langButton");
  if(spanish) obj.innerHTML = "English";
  else obj.innerHTML = "Espa&ntilde;ol";

  update();
}

function processReqChange()
{
  var i, text, val, res;

  text = document.getElementById("text");

  if(text) {
    if(req.readyState != 4) text.innerHTML = '';
    else {
      res = req.responseText;

      if(curl == files) {
				res = res.replace(/<table>/i, '<table width=100%>');
				res = res.replace(/<th><a/i, '<th align=left><a');
				res = res.replace(/<th><a/i, '<th align=right><a');
				res = res.replace(/<th><a/i, '<th align=right><a');

				if(spanish) {
        	res = res.replace(/Name/i, 'Nombre');
        	res = res.replace(/Last modified/i, 'Modificado'); 
        	res = res.replace(/Size/i, 'Tam.');
        	res = res.replace(/Description/i, 'Descripci&oacute;n');
        	res = res.replace(/Parent Directory/i, 'Directorio padre');
				}
      }

      text.innerHTML = res; 

      if(curl != files) {
        //text.style.fontSize = '80%';

      } else {
        //text.style.fontSize = '80%';

        for(i = 0; i < document.links.length; i++) {
          val = document.links[i].href;

          if(val != base) {
            val = val.substring(base.length, val.length);
            document.links[i].href = base + files + val;
          }
        }
      }
    }
  }
}

function loadHTML(url)
{
  curl = url;

  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
    req.onreadystatechange = processReqChange;
    req.open("GET", url, true);
    req.send(null);

  } else if (window.ActiveXObject) {
    req = new ActiveXObject("Microsoft.XMLHTTP");

    if (req) {
      req.onreadystatechange = processReqChange;
      req.open("GET", url, true);
      req.send();
    }
  }
}

function emph(obj)
{
  if(obj != null) {
    obj.style.backgroundColor = '#c3d9ff';
    obj.style.color = '#000';
  }
}

function demph(obj)
{
  if(obj != null) {
    if(cur != obj) {
      obj.style.backgroundColor = '#f4f4f4';
      obj.style.color = '#555';
    }
  }
}

function emph2(obj)
{
  if(obj != null) {
		//obj.style.backgroundColor = '#c3d9ff';
    obj.style.borderColor = '#c3d9ff';
    obj.style.color = '#000';
  }
}

function demph2(obj)
{
  if(obj != null) {
    if(cur2 != obj) {
			//obj.style.backgroundColor = '#ffffff';	
      obj.style.borderColor = '#ffffff';
      obj.style.color = '#555';
    }
  }
}

function update()
{
  var obj;

  if(spanish || !(info[curId].deng)) {
    if(info[curId].url) loadHTML(info[curId].url);
    else loadHTML(curId + ".html");

  } else {
    if(info[curId].url2) loadHTML(info[curId].url2);
    else loadHTML(curId + "-en.html");
  }

  obj = document.getElementById("subtitle");
  if(obj) obj.innerHTML = info[curId].text;
}

function select(obj)
{
  if(obj != null) {
    if(info[obj.id].table) {
      obj = document.getElementById(obj.id + "Table");
      if(obj.style.display != "none") obj.style.display = "none";
      else obj.style.display = "block";

    } else {
      ant = cur;
      cur = obj;
      demph(ant);
      ant = cur2;
      cur2 = null;
      demph2(ant);

      curId = obj.id;

      update();
    }
  }
}

function select2(obj)
{
  ant = cur2;
  cur2 = obj;
  demph2(ant);
  ant = cur;
  cur = null;
  demph(ant);

  curId = obj.id;

  update();
}