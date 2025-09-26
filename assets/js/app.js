const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

const S = window.SITE || {};
const yearEl = $("#y"); if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Hero content */
$("#name").textContent = S.name;
$("#role").textContent = S.role;
const emailA = $("#email-link");
emailA.href = `mailto:${S.email}`;
emailA.querySelector("strong").textContent = S.email;

$("#linkedin-pill").href = S.linkedin;
$("#github-pill").href = S.github;
$("#cv-pill").href = S.cv;

/* Render sections */
$("#about-body").innerHTML = `<p>${S.bio}</p>`;

// The rest of the sections are already handled correctly by the old logic.
$("#teaching-list").innerHTML = (S.teaching||[])
  .map(t => `<li><strong>${t.title}</strong> — ${t.role}, ${t.term} <span class="meta">${t.place}</span></li>`)
  .join("");

$("#projects-list").innerHTML = (S.projects||[])
  .map(p => `<li>
      <div class="card-title"><a href="${p.link}">${p.title}</a></div>
      <div class="meta">${p.year} — ${p.stack}</div>
      <p>${p.desc}</p>
    </li>`).join("");

$("#courses-list").innerHTML = (S.courses||[])
  .map(c => `<li><strong>${c.name}</strong> — ${c.grade}</li>`)
  .join("");

$("#exp-list").innerHTML = (S.experience||[])
  .map(e => `<li><div class="when">${e.when}</div><div class="what">${e.what}</div></li>`)
  .join("");

$("#cv-link").href = S.cv;

$("#contact-list").innerHTML = `
  <li><span>Email:</span> <a href="mailto:${S.email}">${S.email}</a></li>
  <li><span>Phone:</span> <a href="tel:${S.phone.replace(/\s+/g,'')}">${S.phone}</a></li>
  <li><span>LinkedIn:</span> <a href="${S.linkedin}" target="_blank">${new URL(S.linkedin).pathname.split('/').pop()}</a></li>
  <li><span>GitHub:</span> <a href="${S.github}" target="_blank">${new URL(S.github).pathname.split('/').pop()}</a></li>`;

/* Tabs + moving underline */
const tabs = $$(".tab");
const underline = $(".tab-underline");
function activateTab(btn){
  tabs.forEach(t => t.classList.remove("is-active"));
  btn.classList.add("is-active");
  const targetId = btn.dataset.target;
  $$(".section").forEach(s => s.id===targetId ? s.classList.remove("is-hidden") : s.classList.add("is-hidden"));
  const r = btn.getBoundingClientRect();
  const parentR = btn.parentElement.getBoundingClientRect();
  underline.style.width = r.width + "px";
  underline.style.transform = `translateX(${r.left - parentR.left}px)`;
}
window.addEventListener("load", () => {
    const activeTab = $(".tab.is-active");
    if(activeTab) activateTab(activeTab);
});
tabs.forEach(t => t.addEventListener("click", () => activateTab(t)));
