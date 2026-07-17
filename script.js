
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu-btn'),mobile=document.querySelector('.mobile-menu');if(menu&&mobile){menu.setAttribute('aria-expanded','false');menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobile.classList.contains('open')){mobile.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});}
 const prog=document.querySelector('.progress');const progress=()=>{if(!prog)return;const d=document.documentElement,max=d.scrollHeight-d.clientHeight;prog.style.width=(max>0?d.scrollTop/max*100:0)+'%'};addEventListener('scroll',progress,{passive:true});progress();
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.07});document.querySelectorAll('section,.product-card,.tail-card').forEach(x=>{x.classList.add('reveal');io.observe(x)});
 const imgs=[...document.querySelectorAll('.gallery-grid img,.masonry img,.review-images img,.postcards-gallery img,.archive-gallery img,.pot-photo img')];if(imgs.length){const lb=document.createElement('div');lb.className='lightbox';lb.innerHTML='<button aria-label="Закрыть">×</button><img alt="Увеличенное фото">';document.body.appendChild(lb);imgs.forEach(im=>im.addEventListener('click',()=>{lb.querySelector('img').src=im.src;lb.classList.add('open');document.body.style.overflow='hidden'}));const close=()=>{lb.classList.remove('open');document.body.style.overflow=''};lb.querySelector('button').onclick=close;lb.addEventListener('click',e=>{if(e.target===lb)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}

 // Единое окно связи для всех кнопок заказа
 const contactLinks=[...document.querySelectorAll('a[href*="t.me/pawcraftadmin"], a[data-contact-modal]')].filter(a=>{
   const text=(a.textContent||'').trim().toLowerCase();
   return !text.includes('telegram') && !text.includes('@pawcraftadmin');
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
