(function(){
  var routes={inicio:'sitio',modelo:'sitio','adulto-mayor':'sitio','salud-mental':'sitio',ambiental:'sitio',familia:'sitio',jac:'sitio',alianzas:'sitio',portal:'portal',estudiante:'portal',docente:'portal',leccion:'portal'};
  var titles={inicio:'Emprender 2025',modelo:'Programa Jóvenes y Adultos · Emprender 2025','adulto-mayor':'Diplomado Atención Integral del Adulto Mayor · Emprender 2025','salud-mental':'Formación Básica en Salud Mental · Emprender 2025',ambiental:'Formación Ambiental Diferenciada · Emprender 2025',familia:'Familias con Vínculos Fuertes · Emprender 2025',jac:'Liderazgo Comunal para JAC · Emprender 2025',alianzas:'Trabajemos juntos · Emprender 2025',portal:'Portal educativo · Emprender 2025',estudiante:'Mi panel · Portal educativo',docente:'Panel docente · Portal educativo',leccion:'Lección · Portal educativo'};
  var pendingScroll=null;
  function show(){
    var h=(location.hash||'#inicio').slice(1);
    if(!routes[h]) h='inicio';
    document.getElementById('sitio').hidden = routes[h]!=='sitio';
    document.getElementById('portal').hidden = routes[h]!=='portal';
    Object.keys(routes).forEach(function(r){ var el=document.getElementById('p-'+r); if(el) el.hidden = r!==h; });
    document.title=titles[h]||'Emprender 2025';
    var nav=document.getElementById('nav'); if(nav){nav.classList.remove('open'); var mb=document.getElementById('menubtn'); if(mb) mb.setAttribute('aria-expanded','false');}
    if(pendingScroll){ var t=document.getElementById(pendingScroll); pendingScroll=null; if(t){ t.scrollIntoView({block:'start'}); return; } }
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange',show);
  document.addEventListener('click',function(e){ if(e.target.closest('a,button')) return; var row=e.target.closest('.row'); if(!row) return; var v=row.querySelector('a.ver'); if(v) location.hash=v.getAttribute('href').slice(1); });
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[data-scroll]'); if(!a) return;
    var target=a.getAttribute('data-scroll'); var dest=(a.getAttribute('href')||'#inicio').slice(1);
    if(a.getAttribute('data-tipo')){ var s=document.getElementById('sol-tipo'); if(s) s.value=a.getAttribute('data-tipo'); }
    e.preventDefault();
    var current=(location.hash||'#inicio').slice(1);
    if(current===dest){ var t=document.getElementById(target); if(t) t.scrollIntoView({block:'start'}); }
    else { pendingScroll=target; location.hash=dest; }
  });
  var mb=document.getElementById('menubtn');
  if(mb) mb.addEventListener('click',function(){ var nav=document.getElementById('nav'); var open=nav.classList.toggle('open'); mb.setAttribute('aria-expanded',open?'true':'false'); });
  // copiar correo
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click',function(){
      var txt=b.getAttribute('data-copy'); var done=function(){ b.textContent='Copiado'; setTimeout(function(){b.textContent='Copiar';},1800); };
      try{ navigator.clipboard.writeText(txt).then(done,function(){ fallback(); }); }catch(err){ fallback(); }
      function fallback(){ var span=b.parentElement; var range=document.createRange(); range.selectNodeContents(span); var sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(range); b.textContent='Selecciona y copia'; }
    });
  });
  // formulario de solicitud
  var fs=document.getElementById('f-sol');
  if(fs) fs.addEventListener('submit',function(e){
    e.preventDefault();
    var err=document.getElementById('sol-err'), ok=document.getElementById('sol-done');
    var faltan=[]; if(!document.getElementById('sol-ent').value.trim()) faltan.push('la entidad'); if(!document.getElementById('sol-nom').value.trim()) faltan.push('su nombre y cargo'); if(!document.getElementById('sol-mail').value.trim()) faltan.push('el correo'); if(!document.getElementById('sol-mun').value.trim()) faltan.push('el municipio'); if(!document.getElementById('sol-ok').checked) faltan.push('la autorización de datos');
    if(faltan.length){ err.textContent='Para enviar la solicitud falta: '+faltan.join(', ')+'.'; err.hidden=false; ok.hidden=true; return; }
    err.hidden=true; ok.hidden=false; ok.scrollIntoView({block:'nearest'});
  });
  // ingreso por rol
  var rol='estudiante';
  ['rol-est','rol-doc'].forEach(function(id){ var b=document.getElementById(id); if(!b) return; b.addEventListener('click',function(){ rol=b.getAttribute('data-rol'); document.getElementById('rol-est').classList.toggle('on',rol==='estudiante'); document.getElementById('rol-doc').classList.toggle('on',rol==='docente'); }); });
  var fl=document.getElementById('f-login');
  if(fl) fl.addEventListener('submit',function(e){ e.preventDefault(); location.hash = rol==='docente' ? 'docente' : 'estudiante'; });
  // docente: informe
  var bi=document.getElementById('btn-informe'); if(bi) bi.addEventListener('click',function(){ document.getElementById('informe-ok').hidden=false; });
  // lección
  var fa=document.getElementById('f-act'); if(fa) fa.addEventListener('submit',function(e){ e.preventDefault(); document.getElementById('act-ok').hidden=false; });
  var bv=document.getElementById('vista'); if(bv) bv.addEventListener('click',function(){ document.getElementById('toast').hidden=false; bv.textContent='Vista ✓'; });
  var frases=['Cada minuto que estudias hoy es un paso que nadie te puede quitar.','No tienes que hacerlo perfecto. Solo tienes que seguir.','Tu tiempo, tu ritmo, tu futuro. Vas bien.','Lo que aprendes aquí se queda contigo para siempre.','Pausa cuando lo necesites. Lo importante es volver.','Hoy estás más cerca de tu meta que ayer.'];
  var play=document.getElementById('play'); var playing=false, sec=0, timer=null;
  if(play) play.addEventListener('click',function(){
    playing=!playing;
    if(playing){ timer=setInterval(function(){ sec++; var m=Math.floor(sec/60), s=sec%60; document.getElementById('ptime').textContent=m+':'+(s<10?'0':'')+s+' / 12:04'; if(sec%20===0){ document.getElementById('frase').textContent=frases[Math.floor(sec/20)%frases.length]; } },1000); play.style.opacity='.35'; }
    else { clearInterval(timer); play.style.opacity='1'; }
  });
  show();
})();
