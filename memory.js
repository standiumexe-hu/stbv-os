/* PHOTOCARD_MATCH.exe — no backend; collection-specific local records. */
function renderMemoryGame(root) {
  const sets = (data.memoryCollections || []).filter(s => Array.isArray(s.cards) && s.cards.length >= 5);
  if (!sets.length) { root.append(el('p','empty','Todavía no hay colecciones disponibles.')); return; }
  const prefix = 'stbv-memory-v33-';
  let chosen = sets[0].id;
  try { const saved = localStorage.getItem(prefix+'collection'); if (sets.some(s=>s.id===saved)) chosen=saved; } catch {}
  const intro=el('div','photo-intro');
  intro.append(el('p','extra-label','PHOTOCARD_MATCH.exe / COLLECTION MODE'),el('h4','','Collect the memories ♡'),el('p','','Encuentra las cinco parejas idénticas de tu colección favorita.'));
  const toolbar=el('div','photo-toolbar');
  const field=el('label','photo-field','Colección');
  const select=el('select','photo-select');
  for(const s of sets){const opt=el('option','',s.name);opt.value=s.id;select.append(opt);}
  select.value=chosen;field.append(select);
  const random=button('Al azar',()=>{const alternatives=sets.filter(s=>s.id!==select.value);select.value=(alternatives[Math.floor(Math.random()*alternatives.length)]||sets[0]).id;startRound();});
  const restart=button('Reiniciar',()=>startRound());
  toolbar.append(field,random,restart);
  const metrics=el('div','photo-metrics');
  function metric(label){const block=el('div','photo-metric');const v=el('strong','','—');block.append(el('span','',label),v);metrics.append(block);return v;}
  const movesText=metric('MOVIMIENTOS'),pairsText=metric('PAREJAS'),timeText=metric('TIEMPO');
  const record=el('p','photo-record'),feedback=el('p','game-status photo-feedback');feedback.setAttribute('role','status');
  const board=el('div','memory-board photo-board');board.setAttribute('aria-label','Tablero de photocards');
  const actions=el('div','actions photo-actions');
  const pause=button('Pausar',()=>{if(paused)resume();else pauseRound();});
  actions.append(pause);
  root.append(intro,toolbar,metrics,record,board,feedback,actions);
  let set,deck=[],buttons=[],open=[],matched=new Set(),moves=0,locked=false,started=false,paused=false,finished=false,elapsed=0,segment=null,timer=null,flipTimer=null,disposed=false;
  function readRecord(){try{const r=JSON.parse(localStorage.getItem(prefix+set.id));return r&&Number.isInteger(r.moves)&&r.moves>=5&&Number.isInteger(r.seconds)&&r.seconds>=0?r:null;}catch{return null;}}
  function time(){return Math.floor((elapsed+(segment===null?0:performance.now()-segment))/1000);}
  function format(s){return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
  function showRecord(){const r=readRecord();record.textContent=r?`★ Récord de esta colección: ${r.moves} movimientos · ${format(r.seconds)}`:'★ Récord de esta colección: sin registrar';}
  function update(){movesText.textContent=String(moves);pairsText.textContent=`${matched.size/2} / 5`;timeText.textContent=format(time());pause.disabled=!started||finished;}
  function stopClock(){if(segment!==null){elapsed+=performance.now()-segment;segment=null;}clearInterval(timer);timer=null;}
  function startClock(){if(segment!==null)return;segment=performance.now();timer=setInterval(update,250);}
  function renderCard(i,reveal){const b=buttons[i];b.classList.toggle('revealed',reveal);b.setAttribute('aria-label',reveal?`Carta ${i+1}: ${deck[i].name}`:`Carta ${i+1}, boca abajo`);}
  function resolveMismatch(){if(open.length===2){open.forEach(i=>renderCard(i,false));open=[];}locked=false;clearTimeout(flipTimer);flipTimer=null;}
  function syncDisabled(){buttons.forEach((b,i)=>b.disabled=paused||matched.has(i));}
  function pauseRound(){if(!started||finished||paused)return;stopClock();resolveMismatch();paused=true;syncDisabled();pause.textContent='Continuar';feedback.textContent='Partida en pausa. ♡';update();}
  function resume(){if(!paused||finished||document.hidden)return;paused=false;syncDisabled();pause.textContent='Pausar';feedback.textContent='Encuentra las parejas. ♡';startClock();update();}
  function finish(){finished=true;stopClock();const seconds=time();const old=readRecord();const better=!old||moves<old.moves||(moves===old.moves&&seconds<old.seconds);let saved=false;if(better){try{localStorage.setItem(prefix+set.id,JSON.stringify({moves,seconds}));saved=true;}catch{}}showRecord();update();feedback.textContent=`¡Colección completada, DUAL! ♡ ${moves} movimientos · ${format(seconds)}${better?(saved?' · ¡Nuevo récord!':' · No se pudo guardar el récord.') : ''}`;}
  function flip(i){if(disposed||paused||finished||locked||matched.has(i)||open.includes(i))return;if(!started){started=true;startClock();feedback.textContent='Encuentra las parejas. ♡';}renderCard(i,true);open.push(i);if(open.length===2){moves++;const [a,b]=open;if(deck[a].id===deck[b].id){[a,b].forEach(j=>{matched.add(j);buttons[j].classList.add('matched');buttons[j].setAttribute('aria-label',`${deck[j].name}, pareja encontrada`);});open=[];syncDisabled();if(matched.size===deck.length)finish();else feedback.textContent='¡Pareja encontrada! ♡';}else{locked=true;feedback.textContent='No coinciden. ¡Sigue intentando!';flipTimer=setTimeout(resolveMismatch,850);}}update();}
  function startRound(){stopClock();clearTimeout(flipTimer);flipTimer=null;set=sets.find(s=>s.id===select.value)||sets[0];try{localStorage.setItem(prefix+'collection',set.id);}catch{};const items=shuffle(set.cards).slice(0,5);deck=shuffle([...items,...items]);open=[];matched=new Set();moves=0;locked=false;started=false;paused=false;finished=false;elapsed=0;board.replaceChildren();buttons=deck.map((card,i)=>{const b=button('',()=>flip(i),'memory-card photo-card');b.setAttribute('aria-label',`Carta ${i+1}, boca abajo`);const inner=el('span','photo-inner');for(const [cls,src] of [['photo-back',set.back],['photo-front',card.image]]){const face=el('span','photo-face '+cls);const img=el('img');img.src=src;img.alt='';img.draggable=false;face.append(img);inner.append(face);}b.append(inner);board.append(b);return b;});pause.textContent='Pausar';feedback.textContent='El cronómetro empieza al voltear la primera carta.';showRecord();update();}
  select.addEventListener('change',startRound);
  function hidden(){if(document.hidden)pauseRound();}
  document.addEventListener('visibilitychange',hidden);
  extraGamePause=pauseRound;
  extraGameCleanup=()=>{disposed=true;stopClock();clearTimeout(flipTimer);document.removeEventListener('visibilitychange',hidden);};
  startRound();
}
