/* BRAVOVERSE expansion — módulos sin dependencias externas. */
function renderPatchNotes(root){
  const list=el('div','patch-list');data.patchnotes.forEach(x=>{const card=el('article','extra-card');card.append(el('p','extra-label','VERSION '+x.version+(x.date?' / '+x.date:'')),el('h4','',x.title));const ul=el('ul');x.changes.forEach(c=>ul.append(el('li','',c)));card.append(ul);list.append(card);});root.append(list);countItems(data.patchnotes.length);
}
function renderLostMedia(root){
  const panel=el('section','community-panel');panel.append(el('h4','','¿Tienes una pista? ♡'),el('p','','Comparte un enlace público o contexto de una presentación, canción o sesión que estemos buscando. No compartas material privado ni filtrado.'));
  const formArea=el('div');const showForm=title=>{formArea.replaceChildren(makeCommunityForm('archive',{title,category:'Pista de Lost Media'}));};showForm('');panel.append(formArea);
  searchList(root,'Buscar contenido perdido…',data.lostMedia,x=>[x.title,x.description,x.status].join(' '),(area,items)=>{if(!items.length)area.append(el('p','empty','Todavía no hay búsquedas publicadas. Puedes aportar una pista en el formulario.'));items.forEach(x=>{const card=el('article','extra-card');card.append(el('p','extra-label',x.status||'Buscando'),el('h4','',x.title),el('p','',x.description));const actions=el('div','actions');const a=link('Ver fuente ↗',x.url);if(a)actions.append(a);if(x.status!=='Encontrado')actions.append(button('Tengo una pista',()=>{showForm(x.title);panel.scrollIntoView({block:'start'});formArea.querySelector('input[name=alias]').focus();}));card.append(actions);area.append(card);});countItems(items.length);});root.append(panel);
}
function renderCredits(root){
  root.append(el('p','about-copy','Built by a DUAL. Made for DUALS. Gracias por cada pista, corrección y recuerdo compartido. ♡'));
  renderList(root,data.credits.filter(x=>x.consent===true).map(x=>({title:x.alias||'DUAL anónima',description:x.contribution,date:x.date})),'Todavía no hay créditos publicados. Aquí aparecerán las aportaciones aprobadas con permiso de sus autoras o autores.');root.append(button('Contribuir a The Archive ♡',()=>navigate('archive'),'action primary'));
}
function renderMembers(root){
  const grid=el('div','member-grid');data.members.forEach(m=>{const card=el('article','extra-card member-card');const avatar=el('div','member-avatar');avatar.style.background=m.accent;if(m.image){const img=el('img');img.src=m.image;img.alt=m.name;img.loading='lazy';avatar.append(img);}else{avatar.textContent=m.name.slice(0,1);avatar.setAttribute('aria-hidden','true');}card.append(avatar,el('h4','',m.name),el('p','extra-label',m.country));if(m.bio)card.append(el('p','',m.bio));const a=link('Más información ↗',m.url);if(a)card.append(a);grid.append(card);});root.append(grid);const actions=el('div','actions member-links');[link('Conoce al grupo: ¡VAMOS, BRAVOS! ↗',data.introductionUrl,'action primary'),link('Fuente de los perfiles ↗',data.memberSource)].filter(Boolean).forEach(a=>actions.append(a));root.append(actions,el('p','small-note','Perfiles básicos con fuentes públicas; espacios preparados para añadir biografías y fotos propias o autorizadas.'));countItems(data.members.length);
}
function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function renderGames(root){
  const menu=el('div','filters'),area=el('section','game-area');
  const games=[['memory','Photocard Match',renderMemoryGame],['quiz','Trivia',renderQuiz],['song','SongGuess.exe',renderSongGuess],['catch','BRAVO_CATCH.exe',renderBravoCatch]];
  const tabs=games.map(([id,label])=>button(label,()=>switchGame(id),'filter'));
  menu.append(...tabs);root.append(menu,area);
  function switchGame(which){disposeExtraGame();tabs.forEach((b,i)=>b.setAttribute('aria-pressed',String(games[i][0]===which)));area.replaceChildren();games.find(g=>g[0]===which)[2](area);}
  switchGame('memory');countItems(games.length);
}
function renderQuiz(root){
  const questions=shuffle(data.members.map(m=>({question:'¿De dónde es '+m.name+'?',answer:m.country,choices:shuffle(data.members.map(x=>x.country))})));let index=0,score=0;const area=el('div','quiz-area');root.append(area);function draw(){area.replaceChildren();if(index===questions.length){area.append(el('h4','','¡Trivia completada! ♡'),el('p','quiz-score',score+' / '+questions.length),button('Volver a jugar',()=>{root.replaceChildren();renderQuiz(root);},'action primary'));return;}const q=questions[index];area.append(el('p','extra-label','PREGUNTA '+(index+1)+' / '+questions.length),el('h4','',q.question));const answers=el('div','quiz-answers'),feedback=el('p','game-status');feedback.setAttribute('role','status');let answered=false;const next=button(index===questions.length-1?'Ver resultado':'Siguiente →',()=>{index++;draw();},'action primary');next.disabled=true;q.choices.forEach(choice=>{const b=button(choice,()=>{if(answered)return;answered=true;const correct=choice===q.answer;if(correct)score++;feedback.textContent=correct?'¡Correcto! ♡':'Respuesta: '+q.answer;[...answers.children].forEach(btn=>{btn.disabled=true;if(btn.textContent===q.answer)btn.classList.add('correct');});if(!correct)b.classList.add('incorrect');next.disabled=false;},'quiz-choice');answers.append(b);});area.append(answers,feedback,next);}draw();
}
function downloadLocal(label,path){const a=el('a','action primary',label);a.href=path;a.download='';return a;}
function renderToolkit(root){
  root.append(downloadLocal('↓ Descargar toolkit completo (.zip)','assets/toolkit/DUAL_TOOLKIT.zip'));const grid=el('div','toolkit-grid');data.toolkit.forEach(x=>{const card=el('article','extra-card');card.append(el('p','extra-label',x.type),el('h4','',x.title),el('p','',x.description),downloadLocal('↓ Descargar',x.file));grid.append(card);});root.append(grid,el('p','small-note','Plantillas originales de este proyecto. Puedes personalizarlas para tus actividades de fan.'));countItems(data.toolkit.length);
}
