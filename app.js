const groups = [
 ['Brows','Shape & definition',['Microblading Tattoo','Powder Brow Tattoo','Ombre Brow Tattoo','Combo Brow Tattoo']],
 ['Cosmetic tattoos & details','Your finishing touches',['Lip Blush Tattoo','Lip Liner Tattoo','Freckle on Face Tattoo','Tiny Tattoos','Ear Piercings','Tooth Gems']],
 ['Restorative tattooing','Thoughtful, personal care',['Paramedical Tattoos','Corrective Surgery Scar Tattoos','Areola Breast Tattoo','Scar Camouflage Tattoo','Surgery Scar Camo Tattoo','Sal Tattoo Removal']],
 ['Skin','Care beyond the surface',['Microneedling Facial','Skincare Products','Skincare Analysis']],
 ['Mindful movement','Space to reconnect',['Yoga Vinyasa Classes','Meditation Classes','Sound Healing Classes']]
];
const list = document.querySelector('#service-list');
groups.forEach(([name,desc,services],i) => {
 const detail = document.createElement('details');
 const summary = document.createElement('summary');
 summary.innerHTML = `<span class="number">0${i+1}</span><span class="category">${name}</span><span class="desc">${desc}</span><span class="plus" aria-hidden="true">+</span>`;
 const ul=document.createElement('ul'); ul.className='services';
 services.forEach(service=>{const li=document.createElement('li');const a=document.createElement('a');a.href='#consultation';a.textContent=service;a.addEventListener('click',e=>{e.preventDefault();openBooking(name,a)});li.append(a);ul.append(li)});
 detail.append(summary,ul);list.append(detail);
});
const dialog=document.querySelector('#booking');let opener;
function openBooking(interest,source){opener=source;document.querySelector('#interest').value=interest||'Help choosing a treatment';dialog.showModal()}
document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',()=>openBooking(null,button)));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>opener?.focus());
document.querySelector('#year').textContent=new Date().getFullYear();
