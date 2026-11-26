/* Módulos de comunidad. Se utilizan las funciones de app.js al renderizar. */
function countItems(n){$('item-count').textContent=n+' elementos';}
function searchList(root,placeholder,items,match,draw){
  const input=el('input','search-input');input.type='search';input.placeholder=placeholder;input.setAttribute('aria-label',placeholder);
  const area=el('div');const update=()=>{area.replaceChildren();const q=input.value.toLocaleLowerCase('es').trim();const filtered=items.filter(x=>match(x).toLocaleLowerCase('es').includes(q));draw(area,filtered);};
  input.addEventListener('input',update);root.append(input,area);update();
}
function renderArchive(root){
  searchList(root,'Buscar en el archivo…',data.archive,x=>[x.title,x.description,x.category].join(' '),(area,items)=>renderList(area,items,'No hay coincidencias en el archivo.'));
  const panel=el('section','community-panel');panel.append(el('h4','','Help us complete the archive! ♡'),el('p','','¿Falta alguna canción, cover o presentación? También puedes reportar errores y enlaces rotos.'));
  panel.append(makeCommunityForm('archive'));root.append(panel);
}
function renderDiscography(root){
  searchList(root,'Buscar álbum, versión o canción…',data.discography,x=>[x.title,x.kind,x.description].join(' '),(area,items)=>renderList(area,items.map(x=>({...x,description:[x.kind,x.description].filter(Boolean).join(' · ')})),'No hay coincidencias.'));
  root.append(el('p','small-note','Catálogo fan-made en construcción. Fechas, versiones y enlaces se agregarán tras verificar las fuentes.'));
}
function renderStats(root){
  const valid=data.stats.filter(x=>Number.isFinite(x.value)&&x.value>=0&&Number.isFinite(Date.parse(x.date))&&x.metric&&x.series);
  const metrics=[...new Set(valid.map(x=>x.metric))];
  if(!metrics.length){root.append(el('p','empty','Aún no hay mediciones publicadas. Próximamente: seguimiento de votaciones y streaming, con fuentes.'));countItems(0);return;}
  const metric=el('select','search-input');metric.setAttribute('aria-label','Métrica');metrics.forEach(m=>{const o=el('option','',m);o.value=m;metric.append(o);});
  const area=el('div');root.append(metric,area);
  const draw=()=>{area.replaceChildren();const rows=valid.filter(x=>x.metric===metric.value).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));const latest=new Map();rows.forEach(x=>{if(!latest.has(x.series))latest.set(x.series,x);});
    const max=Math.max(1,...[...latest.values()].map(x=>x.value));const cards=el('div','stats-grid');latest.forEach(x=>{const card=el('article','stat-card');card.append(el('p','',x.series),el('strong','',x.value.toLocaleString('es-MX')),el('time','',new Date(x.date).toLocaleString('es-MX',{timeZone:'America/Monterrey'})));const track=el('div','stat-track'),bar=el('div','stat-bar');bar.style.width=(100*x.value/max)+'%';track.append(bar);card.append(track);const a=link('Fuente ↗',x.source);if(a)card.append(a);cards.append(card);});area.append(cards,el('h4','subheading','Historial de registros'));
    const wrap=el('div','table-wrap'),table=el('table','history-table'),head=el('thead'),tr=el('tr');['Fecha (Monterrey)','Serie','Total','Fuente'].forEach(x=>tr.append(el('th','',x)));head.append(tr);table.append(head);const body=el('tbody');rows.forEach(x=>{const r=el('tr');[new Date(x.date).toLocaleString('es-MX',{timeZone:'America/Monterrey'}),x.series,x.value.toLocaleString('es-MX')].forEach(v=>r.append(el('td','',v)));const td=el('td'),a=link('Ver ↗',x.source);td.append(a||el('span','','—'));r.append(td);body.append(r);});table.append(body);wrap.append(table);area.append(wrap,el('p','small-note','Registros manuales, no son cifras en tiempo real. Se muestra la última medición disponible por serie; las fechas pueden diferir.'));countItems(rows.length);};metric.addEventListener('change',draw);draw();
}
function renderGallery(root){
  searchList(root,'Buscar diseños o categorías…',data.gallery,x=>[x.title,x.category,x.description].join(' '),(area,items)=>{const grid=el('div','playlist-grid');items.forEach(x=>{const card=el('article','playlist-card');const img=el('img','cover');img.src=x.image;img.alt=x.title;img.loading='lazy';card.append(img,el('p','gallery-category',x.category),el('h4','',x.title),el('p','',x.description));if(x.downloadable){const a=el('a','action primary','↓ Descargar');a.href=x.image;a.download='';card.append(a);}grid.append(card);});area.append(grid);if(!items.length)area.append(el('p','empty','No hay diseños que coincidan.'));countItems(items.length);});
}
function renderDictionary(root){searchList(root,'Buscar una palabra o referencia…',data.dictionary,x=>[x.term,x.meaning].join(' '),(area,items)=>renderList(area,items.map(x=>({title:x.term,description:x.meaning,url:x.source})),'El diccionario se irá llenando de referencias y recuerdos.'));}
function renderGuestbook(root){
  renderList(root,data.guestbook.map(x=>({title:x.alias||'DUAL',description:x.message,date:x.date})), 'Todavía no hay mensajes publicados.');
  const panel=el('section','community-panel');panel.append(el('h4','','Leave a message ♡'),el('p','','Tu mensaje llegará de forma privada. Solo publicaremos mensajes aprobados y autorizados por su autor.'));panel.append(makeCommunityForm('guestbook'));root.append(panel);
}
function makeCommunityForm(kind, preset={}){
  const form=el('form','community-form');const isArchive=kind==='archive';
  function field(label,name,opts={}){const wrapper=el('label','form-field');wrapper.append(el('span','',label));let input;
    if(opts.options){input=el('select');opts.options.forEach(x=>{const opt=el('option','',x);opt.value=x;input.append(opt);});}
    else if(opts.multiline){input=el('textarea');input.rows=4;}else{input=el('input');input.type=opts.type||'text';}
    input.name=name;input.required=!!opts.required;if(opts.max)input.maxLength=opts.max;if(opts.placeholder)input.placeholder=opts.placeholder;wrapper.append(input);form.append(wrapper);return input;}
  const hidden=el('input');hidden.type='hidden';hidden.name='type';hidden.value=kind;form.append(hidden);
  field('Alias DUAL (opcional)','alias',{max:60,placeholder:'Tu alias, sin datos personales'});
  if(isArchive){const category=field('Tipo de aportación','category',{options:['Canción','Cover','Presentación','Dance cover','Sesión','Entrevista','Corrección o enlace roto','Pista de Lost Media','Otro']});category.value=preset.category||'Canción';const title=field('Título o contenido','title',{required:true,max:180,placeholder:'Nombre de la canción o presentación'});title.value=preset.title||'';const url=field('Enlace a la fuente (opcional)','url',{type:'url',max:1000,placeholder:'https://...'});url.pattern='https?://.+';field('Contexto adicional (opcional)','details',{multiline:true,max:1500,placeholder:'Fecha, evento, plataforma, corrección…'});}
  else{field('Tu mensaje','message',{required:true,multiline:true,max:600,placeholder:'Deja un poquito de amor para el fandom.'});const label=el('label','consent');const check=el('input');check.type='checkbox';check.name='allow_publication';check.value='yes';check.required=true;label.append(check,el('span','','Autorizo que mi alias y mensaje se publiquen después de la revisión.'));form.append(label);}
  if(isArchive){const label=el('label','consent');const check=el('input');check.type='checkbox';check.name='allow_credit';check.value='yes';label.append(check,el('span','','Si mi aportación se incorpora, autorizo que mi alias aparezca en Credits.txt. (Opcional)'));form.append(label);}
  const trap=el('input');trap.type='text';trap.name='_gotcha';trap.tabIndex=-1;trap.autocomplete='off';trap.hidden=true;form.append(trap);
  const hint=el('p','small-note','No incluyas correos, teléfonos ni otros datos personales. El formulario utiliza Formspree cuando está habilitado.');form.append(hint);
  const send=el('button','action primary',isArchive?'♡ Enviar aportación':'♡ Firmar guestbook');send.type='submit';const status=el('p','form-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.append(send,status);
  const endpoint=data.forms?.[kind]||'';const enabled=/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+\/?$/.test(endpoint);if(!enabled){send.disabled=true;status.textContent='Buzón todavía no habilitado. Próximamente podrás enviar mensajes.';}
  form.addEventListener('submit',async e=>{e.preventDefault();if(!enabled||send.disabled)return;if(!form.reportValidity())return;send.disabled=true;status.textContent='Enviando…';try{const res=await fetch(endpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});const result=await res.json().catch(()=>null);if(!res.ok||result?.ok===false)throw new Error('Submission failed');if(result?.ok!==true)throw new Error('Unconfirmed submission');form.reset();if(isArchive&&preset.title){form.elements.title.value=preset.title;form.elements.category.value=preset.category||'Canción';}status.textContent='¡Gracias, DUAL! ♡ Tu mensaje fue recibido para revisión.';}catch{status.textContent='No pudimos confirmar el envío. Conservamos tu mensaje aquí; intenta nuevamente.';}finally{send.disabled=false;}});
  return form;
}
