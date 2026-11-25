(function () {
  'use strict';
  var D = window.CAPO;
  var WA = '543813521860';

  /* ---------- Íconos ---------- */
  var ICON = {
    wa: '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9"/><path d="M9 10a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
    pin: '<path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"/>',
    buscar: '<path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0"/><path d="M21 21l-6-6"/>',
    imprimir: '<path d="M17 17h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2"/><path d="M17 9v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v4"/><path d="M7 15a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2z"/>',
    tilde: '<path d="M5 12l5 5l10-10"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6l-12 12M6 6l12 12"/>',
    compartir: '<path d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/><path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/><path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/><path d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4"/>',
    bajar: '<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M7 11l5 5l5-5"/><path d="M12 4v12"/>',
    ubic: '<path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/><path d="M4 12a8 8 0 1 0 16 0a8 8 0 1 0-16 0"/><path d="M12 2v2M12 20v2M20 12h2M2 12h2"/>',
    lista: '<path d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01"/>',
    ig: '<path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/><path d="M16.5 7.5v.01"/>',
    fb: '<path d="M7 10v4h3v7h4v-7h3l1-4h-4v-2a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2h-3"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    flecha: '<path d="M5 12h14M13 18l6-6M13 6l6 6"/>',
    reloj: '<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/><path d="M12 7v5l3 3"/>',
    mapa: '<path d="M3 7l6-3l6 3l6-3v13l-6 3l-6-3l-6 3v-13"/><path d="M9 4v13M15 7v13"/>'
  };
  function ic(n) { return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true">' + ICON[n] + '</svg>'; }
  document.querySelectorAll('[data-ic]').forEach(function (el) { el.insertAdjacentHTML('afterbegin', ic(el.getAttribute('data-ic'))); });

  var STAR = '<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,2 59,22 80,10 76,33 98,36 82,52 96,70 73,72 74,95 55,83 42,100 35,78 13,88 18,65 0,54 18,42 6,22 29,24 32,2 44,20"/></svg>';

  /* ---------- Utilidades ---------- */
  var fmt = new Intl.NumberFormat('es-AR');
  function plata(n) { return '$' + fmt.format(n); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var byId = {}; D.ofertas.forEach(function (o, i) { o.i = i; byId[o.id] = o; });
  function guardar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function leer(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  var avisoEl;
  function avisar(t) {
    if (!avisoEl) { avisoEl = document.createElement('div'); avisoEl.className = 'aviso'; avisoEl.setAttribute('role', 'status'); document.body.appendChild(avisoEl); }
    avisoEl.textContent = t; avisoEl.classList.add('ver');
    clearTimeout(avisar.t); avisar.t = setTimeout(function () { avisoEl.classList.remove('ver'); }, 2200);
  }
  function waLink(texto, num) { return 'https://api.whatsapp.com/send?' + (num ? 'phone=' + num + '&' : '') + 'text=' + encodeURIComponent(texto); }

  /* ---------- Menú ---------- */
  var menuBtn = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (menuBtn) menuBtn.addEventListener('click', function () {
    var a = nav.classList.toggle('abierto'); menuBtn.setAttribute('aria-expanded', a);
  });

  /* ---------- Vigencia ---------- */
  var hasta = new Date(D.vigencia.hasta);
  function textoReloj() {
    var ms = hasta - new Date();
    if (ms <= 0) return null;
    var h = Math.floor(ms / 3600000), d = Math.floor(h / 24); h = h % 24;
    if (d >= 1) return 'Quedan ' + d + (d === 1 ? ' día' : ' días') + (h ? ' y ' + h + ' h' : '');
    var m = Math.floor(ms / 60000) % 60;
    return 'Últimas ' + h + ' h ' + m + ' min';
  }
  function pintarReloj() {
    var t = textoReloj();
    document.querySelectorAll('.reloj').forEach(function (r) {
      var s = r.querySelector('span');
      if (t) { s.textContent = t; r.classList.remove('vencida'); }
      else { s.textContent = 'Esta revista ya venció: llega la nueva'; r.classList.add('vencida'); }
    });
  }
  pintarReloj(); setInterval(pintarReloj, 60000);

  /* ---------- Lista ---------- */
  var lista = leer('capo-lista', {});
  function cantidad() { var n = 0; for (var k in lista) n += lista[k]; return n; }
  function pintarContador(salto) {
    document.querySelectorAll('.nota-lista').forEach(function (b) {
      b.querySelector('.contador').textContent = cantidad();
      if (salto) { b.classList.remove('salto'); void b.offsetWidth; b.classList.add('salto'); }
    });
  }
  function marcarCarteles() {
    document.querySelectorAll('.cartel[data-id]').forEach(function (c) {
      var en = !!lista[c.dataset.id];
      c.classList.toggle('anotado', en);
      var b = c.querySelector('.anotar');
      if (b) { b.setAttribute('aria-pressed', en); b.querySelector('.txt').textContent = en ? 'Anotado' : 'Anotar'; }
    });
  }
  function cambiar(id, delta) {
    var n = (lista[id] || 0) + delta;
    if (n <= 0) delete lista[id]; else lista[id] = n;
    guardar('capo-lista', lista); pintarContador(delta > 0); marcarCarteles(); pintarCuaderno();
  }

  /* ---------- Carteles ---------- */
  function rot(i) { var v = [-2.2, 1.4, -0.8, 2.4, -1.6, 0.9, -2.5, 1.9, -1.1]; return v[i % v.length]; }
  function cinta(i) { var l = [50, 30, 66, 44, 58, 36][i % 6], a = [-4, 5, -7, 3, -2, 6][i % 6]; return '--cl:' + l + '%;--ca:' + a + 'deg'; }
  function cartel(o, extra) {
    var num = fmt.format(o.precio);
    var siria = o.suc === 'siria';
    var compartirTxt = 'Mirá esta oferta de Capo: ' + o.nombre + ' ' + o.pres + ' a ' + plata(o.precio) + (siria ? ' (solo en Av. Siria)' : '') + '. Válido hasta el jueves 27/11.';
    return '<article class="cartel' + (extra && extra.cls ? ' ' + extra.cls : '') + '" data-id="' + o.id + '" style="--r:' + rot(o.i) + 'deg;' + cinta(o.i) + '">' +
      '<span class="cinta" aria-hidden="true"></span>' + ((o.i % 4 === 1) ? '<span class="cinta cinta-2" aria-hidden="true"></span>' : '') +
      (siria ? '<span class="estrella">' + STAR + '<span>Solo Av. Siria</span></span>' : '') +
      '<span class="tachon" aria-hidden="true">en la lista</span>' +
      '<div class="cartel-foto"><img src="img/prod/' + o.id + '.webp" alt="" width="720" height="720" loading="' + (extra && extra.eager ? 'eager' : 'lazy') + '"></div>' +
      '<h3 class="cartel-nombre">' + esc(o.nombre) + '</h3>' +
      '<p class="cartel-pres">' + esc(o.pres) + '</p>' +
      '<p class="precio" data-len="' + num.length + '" aria-label="' + plata(o.precio) + '"><span class="peso">$</span><span class="num">' + num + '</span></p>' +
      '<div class="cartel-acciones">' +
      '<button type="button" class="anotar" aria-pressed="false">' + ic('mas').replace('class="i"', 'class="i mas"') + ic('tilde').replace('class="i"', 'class="i tilde"') + '<span class="txt">Anotar</span></button>' +
      '<a class="compartir" href="' + waLink(compartirTxt) + '" target="_blank" rel="noopener" aria-label="Compartir ' + esc(o.nombre) + ' por WhatsApp">' + ic('wa') + '</a>' +
      '</div></article>';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.anotar');
    if (b) {
      var id = b.closest('.cartel').dataset.id;
      if (lista[id]) { cambiar(id, -lista[id]); avisar('Lo sacaste de tu lista'); }
      else { cambiar(id, 1); avisar('Anotado: ' + byId[id].nombre); }
    }
  });
  document.querySelectorAll('[data-carteles]').forEach(function (cont) {
    var ids = cont.getAttribute('data-carteles').split(',');
    var lider = cont.classList.contains('muro-portada');
    cont.innerHTML = ids.map(function (id, k) { return cartel(byId[id], { eager: cont.hasAttribute('data-eager'), cls: lider && k === 0 ? 'lider' : '' }); }).join('');
  });

  /* ---------- Catálogo ---------- */
  var cat = document.getElementById('catalogo');
  if (cat) {
    var q = document.getElementById('q'), chips = document.getElementById('chips'), siriaChk = document.getElementById('con-siria'), res = document.getElementById('resultado');
    var cats = [];
    D.ofertas.forEach(function (o) { if (cats.indexOf(o.cat) < 0) cats.push(o.cat); });
    var actual = 'Todas';
    function cuenta(c) { return D.ofertas.filter(function (o) { return (c === 'Todas' || o.cat === c) && (siriaChk.checked || o.suc !== 'siria'); }).length; }
    function pintarChips() {
      chips.innerHTML = ['Todas'].concat(cats).map(function (c) {
        return '<button type="button" class="chip" aria-pressed="' + (c === actual) + '" data-cat="' + esc(c) + '">' + esc(c) + '<span class="cuenta">' + cuenta(c) + '</span></button>';
      }).join('');
    }
    function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    function filtrar() {
      var t = norm(q.value.trim());
      var lista2 = D.ofertas.filter(function (o) {
        return (actual === 'Todas' || o.cat === actual) && (siriaChk.checked || o.suc !== 'siria') && (!t || norm(o.nombre + ' ' + o.cat).indexOf(t) >= 0);
      });
      res.textContent = lista2.length === 1 ? '1 oferta' : lista2.length + ' ofertas';
      var vistos = {};
      cat.innerHTML = lista2.length ? lista2.map(function (o) { var d = !vistos[o.cat] && lista2.length > 6; vistos[o.cat] = 1; return cartel(o, { cls: d ? 'destacado' : '' }); }).join('') :
        '<div class="vacio" style="grid-column:1/-1"><p>No encontramos “' + esc(q.value) + '” en las ofertas de esta semana.</p><button type="button" class="btn" id="limpiar">Ver todas las ofertas</button></div>';
      marcarCarteles();
      var l = document.getElementById('limpiar');
      if (l) l.addEventListener('click', function () { q.value = ''; actual = 'Todas'; pintarChips(); filtrar(); q.focus(); });
    }
    chips.addEventListener('click', function (e) {
      var c = e.target.closest('.chip'); if (!c) return;
      actual = c.dataset.cat; pintarChips(); filtrar();
    });
    q.addEventListener('input', filtrar);
    siriaChk.addEventListener('change', function () { pintarChips(); filtrar(); });
    var hash = decodeURIComponent(location.hash.slice(1));
    if (cats.indexOf(hash) >= 0) actual = hash;
    pintarChips(); filtrar();
  }

  /* ---------- Cuaderno (Mi lista) ---------- */
  var capa = document.createElement('div'); capa.className = 'cuaderno-capa';
  var cuad = document.createElement('aside');
  cuad.className = 'cuaderno'; cuad.setAttribute('aria-labelledby', 'cuad-t'); cuad.setAttribute('aria-hidden', 'true'); cuad.setAttribute('inert', '');
  cuad.innerHTML =
    '<div class="cuaderno-cab"><h2 id="cuad-t">Mi lista</h2><button type="button" class="cerrar" aria-label="Cerrar la lista">' + ic('x') + '</button></div>' +
    '<div class="cuaderno-cuerpo"><ul class="renglones"></ul>' +
    '<div class="encargo"><label for="enc-suc">Encargá y retirá <span class="tag">Propuesta</span></label>' +
    '<select id="enc-suc">' + D.sucursales.map(function (s) { return '<option value="' + s.id + '">' + esc(s.nombre + ' · ' + s.dir) + '</option>'; }).join('') + '</select>' +
    '<a class="btn btn-chico" id="enc-wa" target="_blank" rel="noopener">' + ic('wa') + 'Pedir para retirar en esa sucursal</a></div>' +
    '<button type="button" class="vaciar" id="vaciar">Vaciar la lista</button>' +
    '</div>' +
    '<div class="cuaderno-pie">' +
    '<div class="total"><span>Total estimado</span><span class="monto">$0</span></div>' +
    '<p class="total-nota">Con los precios de la revista. El ticket final puede variar.</p>' +
    '<div class="pie-acciones">' +
    '<a class="btn btn-wa" id="lista-wa" target="_blank" rel="noopener">' + ic('wa') + 'Mandar la lista por WhatsApp</a>' +
    '<button type="button" class="btn btn-borde btn-chico" id="lista-imp">' + ic('imprimir') + 'Imprimir</button>' +
    '<a class="btn btn-borde btn-chico" href="ofertas.html">' + ic('mas') + 'Sumar más</a>' +
    '</div>' +
    
    '</div>';
  document.body.appendChild(capa); document.body.appendChild(cuad);
  var ultimoFoco = null;
  function abrir() {
    ultimoFoco = document.activeElement;
    pintarCuaderno(); cuad.classList.add('abierto'); capa.classList.add('abierto');
    cuad.removeAttribute('aria-hidden'); cuad.removeAttribute('inert');
    setTimeout(function () { cuad.querySelector('.cerrar').focus(); }, 60);
  }
  function cerrar() {
    cuad.classList.remove('abierto'); capa.classList.remove('abierto');
    cuad.setAttribute('aria-hidden', 'true'); cuad.setAttribute('inert', '');
    if (ultimoFoco) ultimoFoco.focus();
  }
  document.querySelectorAll('.nota-lista, [data-abrir-lista]').forEach(function (b) { b.addEventListener('click', abrir); });
  cuad.querySelector('.cerrar').addEventListener('click', cerrar);
  capa.addEventListener('click', cerrar);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && cuad.classList.contains('abierto')) cerrar(); });
  function textoLista(titulo) {
    var t = titulo + '\n';
    var tot = 0;
    Object.keys(lista).forEach(function (id) { var o = byId[id], n = lista[id]; tot += o.precio * n; t += '• ' + n + ' × ' + o.nombre + ' ' + o.pres + ' (' + plata(o.precio) + ')\n'; });
    return t + 'Total estimado: ' + plata(tot);
  }
  function pintarCuaderno() {
    var ul = cuad.querySelector('.renglones'), ids = Object.keys(lista), tot = 0;
    if (!ids.length) {
      ul.innerHTML = '<li class="lista-vacia"><p>Tu lista está vacía. Tocá “Anotar” en las ofertas que quieras llevar.</p><a class="btn btn-chico" href="ofertas.html">Ver las ofertas</a></li>';
    } else {
      ul.innerHTML = ids.map(function (id) {
        var o = byId[id], n = lista[id]; tot += o.precio * n;
        return '<li class="renglon"><div><div class="nom">' + esc(o.nombre) + '</div><div class="det">' + esc(o.pres) + ' · ' + plata(o.precio) + (o.suc === 'siria' ? ' · solo Av. Siria' : '') + '</div>' +
          '<div class="cant" role="group" aria-label="Cantidad de ' + esc(o.nombre) + '"><button type="button" data-menos="' + id + '" aria-label="Uno menos">−</button><output>' + n + '</output><button type="button" data-mas="' + id + '" aria-label="Uno más">+</button></div></div>' +
          '<div class="sub">' + plata(o.precio * n) + '</div></li>';
      }).join('');
    }
    cuad.querySelector('.monto').textContent = plata(tot);
    var vacio = !ids.length;
    var w = cuad.querySelector('#lista-wa'), e = cuad.querySelector('#enc-wa');
    w.href = vacio ? '#' : waLink(textoLista('Mi lista de Capo:'));
    var s = D.sucursales.filter(function (x) { return x.id === cuad.querySelector('#enc-suc').value; })[0];
    e.href = vacio ? '#' : waLink(textoLista('Hola Capo, quiero encargar para retirar en ' + s.nombre + ' (' + s.dir + '):'), WA);
    [w, e].forEach(function (a) { a.toggleAttribute('aria-disabled', vacio); a.style.opacity = vacio ? 0.45 : ''; a.style.pointerEvents = vacio ? 'none' : ''; });
    cuad.querySelector('#lista-imp').disabled = vacio;
    cuad.querySelector('#vaciar').hidden = vacio;
  }
  cuad.addEventListener('click', function (e) {
    var m = e.target.closest('[data-mas]'), n = e.target.closest('[data-menos]');
    if (m) cambiar(m.dataset.mas, 1);
    if (n) cambiar(n.dataset.menos, -1);
  });
  cuad.querySelector('#enc-suc').addEventListener('change', pintarCuaderno);
  cuad.querySelector('#lista-imp').addEventListener('click', function () { window.print(); });
  cuad.querySelector('#vaciar').addEventListener('click', function () { lista = {}; guardar('capo-lista', lista); pintarContador(); marcarCarteles(); pintarCuaderno(); });
  var miniLista = document.getElementById('mini-lista');
  function pintarMini() {
    if (!miniLista) return;
    var ids = Object.keys(lista);
    miniLista.innerHTML = ids.length ? ids.slice(0, 4).map(function (id) { return '<li><span>' + lista[id] + ' × ' + esc(byId[id].nombre) + '</span><span class="marcador">' + plata(byId[id].precio * lista[id]) + '</span></li>'; }).join('') + (ids.length > 4 ? '<li class="mas-items">y ' + (ids.length - 4) + ' más…</li>' : '') : '<li class="vacia"><span class="marcador">Todavía no anotaste nada. Probá con las ofertas de arriba.</span></li>';
  }
  var _pc = pintarCuaderno; pintarCuaderno = function () { _pc(); pintarMini(); };
  pintarContador(); marcarCarteles(); pintarMini();

  /* ---------- Sucursales: abierta / cerrada ---------- */
  function horaTucuman() {
    var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Argentina/Tucuman', hour: 'numeric', minute: 'numeric', weekday: 'short', hour12: false }).formatToParts(new Date());
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    return { dia: o.weekday, h: (+o.hour % 24) + (+o.minute) / 60 };
  }
  function estado(s) {
    var t = horaTucuman(), domingo = t.dia === 'Sun';
    var abreHoy = !(domingo && s.dias === 'lunsab');
    var abierta = abreHoy && t.h >= s.abre && t.h < s.cierra;
    var hh = function (x) { return (x < 10 ? '0' : '') + x + ':00'; };
    var txt;
    if (abierta) txt = 'Abierta · cierra ' + hh(s.cierra) + ' (a confirmar)';
    else if (abreHoy && t.h < s.abre) txt = 'Cerrada · abre hoy ' + hh(s.abre) + ' (a confirmar)';
    else {
      var manianaDomingo = t.dia === 'Sat';
      txt = 'Cerrada · abre ' + (manianaDomingo && s.dias === 'lunsab' ? 'el lunes ' : 'mañana ') + hh(s.abre) + ' (a confirmar)';
    }
    return { abierta: abierta, txt: txt };
  }
  function km(a, b) {
    var R = 6371, r = Math.PI / 180, dLa = (b.lat - a.lat) * r, dLo = (b.lng - a.lng) * r;
    var x = Math.sin(dLa / 2) * Math.sin(dLa / 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  var yo = null;
  function ordenadas() {
    var l = D.sucursales.slice();
    if (yo) { l.forEach(function (s) { s.km = km(yo, s); }); l.sort(function (a, b) { return a.km - b.km; }); }
    return l;
  }
  function dirLink(s) { return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(s.dir + ', ' + s.zona + ', Tucumán'); }
  function kmTxt(s) { return s.km == null ? '' : (s.km < 1 ? 'a menos de 1 km' : 'a ' + fmt.format(Math.round(s.km * 10) / 10) + ' km'); }

  var far = document.getElementById('faroles'), mini = document.getElementById('faroles-mini');
  function pintarFaroles() {
    if (mini) {
      var l = ordenadas().map(function (s) { return { s: s, e: estado(s) }; });
      l.sort(function (a, b) { return (b.e.abierta - a.e.abierta); });
      var hay = l.some(function (x) { return x.e.abierta; });
      mini.previousElementSibling.firstChild.nodeValue = (yo ? 'Las más cerca de vos' : (hay ? 'Abiertas ahora' : 'Ahora están cerradas')) + ' ';
      mini.innerHTML = l.slice(0, 3).map(function (x) {
        return '<li><a class="farol-mini' + (x.e.abierta ? ' abierta' : '') + '" href="' + dirLink(x.s) + '" target="_blank" rel="noopener"><span class="luz" aria-hidden="true"></span><span class="txt"><strong>' + esc(x.s.nombre) + '</strong><span class="est">' + x.e.txt + '</span></span><span class="ir">Cómo llegar</span></a></li>';
      }).join('');
    }
    if (!far) return;
    far.innerHTML = ordenadas().map(function (s, k) {
      var e = estado(s);
      return '<li><a class="farol' + (e.abierta ? ' abierta' : '') + (yo && k === 0 ? ' cercana' : '') + '" href="' + dirLink(s) + '" target="_blank" rel="noopener">' +
        '<span class="luz" aria-hidden="true"></span><span class="nom">' + esc(s.nombre) + '</span><span class="est">' + e.txt + '</span>' +
        (s.km != null ? '<span class="dist">' + kmTxt(s) + (k === 0 ? ' · la más cerca' : '') + '</span>' : '') + '</a></li>';
    }).join('');
  }

  var sl = document.getElementById('suc-lista'), mapa = document.getElementById('mapa-iframe'), mapaCap = document.getElementById('mapa-cap');
  var elegida = null;
  function verMapa(s) {
    elegida = s.id;
    mapa.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(s.dir + ', ' + s.zona + ', Tucumán') + '&z=15&output=embed';
    mapa.title = 'Mapa de Capo ' + s.nombre;
    mapaCap.textContent = 'Capo ' + s.nombre + ' · ' + s.dir;
    pintarSucs();
  }
  function pintarSucs() {
    if (!sl) return;
    sl.innerHTML = ordenadas().map(function (s, k) {
      var e = estado(s);
      return '<li class="suc' + (e.abierta ? ' abierta' : '') + (elegida === s.id ? ' elegida' : '') + '">' +
        '<span class="luz" aria-hidden="true"></span>' +
        '<h3>' + esc(s.nombre) + (s.nuevo ? '<span class="nuevo">Nueva</span>' : '') + '</h3>' +
        '<p class="dir">' + esc(s.dir) + ' · ' + esc(s.zona) + (s.km != null ? ' · <strong>' + kmTxt(s) + '</strong>' : '') + '</p>' +
        '<p class="est">' + e.txt + '</p>' +
        '<div class="botones"><a class="btn btn-amarillo btn-chico" href="' + dirLink(s) + '" target="_blank" rel="noopener">' + ic('flecha') + 'Cómo llegar</a>' +
        '<button type="button" class="btn btn-borde btn-chico" data-mapa="' + s.id + '">' + ic('mapa') + 'Ver en el mapa</button></div></li>';
    }).join('');
  }
  if (sl) {
    sl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-mapa]'); if (!b) return;
      verMapa(D.sucursales.filter(function (s) { return s.id === b.dataset.mapa; })[0]);
      if (window.matchMedia('(max-width: 900px)').matches) document.getElementById('mapa').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    verMapa(D.sucursales[0]);
  }
  pintarFaroles(); pintarSucs();
  setInterval(function () { pintarFaroles(); pintarSucs(); }, 60000);

  document.querySelectorAll('[data-ubicar]').forEach(function (b) {
    var msj = document.getElementById(b.getAttribute('data-ubicar'));
    b.addEventListener('click', function () {
      if (!navigator.geolocation) { msj.textContent = 'Tu navegador no comparte ubicación. Elegí la sucursal de la lista.'; return; }
      msj.textContent = 'Buscando tu ubicación…';
      navigator.geolocation.getCurrentPosition(function (p) {
        yo = { lat: p.coords.latitude, lng: p.coords.longitude };
        var c = ordenadas()[0];
        msj.textContent = 'Tu Capo más cerca es ' + c.nombre + ', ' + kmTxt(c) + '.';
        pintarFaroles(); pintarSucs();
        if (sl) verMapa(c);
      }, function () {
        msj.textContent = 'No pudimos ver tu ubicación. Revisá el permiso o elegí la sucursal de la lista.';
      }, { timeout: 10000, maximumAge: 300000 });
    });
  });

  /* ---------- Contacto ---------- */
  var tabs = document.querySelectorAll('.pestana');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { var s = x === t; x.setAttribute('aria-selected', s); x.tabIndex = s ? 0 : -1; document.getElementById(x.getAttribute('aria-controls')).hidden = !s; });
    });
    t.addEventListener('keydown', function (e) {
      var l = Array.prototype.slice.call(tabs), i = l.indexOf(t);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var n = l[(i + (e.key === 'ArrowRight' ? 1 : l.length - 1)) % l.length]; n.focus(); n.click(); }
    });
  });
  document.querySelectorAll('form[data-wa]').forEach(function (f) {
    f.addEventListener('input', function (e) { var c = e.target.closest('.campo'); if (c) { c.classList.remove('mal'); var er = c.querySelector('.error'); if (er) er.textContent = ''; } });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, primero = null;
      f.querySelectorAll('[required]').forEach(function (el) {
        var c = el.closest('.campo'), er = c.querySelector('.error'), v = el.value.trim(), msg = '';
        if (!v) msg = 'Completá este dato.';
        else if (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) msg = 'Revisá el email: falta algo (ej. nombre@mail.com).';
        if (msg) { ok = false; c.classList.add('mal'); er.textContent = msg; if (!primero) primero = el; }
      });
      if (!ok) { primero.focus(); return; }
      var t = f.getAttribute('data-wa') + '\n';
      f.querySelectorAll('input, select, textarea').forEach(function (el) {
        if (el.value.trim()) t += el.closest('.campo').querySelector('label').textContent.replace(' *', '') + ': ' + el.value.trim() + '\n';
      });
      window.open(waLink(t, WA), '_blank', 'noopener');
      avisar('Abrimos WhatsApp con tu mensaje listo para enviar');
    });
  });
})();
