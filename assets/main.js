(function(){
  var root=document.documentElement,btn=document.getElementById('theme');
  try{var s=localStorage.getItem('theme');if(s)root.dataset.theme=s}catch(e){}
  btn.addEventListener('click',function(){
    var dark=root.dataset.theme?root.dataset.theme==='dark':!matchMedia('(prefers-color-scheme: light)').matches;
    root.dataset.theme=dark?'light':'dark';
    try{localStorage.setItem('theme',root.dataset.theme)}catch(e){}
  });
  document.getElementById('year').textContent=new Date().getFullYear();
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});

  var lb=document.getElementById('lightbox');
  if(lb&&lb.showModal){
    var img=lb.querySelector('img'),cap=lb.querySelector('.lb-cap'),prev=lb.querySelector('.lb-prev'),next=lb.querySelector('.lb-next'),list=[],i=0,opener=null;
    function show(){img.src=list[i];cap.textContent=lb.dataset.title+' ('+(i+1)+' / '+list.length+')';cap.hidden=list.length<2;}
    function go(d){i=(i+d+list.length)%list.length;show()}
    document.querySelectorAll('[data-shots]').forEach(function(b){
      b.addEventListener('click',function(){
        list=b.dataset.shots.split(',');i=0;opener=b;img.alt=b.dataset.alt||'';lb.dataset.title=b.dataset.title||'';
        prev.hidden=next.hidden=list.length<2;show();lb.showModal();
      });
    });
    lb.querySelector('.lb-close').addEventListener('click',function(){lb.close()});
    prev.addEventListener('click',function(){go(-1)});next.addEventListener('click',function(){go(1)});
    lb.addEventListener('click',function(e){if(e.target===lb||e.target===img.parentNode&&e.target!==img)lb.close()});
    lb.addEventListener('keydown',function(e){if(list.length>1){if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)}});
    lb.addEventListener('close',function(){img.removeAttribute('src');if(opener)opener.focus()});
  }
})();
