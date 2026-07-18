
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu-btn'),mobile=document.querySelector('.mobile-menu');if(menu&&mobile){menu.setAttribute('aria-expanded','false');menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobile.classList.contains('open')){mobile.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});}
 const prog=document.querySelector('.progress');const progress=()=>{if(!prog)return;const d=document.documentElement,max=d.scrollHeight-d.clientHeight;prog.style.width=(max>0?d.scrollTop/max*100:0)+'%'};addEventListener('scroll',progress,{passive:true});progress();
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.07});document.querySelectorAll('section,.product-card,.tail-card').forEach(x=>{x.classList.add('reveal');io.observe(x)});
 const imageTriggers=[...document.querySelectorAll('[data-lightbox-image]')];
 const videoTriggers=[...document.querySelectorAll('.review-video-card')];
 if(imageTriggers.length||videoTriggers.length){
   const viewer=document.createElement('div');
   viewer.className='media-lightbox';
   viewer.setAttribute('aria-hidden','true');
   viewer.innerHTML='<button class="media-lightbox__close" type="button" aria-label="Закрыть">×</button><div class="media-lightbox__stage"></div><div class="media-lightbox__caption"></div>';
   document.body.appendChild(viewer);
   const stage=viewer.querySelector('.media-lightbox__stage');
   const caption=viewer.querySelector('.media-lightbox__caption');
   const closeBtn=viewer.querySelector('.media-lightbox__close');
   const closeViewer=()=>{
     const video=stage.querySelector('video'); if(video){video.pause();video.removeAttribute('src');video.load()}
     stage.replaceChildren();viewer.classList.remove('open');viewer.setAttribute('aria-hidden','true');document.body.style.overflow='';
   };
   const openImage=trigger=>{
     const source=trigger.dataset.lightboxImage||trigger.currentSrc||trigger.src;
     const img=document.createElement('img');img.src=source;img.alt=trigger.alt||'Увеличенная фотография';
     stage.replaceChildren(img);caption.textContent=trigger.alt||trigger.querySelector?.('span')?.textContent||'';
     viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';closeBtn.focus();
   };
   const openVideo=card=>{
     const original=card.querySelector('video');if(!original)return;
     const source=original.currentSrc||original.querySelector('source')?.src||original.src;if(!source)return;
     const video=document.createElement('video');video.src=source;video.controls=true;video.autoplay=true;video.playsInline=true;video.preload='auto';
     stage.replaceChildren(video);caption.textContent=card.querySelector('.review-video-card__label')?.textContent||'Видеоотзыв покупателя';
     viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';video.play().catch(()=>{});closeBtn.focus();
   };
   imageTriggers.forEach(trigger=>{trigger.addEventListener('click',()=>openImage(trigger));trigger.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openImage(trigger)}})});
   videoTriggers.forEach(card=>{card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','Открыть видеоотзыв');card.addEventListener('click',()=>openVideo(card));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openVideo(card)}})});
   closeBtn.addEventListener('click',closeViewer);viewer.addEventListener('click',e=>{if(e.target===viewer)closeViewer()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&viewer.classList.contains('open'))closeViewer()});
 }

 // Единое окно связи для всех кнопок заказа
 const contactLinks=[...document.querySelectorAll('a[href*="t.me/pawcraftadmin"], a[data-contact-modal]')].filter(a=>{
   const text=(a.textContent||'').trim().toLowerCase();
   return !a.href.includes('?text=') && !text.includes('telegram') && !text.includes('@pawcraftadmin');
 });
 if(contactLinks.length){
   const modal=document.createElement('div');
   modal.className='contact-modal';
   modal.setAttribute('aria-hidden','true');
   modal.innerHTML=`<div class="contact-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
     <button class="contact-modal__close" type="button" aria-label="Закрыть">×</button>
     <span class="eyebrow">PawCraft на связи</span>
     <h2 id="contact-modal-title">Выберите удобный способ связи</h2>
     <p>Напишите нам или позвоните. Поможем с выбором и обсудим детали заказа.</p>
     <div class="contact-modal__actions">
       <a class="contact-option" href="https://wa.me/79778855635" target="_blank" rel="noopener"><span>WhatsApp</span><b>+7 (977) 885-56-35</b></a>
       <a class="contact-option contact-option--primary" href="https://t.me/pawcraftadmin" target="_blank" rel="noopener"><span>Telegram</span><b>@pawcraftadmin</b></a>
       <a class="contact-option" href="tel:+79778855635"><span>Позвонить</span><b>+7 (977) 885-56-35</b></a>
     </div>
   </div>`;
   document.body.appendChild(modal);
   const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
   const openModal=e=>{e.preventDefault();modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.querySelector('.contact-modal__close').focus()};
   contactLinks.forEach(a=>a.addEventListener('click',openModal));
   modal.querySelector('.contact-modal__close').addEventListener('click',closeModal);
   modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
   document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});
 }

});

// Home navigation always returns to the domain root.
document.querySelectorAll('a[href="/"]').forEach(link=>{
  link.addEventListener('click',event=>{
    if(event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.location.assign('/');
  });
});

// Robust breed filters. Works without a search input and never hides the grid on load.
document.addEventListener('DOMContentLoaded',()=>{
  const root=document.getElementById('breed-keychains');
  const grid=document.getElementById('breed-grid');
  if(!root || !grid) return;
  const buttons=[...root.querySelectorAll('.kc-filters button[data-filter]')];
  const cards=[...grid.querySelectorAll('.kc-card')];
  const empty=document.getElementById('breed-empty');
  const reset=document.getElementById('breed-reset');
  const count=document.querySelector('.kc-hero-visual span');
  let active='Все породы';

  grid.style.display='grid';
  cards.forEach(card=>{card.hidden=false;card.style.display='';});
  if(count) count.textContent=`${cards.length} моделей`;

  const apply=()=>{
    let shown=0;
    cards.forEach(card=>{
      const visible=active==='Все породы' || card.dataset.category===active;
      card.hidden=!visible;
      card.style.display=visible?'':'none';
      if(visible) shown++;
    });
    buttons.forEach(button=>{
      const selected=button.dataset.filter===active;
      button.classList.toggle('active',selected);
      button.setAttribute('aria-pressed',String(selected));
    });
    if(empty) empty.hidden=shown!==0;
  };

  buttons.forEach(button=>button.addEventListener('click',()=>{
    active=button.dataset.filter || 'Все породы';
    apply();
  }));
  reset?.addEventListener('click',()=>{active='Все породы';apply();});
  apply();
});
