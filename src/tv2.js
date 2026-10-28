/* Книга «Случай», продолжение: главы по Гмурману гл. 7–9, 11–17, части, итоги и вопросы к экзамену */
(() => {
const {h, fr} = U;
const add = L => BOOKS.tv.lessons.push(L);
const R = (n,d) => U.fmt(n,d);
const P = (n, q, t, tol, ans, hint, ph) => ({n, q, ans, hint, ph, check: s => U.near(s, t, tol)});
const range = (a,b,n) => Array.from({length:n},(_,i)=>a+(b-a)*i/(n-1));

/* 12. Функции случайного аргумента */
add({
  id:'tv12', title:'Функции случайного аргумента', src:'Гмурман, гл. 7',
  theory:`<p>Если каждому значению X отвечает одно значение Y, то <b>Y = φ(X)</b> — функция случайного аргумента. Это тоже случайная величина, и её закон выводится из закона X.</p>
  <h3>Дискретный случай</h3>
  <p>Значения yᵢ = φ(xᵢ) получают те же вероятности pᵢ. Если разные xᵢ дают одно и то же y, их вероятности <b>складывают</b>.</p>
  <h3>Непрерывный случай</h3>
  <div class="f">g(y) = f(ψ(y))·|ψ′(y)|<small>φ монотонна и дифференцируема, x = ψ(y) — обратная функция; f — плотность X, g — плотность Y</small></div>
  <p>Если φ не монотонна, интервал разбивают на участки монотонности и складывают слагаемые по всем корням: g(y) = Σ f(ψᵢ(y))·|ψᵢ′(y)|.</p>
  <h3>Математическое ожидание функции</h3>
  <div class="f">M[φ(X)] = Σ φ(xᵢ)pᵢ, &nbsp; M[φ(X)] = ∫ φ(x) f(x) dx<small>закон Y находить не обязательно. Но в общем случае M[φ(X)] ≠ φ(M(X))</small></div>
  <p>Для линейной функции Y = aX + b: M(Y) = aM(X) + b, D(Y) = a²D(X). Линейная функция нормальной величины снова нормальна.</p>
  <h3>Функция двух аргументов</h3>
  <p>Z = X + Y для дискретных: перебирают все пары (xᵢ, yⱼ), для независимых P(Z = xᵢ + yⱼ) = P(xᵢ)·P(yⱼ). Для независимых непрерывных — <b>композиция</b> (свёртка):</p>
  <div class="f">g(z) = ∫ f₁(x)·f₂(z − x) dx</div>`,
  predict:{q:'X распределена равномерно на (0; 2), M(X) = 1. Чему равно M(X²)?', opts:['1 — ведь это (M X)²','4/3','2'], a:1,
    why:'M(X²) = ∫₀² x²·½ dx = 8/6 = 4/3. Квадрат среднего (1) меньше среднего квадрата (4/3) ровно на D(X) = 1/3: M(X²) = D(X) + M²(X).'},
  flap:`<p><b>Задача 374.</b> X: 3, 6, 10 с вероятностями 0,2; 0,1; 0,7; Y = 2X + 1. Значения Y: 7, 13, 21 с теми же вероятностями 0,2; 0,1; 0,7. M(Y) = 2M(X) + 1 = 2·8,2 + 1 = 17,4.</p>
  <p><b>Задача 401а.</b> X: 10, 12, 16 (0,4; 0,1; 0,5), Y: 1, 2 (0,2; 0,8), независимы. Z = X + Y: 11 (0,08), 12 (0,32), 13 (0,02), 14 (0,08), 17 (0,10), 18 (0,40). Сумма вероятностей равна 1.</p>
  <p><b>Красивый факт:</b> если R равномерна на (0; 1), то −ln R распределена по показательному закону. Проверь на рисунке — на этом держится метод Монте-Карло из главы 18.</p>`,
  figCap:'20 000 значений X пропущены через функцию φ. Гистограмма — то, что получилось; пунктир — плотность g(y) по формуле.',
  try:'Выбери «X равномерна» и φ = −ln X: получится показательный закон.',
  ch:{q:'Дискретная X: значения 3, 6, 10 с вероятностями 0,2; 0,1; 0,7 (задача 374). Найдите M(Y) для Y = 2X + 1.', check:s=>U.near(s,17.4,0.001), ans:'17,4', hint:'M(aX + b) = aM(X) + b; M(X) = 0,6 + 0,6 + 7.'},
  fig(el){
    let base = 0, fn = 0;
    const B = [['X равномерна на (0; 1)', ()=>Math.random()], ['X нормальна N(0; 1)', ()=>U.gauss()]];
    const F = [
      {n:'φ = 2X + 1', f:x=>2*x+1, g:[y=>y>1&&y<3?.5:0, y=>U.phi((y-1)/2)/2]},
      {n:'φ = X²', f:x=>x*x, g:[y=>y>0&&y<1?1/(2*Math.sqrt(y)):0, y=>y>0?Math.exp(-y/2)/Math.sqrt(2*Math.PI*y):0]},
      {n:'φ = eˣ', f:x=>Math.exp(x), g:[y=>y>1&&y<Math.E?1/y:0, y=>y>0?U.phi(Math.log(y))/y:0]},
      {n:'φ = −ln X', f:x=>x>0?-Math.log(x):NaN, g:[y=>y>0?Math.exp(-y):0, null]}];
    el.append(h('div',{class:'row'}, U.select('tv12-b', B.map(b=>b[0]), v=>{base=v; draw();}), U.select('tv12-f', F.map(f=>f.n), v=>{fn=v; draw();})));
    const cv = U.canvas(el, .58), out = h('div',{class:'readout'}); el.append(out);
    function draw(){
      const {g,W,H} = cv.fit(), c = U.col(), Fn = F[fn], gfun = Fn.g[base];
      const xs = Array.from({length:20000}, B[base][1]), ys = xs.map(Fn.f).filter(isFinite).sort((a,b)=>a-b);
      if (!ys.length || !gfun){ out.innerHTML = '<span class="bad">−ln X определён только для X &gt; 0 — выбери равномерный X.</span>'; return; }
      const lo = ys[Math.floor(ys.length*.005)], hi = ys[Math.floor(ys.length*.995)], nb = 40, bw = (hi-lo)/nb || 1;
      const cnt = new Array(nb).fill(0); ys.forEach(y=>{ const k = Math.floor((y-lo)/bw); if (k>=0&&k<nb) cnt[k]++; });
      const dens = cnt.map(n=>n/ys.length/bw);
      const curve = range(lo,hi,200).map(y=>[y,gfun(y)]), mx = Math.max(...dens, ...curve.map(p=>isFinite(p[1])?p[1]:0).slice(2))*1.1 || 1;
      const ax = 36, ay = 10, aw = W-ax-10, ah = H-ay-28, X = y => ax+(y-lo)/(hi-lo)*aw, Y = v => ay+ah-Math.min(v,mx)/mx*ah;
      U.axes(g,ax,ay+ah,ax+aw,ay,c);
      dens.forEach((d,k)=>{ g.fillStyle = U.hatch(g,c.pen,5); g.fillRect(X(lo+k*bw),Y(d),aw/nb-1,ay+ah-Y(d)); g.strokeStyle=c.ink; g.lineWidth=.8; g.strokeRect(X(lo+k*bw),Y(d),aw/nb-1,ay+ah-Y(d)); });
      g.save(); g.setLineDash([6,4]); g.strokeStyle=c.stamp; g.lineWidth=2.2; g.beginPath(); let st = false;
      curve.forEach(([y,v])=>{ if (!isFinite(v)) { st=false; return; } st ? g.lineTo(X(y),Y(v)) : g.moveTo(X(y),Y(v)); st = true; }); g.stroke(); g.restore();
      for (let i=0;i<=4;i++){ const v = lo+(hi-lo)*i/4; U.text(g,R(v,2),X(v),ay+ah+14,{size:10,align:'center',color:c.soft,kind:'mono'}); }
      const mX = xs.reduce((a,b)=>a+b,0)/xs.length, mY = ys.reduce((a,b)=>a+b,0)/ys.length;
      out.innerHTML = `M[φ(X)] ≈ <b>${R(mY,3)}</b> &nbsp;·&nbsp; φ(M(X)) = ${R(Fn.f(mX),3)} ${Math.abs(mY-Fn.f(mX))>.05?'<span class="hot">— не совпадают!</span>':'<span class="good">— совпадают (φ линейна)</span>'}`;
    }
    return draw;
  }
});

/* 13. Система двух случайных величин */
add({
  id:'tv13', title:'Система двух случайных величин. Корреляция', src:'Гмурман, гл. 8',
  theory:`<p>Пара (X, Y) — <b>двумерная случайная величина</b>. Дискретную задают таблицей вероятностей pᵢⱼ = P(X = xᵢ, Y = yⱼ), сумма всех pᵢⱼ равна 1.</p>
  <div class="f">P(X = xᵢ) = Σⱼ pᵢⱼ, &nbsp; P(Y = yⱼ) = Σᵢ pᵢⱼ<small>законы составляющих: суммы по строкам и столбцам таблицы</small></div>
  <h3>Функция и плотность распределения</h3>
  <div class="f">F(x, y) = P(X &lt; x, Y &lt; y), &nbsp; f(x, y) = ${fr('∂²F','∂x∂y')}, &nbsp; P((X,Y) ∈ D) = ∬<sub>D</sub> f(x,y) dx dy<small>f₁(x) = ∫ f(x, y) dy, f₂(y) = ∫ f(x, y) dx; ∬ f = 1</small></div>
  <h3>Условные законы и независимость</h3>
  <div class="f">P(xᵢ | yⱼ) = ${fr('pᵢⱼ','P(Y = yⱼ)')}, &nbsp; φ(x | y) = ${fr('f(x, y)','f₂(y)')}</div>
  <p>X и Y <b>независимы</b>, если pᵢⱼ = P(xᵢ)·P(yⱼ) для всех клеток (для непрерывных f(x, y) = f₁(x)·f₂(y)). <b>Условное математическое ожидание</b> M(Y | X = x) как функция x называется <b>регрессией</b> Y на X.</p>
  <h3>Корреляционный момент и коэффициент корреляции</h3>
  <div class="f">μₓᵧ = M[(X − mₓ)(Y − mᵧ)] = M(XY) − M(X)·M(Y), &nbsp; rₓᵧ = ${fr('μₓᵧ','σₓσᵧ')}<small>|r| ≤ 1; |r| = 1 ⇔ Y линейно зависит от X; независимые величины некоррелированы, но обратное неверно</small></div>
  <p>Для нормальной системы некоррелированность и независимость равносильны. Важная формула: D(X + Y) = D(X) + D(Y) + 2μₓᵧ.</p>`,
  predict:{q:'Коэффициент корреляции rₓᵧ = 0. Значит ли это, что X и Y независимы?', opts:['Да, всегда','Нет: они только некоррелированы','Да, если обе дискретные'], a:1,
    why:'Пусть X симметрична относительно нуля, а Y = X². Y полностью определяется X, но r = 0. Корреляция ловит только линейную связь. Включи на рисунке режим «Y = X²».'},
  flap:`<p><b>Задача 409.</b> Законы составляющих — суммы по столбцам и строкам: X: 26, 30, 41, 50 с вероятностями 0,14; 0,42; 0,19; 0,25; Y: 2,3 и 2,7 с вероятностями 0,29 и 0,71.</p>
  <p><b>Задача 422.</b> P(Y = 10) = 0,25 + 0,10 = 0,35. P(X = 3 | Y = 10) = 0,25/0,35 = 5/7; P(X = 6 | Y = 10) = 2/7.</p>
  <p><b>Как считать r по таблице:</b> найти M(X), M(Y), M(XY) = Σ xᵢyⱼpᵢⱼ, σₓ, σᵧ; затем r = (M(XY) − M(X)M(Y)) / (σₓσᵧ).</p>`,
  figCap:'300 точек системы (X, Y). Синяя прямая — регрессия Y на X, фиолетовая — X на Y. При |r| = 1 они сливаются.',
  try:'Сдвинь r к ±1 — облако сжимается в прямую. Потом включи «Y = X²»: связь есть, а r ≈ 0.',
  ch:{q:'Задача 422. Дискретная (X, Y): X ∈ {3, 6}, Y ∈ {10, 14, 18}; p(3;10) = 0,25, p(6;10) = 0,10, p(3;14) = 0,15, p(6;14) = 0,05, p(3;18) = 0,32, p(6;18) = 0,13. Найдите P(X = 3 | Y = 10).', check:s=>U.near(s,5/7,0.003), ans:'5/7 ≈ 0,714', hint:'P(Y = 10) — сумма столбца Y = 10.'},
  fig(el){
    let r = .6, quad = false, pts = [];
    const sr = U.slider('tv13-r','r',-1,1,.05,r,v=>R(v,2),v=>{r=v; gen();});
    const bq = U.btn('Y = X² (r ≈ 0)', ()=>{ quad=!quad; bq.setAttribute('aria-pressed',quad); gen(); });
    el.append(h('div',{class:'ctls'}, sr), h('div',{class:'row'}, bq, U.btn('Новая выборка', ()=>gen())));
    const cv = U.canvas(el, .75), out = h('div',{class:'readout'}); el.append(out);
    function gen(){ pts = Array.from({length:300},()=>{ const a = U.gauss(), b = U.gauss(); return quad ? [a, a*a-1] : [a, r*a+Math.sqrt(1-r*r)*b]; }); draw(); }
    function draw(){
      if (!pts.length) return;
      const {g,W,H} = cv.fit(), c = U.col();
      const n = pts.length, mx = pts.reduce((s,p)=>s+p[0],0)/n, my = pts.reduce((s,p)=>s+p[1],0)/n;
      const sx = Math.sqrt(pts.reduce((s,p)=>s+(p[0]-mx)**2,0)/n), sy = Math.sqrt(pts.reduce((s,p)=>s+(p[1]-my)**2,0)/n);
      const rr = pts.reduce((s,p)=>s+(p[0]-mx)*(p[1]-my),0)/n/(sx*sy);
      const L = 3.5, X = x => 20+(x+L)/(2*L)*(W-40), Y = y => H/2-(y)/(L)*(H/2-14);
      g.strokeStyle = c.rule; g.lineWidth = 1; g.beginPath(); g.moveTo(X(-L),Y(0)); g.lineTo(X(L),Y(0)); g.moveTo(X(0),Y(-L)); g.lineTo(X(0),Y(L)); g.stroke();
      g.fillStyle = c.ink; pts.forEach(([x,y])=>{ g.globalAlpha=.55; g.beginPath(); g.arc(X(x),Y(y),2.3,0,7); g.fill(); }); g.globalAlpha=1;
      const line = (k, b, col, inv) => { g.strokeStyle = col; g.lineWidth = 2.4; g.beginPath(); if (!inv){ g.moveTo(X(-L),Y(k*(-L-mx)+my)); g.lineTo(X(L),Y(k*(L-mx)+my)); } else { g.moveTo(X(k*(-L-my)+mx),Y(-L)); g.lineTo(X(k*(L-my)+mx),Y(L)); } g.stroke(); };
      line(rr*sy/sx, 0, c.pen, false); line(rr*sx/sy, 0, c.stamp, true);
      out.innerHTML = `выборочный r = <b>${R(rr,3)}</b> · регрессия Y на X: y − ȳ = ${R(rr*sy/sx,3)}(x − x̄)${quad?' <span class="hot">— связь функциональная, а r ≈ 0</span>':''}`;
    }
    gen();
    return draw;
  }
});

/* 14. Выборка и её характеристики */
add({
  id:'tv14', title:'Выборка, гистограмма и сводные характеристики', src:'Гмурман, гл. 9, 11',
  theory:`<p><b>Генеральная совокупность</b> — все объекты, <b>выборка</b> — отобранные n из них. Выборка должна быть <b>репрезентативной</b>: правильно представлять пропорции генеральной совокупности. Отбор бывает повторный и бесповторный.</p>
  <p>Наблюдавшиеся значения xᵢ — <b>варианты</b>, упорядоченные — <b>вариационный ряд</b>. Число наблюдений варианты — <b>частота</b> nᵢ, относительная частота wᵢ = nᵢ/n. Перечень вариант и частот — <b>статистическое распределение</b> выборки.</p>
  <div class="f">F*(x) = ${fr('nₓ','n')}<small>эмпирическая функция распределения: nₓ — число вариант, меньших x. Неубывающая, ступенчатая, от 0 до 1</small></div>
  <p><b>Полигон частот</b> — ломаная через точки (xᵢ, nᵢ). <b>Гистограмма</b> — прямоугольники на интервалах длины h высотой nᵢ/h; их площадь равна n (для относительных частот — 1).</p>
  <h3>Сводные характеристики</h3>
  <div class="f">x̄ = ${fr('Σnᵢxᵢ','n')}, &nbsp; D<sub>в</sub> = ${fr('Σnᵢxᵢ²','n')} − x̄², &nbsp; σ<sub>в</sub> = √D<sub>в</sub></div>
  <p><b>Мода</b> M₀ — варианта с наибольшей частотой. <b>Медиана</b> mₑ — варианта в середине вариационного ряда. <b>Асимметрия</b> aₛ = m₃/σ³ (скошенность), <b>эксцесс</b> eₖ = m₄/σ⁴ − 3 (островершинность; у нормального закона оба равны 0); mₖ — центральные эмпирические моменты.</p>
  <h3>Метод произведений</h3>
  <div class="f">uᵢ = ${fr('xᵢ − C','h')}, &nbsp; x̄ = h·M*(u) + C, &nbsp; D<sub>в</sub> = h²·[M*(u²) − (M*(u))²]<small>C — «ложный нуль» (варианта с наибольшей частотой), h — шаг равноотстоящих вариант. Условные варианты uᵢ — маленькие целые числа</small></div>
  <p>Если варианты получены группировкой по интервалам длины h, дисперсию уточняют <b>поправкой Шеппарда</b>: D′ = D<sub>в</sub> − h²/12.</p>`,
  predict:{q:'В выборке 1, 2, 2, 3, 100 какая характеристика лучше описывает «типичное» значение?', opts:['Средняя x̄','Медиана','Дисперсия'], a:1,
    why:'x̄ = 21,6 — его утащил один выброс 100. Медиана = 2 к выбросам устойчива. Поэтому «медианная зарплата» честнее средней.'},
  flap:`<p><b>Задача 524а методом произведений.</b> Варианты 18,6 … 20,6 с шагом h = 0,4 и частотами 4, 6, 30, 40, 18, 2 (n = 100). Ложный нуль C = 19,8 (наибольшая частота 40). Условные варианты u = −3, −2, −1, 0, 1, 2.</p>
  <p>M*(u) = (−12 − 12 − 30 + 0 + 18 + 4)/100 = −0,32; x̄ = 0,4·(−0,32) + 19,8 = <b>19,672</b>.</p>
  <p>M*(u²) = (36 + 24 + 30 + 0 + 18 + 8)/100 = 1,16; D = 0,16·(1,16 − 0,1024) = <b>0,169</b>.</p>`,
  figCap:'Гистограмма случайной выборки, полигон частот поверх неё и эмпирическая функция F*(x) снизу.',
  try:'Выбери показательный закон: асимметрия станет заметно больше нуля, медиана уйдёт левее средней.',
  ch:{q:'Задача 524а. Варианты 18,6; 19,0; 19,4; 19,8; 20,2; 20,6 с частотами 4; 6; 30; 40; 18; 2. Найдите выборочную среднюю.', check:s=>U.near(s,19.672,0.0015), ans:'19,672', hint:'Метод произведений: C = 19,8, h = 0,4. Или напрямую Σnᵢxᵢ/100.'},
  fig(el){
    let d = 0, n = 200, k = 12, xs = [];
    const D = [['Нормальный', ()=>10+2*U.gauss()], ['Показательный', ()=>-Math.log(Math.random()||1e-9)*2+5], ['Равномерный', ()=>5+10*Math.random()]];
    const gen = () => { xs = Array.from({length:n}, D[d][1]).sort((a,b)=>a-b); draw(); };
    el.append(h('div',{class:'row'}, U.select('tv14-d', D.map(x=>x[0]), v=>{d=v; gen();}), U.btn('Новая выборка', gen)),
      h('div',{class:'ctls'}, U.slider('tv14-n','n',20,2000,10,n,null,v=>{n=v; gen();}), U.slider('tv14-k','интервалов',4,30,1,k,null,v=>{k=v; draw();})));
    const cv = U.canvas(el, .7), out = h('div',{class:'readout'}); el.append(out);
    function draw(){
      if (!xs.length) return;
      const {g,W,H} = cv.fit(), c = U.col();
      const lo = xs[0], hi = xs[xs.length-1], bw = (hi-lo)/k || 1, cnt = new Array(k).fill(0);
      xs.forEach(x=>cnt[Math.min(k-1, Math.floor((x-lo)/bw))]++);
      const ax = 34, aw = W-ax-10, h1 = H*.62, ay = 8, ah = h1-24, mx = Math.max(...cnt)*1.12;
      const X = v => ax+(v-lo)/(hi-lo)*aw, Y = v => ay+ah-v/mx*ah;
      U.axes(g,ax,ay+ah,ax+aw,ay,c);
      cnt.forEach((m,i)=>{ g.fillStyle = U.hatch(g,c.pen,5); g.fillRect(X(lo+i*bw),Y(m),aw/k,ay+ah-Y(m)); g.strokeStyle=c.ink; g.lineWidth=.9; g.strokeRect(X(lo+i*bw),Y(m),aw/k,ay+ah-Y(m)); });
      g.strokeStyle = c.stamp; g.lineWidth = 2; g.beginPath(); cnt.forEach((m,i)=>{ const x = X(lo+(i+.5)*bw); i?g.lineTo(x,Y(m)):g.moveTo(x,Y(m)); }); g.stroke();
      cnt.forEach((m,i)=>{ g.fillStyle=c.stamp; g.beginPath(); g.arc(X(lo+(i+.5)*bw),Y(m),3,0,7); g.fill(); });
      for (let i=0;i<=4;i++){ const v = lo+(hi-lo)*i/4; U.text(g,R(v,1),X(v),ay+ah+13,{size:10,align:'center',color:c.soft,kind:'mono'}); }
      const by = h1+6, bh = H-by-8; U.axes(g,ax,by+bh,ax+aw,by,c);
      g.strokeStyle = c.pen; g.lineWidth = 1.6; g.beginPath(); g.moveTo(ax,by+bh);
      xs.forEach((x,i)=>{ g.lineTo(X(x),by+bh-i/n*bh); g.lineTo(X(x),by+bh-(i+1)/n*bh); }); g.lineTo(ax+aw,by); g.stroke();
      U.text(g,'F*(x)',ax+6,by+12,{size:12,color:c.soft});
      const m = xs.reduce((a,b)=>a+b,0)/n, Dv = xs.reduce((s,x)=>s+(x-m)**2,0)/n, s = Math.sqrt(Dv);
      const m3 = xs.reduce((a,x)=>a+(x-m)**3,0)/n, m4 = xs.reduce((a,x)=>a+(x-m)**4,0)/n;
      const med = n%2 ? xs[(n-1)/2] : (xs[n/2-1]+xs[n/2])/2, mode = lo+(cnt.indexOf(Math.max(...cnt))+.5)*bw;
      out.innerHTML = `x̄ = <b>${R(m,3)}</b> · D<sub>в</sub> = ${R(Dv,3)} · s² = ${R(Dv*n/(n-1),3)} · σ = ${R(s,3)}<br>медиана = ${R(med,3)} · мода ≈ ${R(mode,2)} · aₛ = <span class="hot">${R(m3/s**3,2)}</span> · eₖ = ${R(m4/s**4-3,2)}`;
    }
    gen();
    return draw;
  }
});

/* 15. Корреляция и регрессия по выборке */
add({
  id:'tv15', title:'Корреляция и регрессия по выборке', src:'Гмурман, гл. 12',
  theory:`<p>Зависимость бывает <b>функциональной</b> (каждому x — одно y) и <b>статистической</b> (при изменении x меняется распределение Y). Если меняется условное среднее ȳₓ, связь называют <b>корреляционной</b>, а ȳₓ = f(x) — <b>уравнением регрессии</b> Y на X.</p>
  <h3>Метод наименьших квадратов</h3>
  <p>Прямую y = kx + b подбирают так, чтобы сумма квадратов отклонений Σ(yᵢ − kxᵢ − b)² была наименьшей:</p>
  <div class="f">k = ${fr('nΣxy − Σx·Σy','nΣx² − (Σx)²')}, &nbsp; b = ${fr('Σy − kΣx','n')}</div>
  <h3>Выборочный коэффициент корреляции</h3>
  <div class="f">r<sub>в</sub> = ${fr('Σnₓᵧxy − n·x̄·ȳ','n·σₓ·σᵧ')}, &nbsp; ȳₓ − ȳ = r<sub>в</sub>${fr('σᵧ','σₓ')}(x − x̄)<small>r<sub>в</sub> ${'σ'}ᵧ/σₓ — выборочный коэффициент регрессии Y на X. Аналогично x̄ᵧ − x̄ = r<sub>в</sub>(σₓ/σᵧ)(y − ȳ)</small></div>
  <p>Чем ближе |r<sub>в</sub>| к 1, тем теснее линейная связь. Значимость проверяют критерием T = r<sub>в</sub>√(n − 2)/√(1 − r<sub>в</sub>²) с k = n − 2 степенями свободы. Для <b>криволинейной</b> связи используют параболическую регрессию y = ax² + bx + c и корреляционное отношение η.</p>
  <h3>Ранговая корреляция</h3>
  <div class="f">ρ<sub>в</sub> = 1 − ${fr('6Σd²','n(n² − 1)')}, &nbsp; τ<sub>в</sub> = ${fr('4R','n(n − 1)')} − 1<small>Спирмен: d — разность рангов объекта; Кендалл: R — сумма чисел рангов, больших данного и стоящих правее него. Оба лежат в [−1; 1]</small></div>`,
  predict:{q:'Когда прямые регрессии Y на X и X на Y совпадают?', opts:['Всегда','Только при |r| = 1','Когда r = 0'], a:1,
    why:'Угол между прямыми тем меньше, чем больше |r|. При |r| = 1 связь строго линейная, и прямые сливаются. При r = 0 они перпендикулярны осям и друг другу.'},
  flap:`<p><b>Задача 542 (Спирмен).</b> Правильные ранги 1…13, испытуемый дал 6, 3, 4, 2, 1, 10, 7, 8, 9, 5, 11, 13, 12. Разности d: −5, −1, −1, 2, 4, −4, 0, 0, 0, 5, 0, −1, 1; Σd² = 90.</p>
  <p>ρ = 1 − 6·90/(13·168) = 1 − 540/2184 ≈ <b>0,75</b>.</p>
  <p><b>Кендалл</b> для тех же данных (задача 550): R = 60, τ = 4·60/(13·12) − 1 ≈ 0,54.</p>`,
  figCap:'Щёлкни по полю, чтобы добавить точку. Прямая — метод наименьших квадратов, её уравнение и r пересчитываются сразу.',
  try:'Поставь одну точку далеко от остальных — посмотри, как сильно один выброс тянет прямую.',
  ch:{q:'Задача 542. Правильные ранги 1, 2, …, 13; ранги испытуемого: 6, 3, 4, 2, 1, 10, 7, 8, 9, 5, 11, 13, 12. Найдите коэффициент ранговой корреляции Спирмена.', check:s=>U.near(s,0.7527,0.006), ans:'≈ 0,75', hint:'Найди Σd², затем ρ = 1 − 6Σd²/(n(n² − 1)), n = 13.'},
  fig(el){
    const preset = [[1,2.1],[2,2.9],[3,3.2],[4,4.8],[5,5.1],[6,6.3],[7,6.8],[8,8.4],[9,8.9],[10,10.2]];
    let pts = preset.map(p=>[...p]);
    el.append(h('div',{class:'row'}, U.btn('Пример', ()=>{ pts = preset.map(p=>[...p]); draw(); }), U.btn('Очистить', ()=>{ pts = []; draw(); }), U.btn('Убрать последнюю', ()=>{ pts.pop(); draw(); })));
    const cv = U.canvas(el, .7), out = h('div',{class:'readout'}); el.append(out);
    const V = 12, ax = 30, pad = 10;
    cv.cv.style.cursor = 'crosshair';
    cv.cv.addEventListener('click', e => { const rc = cv.cv.getBoundingClientRect(), W = rc.width, H = rc.height;
      const x = (e.clientX-rc.left-ax)/(W-ax-pad)*V, y = (H-24-(e.clientY-rc.top))/(H-24-pad)*V; if (x>=0&&y>=0&&x<=V&&y<=V){ pts.push([x,y]); draw(); } });
    function draw(){
      const {g,W,H} = cv.fit(), c = U.col(), X = x => ax+x/V*(W-ax-pad), Y = y => H-24-y/V*(H-24-pad);
      U.axes(g,ax,H-24,W-pad,pad,c);
      for (let v=0;v<=V;v+=2){ U.text(g,v,X(v),H-10,{size:10,align:'center',color:c.soft,kind:'mono'}); U.text(g,v,ax-6,Y(v)+4,{size:10,align:'right',color:c.soft,kind:'mono'}); }
      pts.forEach(([x,y])=>{ g.fillStyle=c.stamp; g.beginPath(); g.arc(X(x),Y(y),4.5,0,7); g.fill(); });
      const n = pts.length;
      if (n < 2){ out.innerHTML = 'Добавь хотя бы две точки щелчком по полю.'; return; }
      const sx = pts.reduce((s,p)=>s+p[0],0), sy = pts.reduce((s,p)=>s+p[1],0), sxy = pts.reduce((s,p)=>s+p[0]*p[1],0), sxx = pts.reduce((s,p)=>s+p[0]*p[0],0), syy = pts.reduce((s,p)=>s+p[1]*p[1],0);
      const den = n*sxx - sx*sx; if (!den){ out.innerHTML = 'Все точки на одной вертикали — прямую не провести.'; return; }
      const k = (n*sxy - sx*sy)/den, b = (sy - k*sx)/n, r = (n*sxy - sx*sy)/Math.sqrt(den*(n*syy - sy*sy) || 1);
      g.save(); g.shadowColor = c.glow; g.shadowBlur = 8; g.strokeStyle = c.pen; g.lineWidth = 2.5; g.beginPath(); g.moveTo(X(0),Y(b)); g.lineTo(X(V),Y(k*V+b)); g.stroke(); g.restore();
      pts.forEach(([x,y])=>{ g.strokeStyle = c.soft; g.setLineDash([2,3]); g.beginPath(); g.moveTo(X(x),Y(y)); g.lineTo(X(x),Y(k*x+b)); g.stroke(); g.setLineDash([]); });
      out.innerHTML = `n = ${n} · y = <b>${R(k,3)}x ${b<0?'−':'+'} ${R(Math.abs(b),3)}</b> · r = <span class="hot">${R(r,3)}</span>${n>2&&Math.abs(r)<1?` · T = ${R(r*Math.sqrt(n-2)/Math.sqrt(1-r*r),2)}`:''}`;
    }
    return draw;
  }
});

/* 16. Сравнение средних и дисперсий */
add({
  id:'tv16', title:'Сравнение средних и дисперсий', src:'Гмурман, гл. 13 §2–8',
  theory:`<p>Порядок проверки любой гипотезы: 1) сформулировать H₀ и H₁; 2) выбрать уровень значимости α; 3) вычислить наблюдаемое значение критерия; 4) по таблице найти критическую точку; 5) сравнить.</p>
  <p>Вид критической области задаёт H₁: при H₁: a ≠ a₀ — <b>двусторонняя</b>, Φ(u<sub>кр</sub>) = (1 − α)/2; при H₁: a &gt; a₀ — <b>правосторонняя</b>, Φ(u<sub>кр</sub>) = (1 − 2α)/2. При α = 0,05 это 1,96 и 1,645.</p>
  <h3>Две дисперсии — критерий Фишера — Снедекора</h3>
  <div class="f">F = ${fr('s²<sub>б</sub>','s²<sub>м</sub>')}, &nbsp; k₁ = n₁ − 1, k₂ = n₂ − 1<small>большая исправленная дисперсия делится на меньшую; при F &lt; F<sub>кр</sub>(α; k₁; k₂) различие незначимо</small></div>
  <h3>Две средние</h3>
  <div class="f">Z = ${fr('x̄ − ȳ','√(D(X)/n + D(Y)/m)')}<small>генеральные дисперсии известны (или выборки большие, тогда вместо D берут s²)</small></div>
  <div class="f">T = ${fr('x̄ − ȳ','√[((n−1)sₓ² + (m−1)sᵧ²)/(n+m−2)] · √(1/n + 1/m)')}, &nbsp; k = n + m − 2<small>малые выборки, дисперсии неизвестны, но равны (сначала проверяют это по F)</small></div>
  <h3>Средняя и гипотетическое значение a₀</h3>
  <div class="f">U = ${fr('(x̄ − a₀)√n','σ')} &nbsp; (σ известна), &nbsp; T = ${fr('(x̄ − a₀)√n','s')}, k = n − 1</div>
  <h3>Частота и вероятность p₀</h3>
  <div class="f">U = ${fr('(m/n − p₀)√n','√(p₀q₀)')}</div>
  <p>Исправленная дисперсия и гипотетическая σ₀²: χ² = (n − 1)s²/σ₀² с k = n − 1 (глава 15).</p>`,
  predict:{q:'Нужна двусторонняя критическая область, α = 0,05. Чему равно u<sub>кр</sub>?', opts:['1,645','1,96','2,58'], a:1,
    why:'Φ(u<sub>кр</sub>) = (1 − 0,05)/2 = 0,475 → u<sub>кр</sub> = 1,96. Число 1,645 — для односторонней области, 2,58 — для двусторонней при α = 0,01.'},
  flap:`<p><b>Задача 569.</b> n = m = 50, x̄ = 20,1, ȳ = 19,8, D(X) = 1,750, D(Y) = 1,375. Z = 0,3/√(0,035 + 0,0275) = 0,3/0,25 = <b>1,2</b>.</p>
  <p>H₁: M(X) ≠ M(Y) — область двусторонняя, z<sub>кр</sub> = 1,96. |1,2| &lt; 1,96 — нет оснований отвергнуть H₀: средние различаются незначимо.</p>`,
  figCap:'Распределение критерия при верной H₀. Заштрихована критическая область, светится наблюдаемое значение.',
  try:'Переключи область на правостороннюю: та же Z может перейти из «принять» в «отвергнуть».',
  ch:{q:'Задача 569. n = m = 50, x̄ = 20,1 мм, ȳ = 19,8 мм, D(X) = 1,750 мм², D(Y) = 1,375 мм². Найдите Z<sub>набл</sub>.', check:s=>U.near(s,1.2,0.005), ans:'1,2 (&lt; 1,96 — средние различаются незначимо)', hint:'Z = (x̄ − ȳ)/√(D(X)/n + D(Y)/m).'},
  fig(el){
    let z = 1.2, al = .05, side = 2;
    const sz = U.slider('tv16-z','Z набл',-4,4,.05,z,v=>R(v,2),v=>{z=v; draw();});
    const bA = U.select('tv16-a',['α = 0,05','α = 0,01','α = 0,10'], v=>{al=[.05,.01,.1][v]; draw();});
    const bS = U.select('tv16-s',['двусторонняя (a ≠ a₀)','правосторонняя (a > a₀)','левосторонняя (a < a₀)'], v=>{side=[2,1,-1][v]; draw();});
    el.append(h('div',{class:'ctls'}, sz), h('div',{class:'row'}, bA, bS));
    const cv = U.canvas(el, .5), out = h('div',{class:'readout'}); el.append(out);
    function draw(){
      const {g,W,H} = cv.fit(), c = U.col();
      const uk = side===2 ? U.PhiInv((1-al)/2) : U.PhiInv((1-2*al)/2);
      const X = v => 20+(v+4)/8*(W-40), Y = v => H-24-v/.42*(H-36);
      const reg = v => side===2 ? Math.abs(v)>uk : side===1 ? v>uk : v<-uk;
      g.fillStyle = U.hatch(g,c.bad,4); g.beginPath();
      for (let v=-4; v<=4; v+=.02) if (reg(v)){ g.rect(X(v),Y(U.phi(v)),X(v+.02)-X(v)+.5,Y(0)-Y(U.phi(v))); } g.fill();
      g.strokeStyle = c.ink; g.lineWidth = 2; g.beginPath(); for (let v=-4; v<=4; v+=.02){ v>-4 ? g.lineTo(X(v),Y(U.phi(v))) : g.moveTo(X(v),Y(U.phi(v))); } g.stroke();
      g.beginPath(); g.moveTo(X(-4),Y(0)); g.lineTo(X(4),Y(0)); g.stroke();
      for (let v=-4; v<=4; v++) U.text(g,v,X(v),H-8,{size:10,align:'center',color:c.soft,kind:'mono'});
      g.save(); g.shadowColor=c.glow; g.shadowBlur=12; g.strokeStyle=c.glow; g.lineWidth=3; g.beginPath(); g.moveTo(X(z),Y(0)); g.lineTo(X(z),Y(.42)); g.stroke(); g.restore();
      const rej = reg(z);
      out.innerHTML = `u<sub>кр</sub> = ${side===2?'±':side<0?'−':''}${R(uk,3)} · Z<sub>набл</sub> = <b>${R(z,2)}</b> → ${rej?'<span class="bad">попадает в критическую область — H₀ отвергаем</span>':'<span class="good">вне критической области — нет оснований отвергнуть H₀</span>'}`;
    }
    return draw;
  }
});

/* 17. Однофакторный дисперсионный анализ */
add({
  id:'tv17', title:'Однофакторный дисперсионный анализ', src:'Гмурман, гл. 14',
  theory:`<p>Фактор F (сорт удобрения, станок, метод обучения) принимает p уровней, на каждом проведено q испытаний. Вопрос: влияет ли фактор на результат, то есть различаются ли <b>групповые средние</b> x̄<sub>гр j</sub> значимо?</p>
  <div class="f">S<sub>общ</sub> = S<sub>факт</sub> + S<sub>ост</sub><small>S<sub>общ</sub> = Σ(xᵢⱼ − x̄)² — общий разброс; S<sub>факт</sub> = qΣ(x̄<sub>гр j</sub> − x̄)² — разброс между группами (влияние фактора); S<sub>ост</sub> = Σ(xᵢⱼ − x̄<sub>гр j</sub>)² — разброс внутри групп (случайность)</small></div>
  <div class="f">s²<sub>факт</sub> = ${fr('S<sub>факт</sub>','p − 1')}, &nbsp; s²<sub>ост</sub> = ${fr('S<sub>ост</sub>','p(q − 1)')}, &nbsp; F = ${fr('s²<sub>факт</sub>','s²<sub>ост</sub>')}</div>
  <p>F сравнивают с F<sub>кр</sub>(α; p − 1; p(q − 1)) по таблице Фишера — Снедекора. Если F &lt; F<sub>кр</sub>, групповые средние различаются незначимо: влияние фактора не доказано.</p>
  <p>Предполагается, что данные на каждом уровне нормальны с одинаковой дисперсией. Для удобства из всех xᵢⱼ можно вычесть одно число C (условные варианты yᵢⱼ = xᵢⱼ − C) — суммы квадратов не изменятся.</p>
  <p>При разном числе испытаний qⱼ на уровнях S<sub>факт</sub> = Σ qⱼ(x̄<sub>гр j</sub> − x̄)², а s²<sub>ост</sub> = S<sub>ост</sub>/(n − p).</p>`,
  predict:{q:'Фактор на самом деле не влияет. Каким обычно получается F<sub>набл</sub>?', opts:['Около 1','Около 0','Очень большим'], a:0,
    why:'Если фактора нет, s²<sub>факт</sub> и s²<sub>ост</sub> оценивают одну и ту же дисперсию, и их отношение колеблется около 1. Большое F означает, что группы расходятся сильнее, чем позволяет случайность.'},
  flap:`<p><b>Задача 671.</b> Три уровня по 4 испытания. F₁: 35, 32, 31, 30 (x̄ = 32); F₂: 30, 24, 26, 20 (x̄ = 25); F₃: 21, 22, 34, 31 (x̄ = 27). Общая средняя 28.</p>
  <p>S<sub>факт</sub> = 4·(4² + 3² + 1²) = 104; S<sub>ост</sub> = 14 + 52 + 126 = 192; S<sub>общ</sub> = 296.</p>
  <p>s²<sub>факт</sub> = 104/2 = 52; s²<sub>ост</sub> = 192/9 ≈ 21,3; F = 52/21,3 ≈ <b>2,44</b> &lt; F<sub>кр</sub>(0,05; 2; 9) = 4,26 — нет оснований отвергнуть гипотезу о равенстве групповых средних.</p>`,
  figCap:'Три группы по 4 испытания. Длинные штрихи — групповые средние, пунктир — общая средняя. Внизу — какую часть разброса объясняет фактор.',
  try:'Нажми «Данные задачи 671», потом двигай «влияние фактора», пока F не перейдёт за 4,26.',
  ch:{q:'Задача 671. Уровень F₁: 35, 32, 31, 30; F₂: 30, 24, 26, 20; F₃: 21, 22, 34, 31. Найдите F<sub>набл</sub>.', check:s=>U.near(s,2.4375,0.02), ans:'≈ 2,44 (&lt; 4,26 — влияние фактора незначимо)', hint:'s²<sub>факт</sub> = S<sub>факт</sub>/(p − 1), s²<sub>ост</sub> = S<sub>ост</sub>/(p(q − 1)), p = 3, q = 4.'},
  fig(el){
    const T671 = [[35,32,31,30],[30,24,26,20],[21,22,34,31]];
    let data = T671.map(r=>[...r]), eff = 0;
    const se = U.slider('tv17-e','влияние фактора',0,10,.5,eff,v=>R(v,1),v=>{eff=v; draw();});
    el.append(h('div',{class:'ctls'}, se), h('div',{class:'row'}, U.btn('Данные задачи 671', ()=>{ data = T671.map(r=>[...r]); eff = 0; se.set(0); draw(); }),
      U.btn('Случайные данные', ()=>{ data = [0,1,2].map(()=>Array.from({length:4},()=>Math.round(28+4*U.gauss()))); draw(); })));
    const cv = U.canvas(el, .66), out = h('div',{class:'readout'}); el.append(out);
    function draw(){
      const {g,W,H} = cv.fit(), c = U.col();
      const D = data.map((r,j)=>r.map(x=>x+(j-1)*eff)), p = 3, q = 4, all = D.flat(), gm = all.reduce((a,b)=>a+b,0)/all.length;
      const means = D.map(r=>r.reduce((a,b)=>a+b,0)/q);
      const Sf = q*means.reduce((s,m)=>s+(m-gm)**2,0), So = D.reduce((s,r,j)=>s+r.reduce((t,x)=>t+(x-means[j])**2,0),0), F = So ? (Sf/(p-1))/(So/(p*(q-1))) : Infinity;
      const lo = Math.min(...all)-3, hi = Math.max(...all)+3, top = 10, bot = H*.72, Y = v => bot-(v-lo)/(hi-lo)*(bot-top), cw = (W-60)/3;
      g.setLineDash([6,4]); g.strokeStyle=c.soft; g.beginPath(); g.moveTo(40,Y(gm)); g.lineTo(W-10,Y(gm)); g.stroke(); g.setLineDash([]);
      U.text(g,'x̄ = '+R(gm,1),W-12,Y(gm)-5,{size:11,align:'right',color:c.soft,kind:'mono'});
      D.forEach((r,j)=>{ const cx = 50+cw*j+cw/2;
        g.strokeStyle=c.pen; g.lineWidth=3; g.beginPath(); g.moveTo(cx-cw*.32,Y(means[j])); g.lineTo(cx+cw*.32,Y(means[j])); g.stroke();
        r.forEach((x,i)=>{ const px = cx+(i-1.5)*cw*.15; g.strokeStyle=c.soft; g.lineWidth=1; g.beginPath(); g.moveTo(px,Y(x)); g.lineTo(px,Y(means[j])); g.stroke(); g.fillStyle=c.stamp; g.beginPath(); g.arc(px,Y(x),4,0,7); g.fill(); });
        U.text(g,'F'+(j+1),cx,bot+16,{size:13,align:'center',w:600}); });
      const by = bot+28, bw = W-60, tot = Sf+So || 1;
      g.fillStyle = c.pen; g.fillRect(40,by,bw*Sf/tot,14); g.fillStyle = U.hatch(g,c.soft,4); g.fillRect(40+bw*Sf/tot,by,bw*So/tot,14); g.strokeStyle=c.ink; g.strokeRect(40,by,bw,14);
      U.text(g,`фактор ${R(Sf/tot*100,0)}%`,40,by+30,{size:11,color:c.pen,kind:'mono'}); U.text(g,`случайность ${R(So/tot*100,0)}%`,40+bw,by+30,{size:11,align:'right',color:c.soft,kind:'mono'});
      out.innerHTML = `S<sub>факт</sub> = ${R(Sf,1)} · S<sub>ост</sub> = ${R(So,1)} · s²<sub>факт</sub> = ${R(Sf/2,2)} · s²<sub>ост</sub> = ${R(So/9,2)}<br>F = <b>${R(F,2)}</b> ${F<4.26?'<span class="good">&lt; 4,26 — влияние фактора незначимо</span>':'<span class="bad">&gt; 4,26 — фактор влияет значимо</span>'}`;
    }
    return draw;
  }
});

/* 18. Метод Монте-Карло */
add({
  id:'tv18', title:'Метод Монте-Карло: моделирование случайных величин', src:'Гмурман, гл. 15',
  theory:`<p><b>Метод Монте-Карло</b> (метод статистических испытаний): искомую величину представляют как математическое ожидание некоторой случайной величины, разыгрывают её много раз и берут среднее. Нужны <b>случайные числа</b> r, равномерно распределённые на [0; 1).</p>
  <h3>Разыгрывание дискретной величины</h3>
  <p>Отрезок [0; 1) делят на части длиной p₁, p₂, …; если r попало в i-ю часть, X = xᵢ. Так же разыгрывают полную группу событий.</p>
  <h3>Разыгрывание непрерывной величины</h3>
  <div class="f">F(x) = r, &nbsp; x = F⁻¹(r)<small>метод обратных функций. Для равномерного закона на (a; b): x = a + (b − a)r; для показательного: x = −(ln r)/λ</small></div>
  <div class="f">x ≈ σ·(r₁ + r₂ + … + r₁₂ − 6) + a<small>приближённое разыгрывание нормального закона N(a; σ): сумма 12 случайных чисел имеет M = 6 и D = 1</small></div>
  <h3>Вычисление интегралов</h3>
  <div class="f">∫<sub>a</sub><sup>b</sup> φ(x)dx ≈ (b − a)·${fr('1','n')}Σφ(xᵢ), &nbsp; xᵢ = a + (b − a)rᵢ</div>
  <p>Погрешность метода убывает как σ/√n: чтобы уменьшить ошибку в 10 раз, испытаний нужно в 100 раз больше. Зато метод не боится многомерных интегралов и сложных систем: им оценивают надёжность схем и работу систем массового обслуживания.</p>`,
  predict:{q:'Чтобы уменьшить погрешность метода Монте-Карло в 10 раз, испытаний нужно в…', opts:['10 раз больше','100 раз больше','1000 раз больше'], a:1,
    why:'Погрешность ∼ 1/√n. Уменьшить её в 10 раз — значит увеличить √n в 10 раз, то есть n в 100 раз.'},
  flap:`<p><b>Задача 680.</b> X: 3, 8, 12, 23 с вероятностями 0,22; 0,12; 0,43; 0,23. Делим [0; 1): [0; 0,22) → 3, [0,22; 0,34) → 8, [0,34; 0,77) → 12, [0,77; 1) → 23.</p>
  <p>Числа 0,33; 0,18; 0,51; 0,62; 0,32; 0,41; 0,94; 0,15 дают 8, 3, 12, 12, 8, 12, 23, 3.</p>
  <p><b>Задача 690.</b> X равномерна на (4; 14): x = 4 + 10r. Для r = 0,74; 0,02; 0,94; 0,36 получаем 11,4; 4,2; 13,4; 7,6.</p>`,
  figCap:'Случайные точки в квадрате. Доля точек под кривой, умноженная на площадь квадрата, оценивает интеграл.',
  try:'Выбери «четверть круга → π» и увеличивай n: оценка π сходится, но медленно.',
  ch:{q:'Задача 680. X: 3, 8, 12, 23 с вероятностями 0,22; 0,12; 0,43; 0,23. Какое значение X разыграется по случайному числу r = 0,33?', check:s=>U.near(s,8,0), ans:'8', hint:'Накопленные границы: 0,22; 0,34; 0,77; 1.'},
  fig(el){
    let fn = 0, n = 2000, pts = [];
    const FN = [{n:'четверть круга → π', f:x=>Math.sqrt(1-x*x), k:4, ex:Math.PI, ymax:1}, {n:'∫₀¹ x² dx = 1/3', f:x=>x*x, k:1, ex:1/3, ymax:1}, {n:'∫₀¹ eˣ dx = e − 1', f:x=>Math.exp(x), k:1, ex:Math.E-1, ymax:Math.E}];
    const gen = () => { pts = Array.from({length:n},()=>[Math.random(),Math.random()]); draw(); };
    el.append(h('div',{class:'row'}, U.select('tv18-f', FN.map(f=>f.n), v=>{fn=v; draw();}), U.btn('Бросить заново', gen)),
      h('div',{class:'ctls'}, U.slider('tv18-n','n',100,30000,100,n,null,v=>{n=v; gen();})));
    const cv = U.canvas(el, w=>w<420?.95:.62), out = h('div',{class:'readout'}); el.append(out);
    function draw(){
      if (!pts.length) return;
      const {g,W,H} = cv.fit(), c = U.col(), F = FN[fn], s = Math.min(W-40, H-30), ox = (W-s)/2, oy = 8;
      const X = x => ox+x*s, Y = y => oy+s-y/F.ymax*s;
      let inn = 0; const show = Math.min(pts.length, 4000);
      pts.forEach(([x,y],i)=>{ const yy = y*F.ymax, ok = yy <= F.f(x); if (ok) inn++; if (i<show){ g.fillStyle = ok ? c.pen : c.soft; g.globalAlpha = ok ? .7 : .35; g.fillRect(X(x)-1,Y(yy)-1,2.2,2.2); } });
      g.globalAlpha = 1; g.strokeStyle = c.ink; g.lineWidth = 1.4; g.strokeRect(ox,oy,s,s);
      g.save(); g.shadowColor = c.glow; g.shadowBlur = 8; g.strokeStyle = c.stamp; g.lineWidth = 2.5; g.beginPath();
      for (let i=0;i<=200;i++){ const x = i/200; i?g.lineTo(X(x),Y(F.f(x))):g.moveTo(X(x),Y(F.f(x))); } g.stroke(); g.restore();
      const est = inn/pts.length*F.ymax*F.k;
      out.innerHTML = `под кривой ${inn} из ${pts.length} · оценка = <b>${R(est,4)}</b> · точно ${R(F.ex,4)} · ошибка <span class="hot">${R(Math.abs(est-F.ex),4)}</span> (порядка ${R(F.ymax*F.k/Math.sqrt(pts.length),3)})`;
    }
    gen();
    return draw;
  }
});

/* 19. Случайные функции */
add({
  id:'tv19', title:'Случайные функции и стационарные процессы', src:'Гмурман, гл. 16–17',
  theory:`<p><b>Случайная функция</b> X(t) — функция, значение которой при каждом фиксированном t является случайной величиной (<b>сечением</b>). Конкретный вид X(t), полученный в опыте, — <b>реализация</b> (траектория). Если t — время, X(t) называют <b>случайным процессом</b>.</p>
  <div class="f">mₓ(t) = M[X(t)], &nbsp; Dₓ(t) = D[X(t)], &nbsp; Kₓ(t₁, t₂) = M[(X(t₁) − mₓ(t₁))(X(t₂) − mₓ(t₂))]<small>математическое ожидание — «средняя траектория», корреляционная функция — связь двух сечений; Kₓ(t, t) = Dₓ(t), Kₓ(t₁, t₂) = Kₓ(t₂, t₁)</small></div>
  <p>Нормированная корреляционная функция ρₓ = Kₓ(t₁, t₂)/(σₓ(t₁)σₓ(t₂)). Прибавление неслучайной функции не меняет Kₓ; при Y(t) = φ(t)X(t) получаем K<sub>Y</sub> = φ(t₁)φ(t₂)Kₓ(t₁, t₂).</p>
  <p><b>Производная и интеграл:</b> m<sub>X′</sub> = mₓ′(t), K<sub>X′</sub> = ∂²Kₓ/∂t₁∂t₂; m<sub>∫X</sub> = ∫mₓ(s)ds, K<sub>∫X</sub> = ∬Kₓ(s₁, s₂)ds₁ds₂.</p>
  <h3>Стационарные функции</h3>
  <div class="f">mₓ = const, &nbsp; Kₓ(t₁, t₂) = kₓ(τ), τ = t₂ − t₁<small>стационарность в широком смысле. kₓ(τ) чётная, |kₓ(τ)| ≤ kₓ(0) = Dₓ</small></div>
  <p><b>Эргодическая</b> стационарная функция: характеристики можно получить по одной длинной реализации, усредняя по времени. Достаточное условие — kₓ(τ) → 0 при τ → ∞.</p>
  <h3>Спектральная плотность</h3>
  <div class="f">sₓ(ω) = ${fr('1','π')}∫₀<sup>∞</sup>kₓ(τ)cos ωτ dτ, &nbsp; kₓ(τ) = ∫₀<sup>∞</sup>sₓ(ω)cos ωτ dω, &nbsp; Dₓ = ∫₀<sup>∞</sup>sₓ(ω)dω<small>теорема Винера — Хинчина: корреляционная функция и спектр — пара преобразований Фурье. При прохождении через линейную систему sᵧ(ω) = |Φ(iω)|²·sₓ(ω)</small></div>`,
  predict:{q:'X(t) = U·sin t + V·cos t, где U и V некоррелированы, M(U) = M(V) = 0, D(U) = D(V) = D. Стационарна ли X(t)?', opts:['Да','Нет: дисперсия зависит от t','Только при t = 0'], a:0,
    why:'mₓ = 0, а Kₓ = D(sin t₁ sin t₂ + cos t₁ cos t₂) = D·cos(t₂ − t₁) зависит только от τ. Дисперсия Dₓ(t) = D постоянна. Это задача 835 Гмурмана.'},
  flap:`<p><b>Задача 759.</b> X(t) = U·eᵗ, M(U) = 5: mₓ(t) = M(U)·eᵗ = 5eᵗ — неслучайный множитель выносится за знак M.</p>
  <p><b>Задача 761а.</b> X(t) = U·t² + 2t + 1, M(U) = 1: mₓ(t) = t² + 2t + 1 = (t + 1)².</p>
  <p><b>Задача 835.</b> X(t) = U sin t + V cos t: mₓ = 0, Kₓ = D cos(t₂ − t₁) — функция стационарна.</p>`,
  figCap:'Десять реализаций случайной функции. Сплошная линия — математическое ожидание mₓ(t), полоса — mₓ ± σₓ.',
  try:'Сравни стационарную функцию (полоса постоянной ширины) с нестационарной (полоса расширяется).',
  ch:{q:'Задача 761а. X(t) = U·t² + 2t + 1, где M(U) = 1. Найдите mₓ(2).', check:s=>U.near(s,9,0.001), ans:'9 (mₓ(t) = (t + 1)²)', hint:'mₓ(t) = M(U)·t² + 2t + 1.'},
  fig(el){
    let kind = 0, seed = [];
    const K = [
      {n:'U sin t + V cos t — стационарна', gen:()=>{ const u=U.gauss(), v=U.gauss(); return t=>u*Math.sin(t)+v*Math.cos(t); }, m:()=>0, s:()=>1, lo:-3.2, hi:3.2},
      {n:'U t² + 2t + 1 — нестационарна', gen:()=>{ const u=1+.5*U.gauss(); return t=>u*t*t+2*t+1; }, m:t=>(t+1)**2, s:t=>.5*t*t, lo:-2, hi:30},
      {n:'шум с затухающей корреляцией', gen:()=>{ const pts=[]; let x=U.gauss(); for(let i=0;i<=200;i++){ pts.push(x); x = .9*x + Math.sqrt(1-.81)*U.gauss(); } return t=>pts[Math.round(t/4*200)]; }, m:()=>0, s:()=>1, lo:-3.2, hi:3.2}];
    const gen = () => { seed = Array.from({length:10},()=>K[kind].gen()); draw(); };
    el.append(h('div',{class:'row'}, U.select('tv19-k', K.map(k=>k.n), v=>{kind=v; gen();}), U.btn('Новые реализации', gen)));
    const cv = U.canvas(el, .6), out = h('div',{class:'readout'}); el.append(out);
    function draw(){
      if (!seed.length) return;
      const {g,W,H} = cv.fit(), c = U.col(), k = K[kind], T = 4;
      const X = t => 34+t/T*(W-44), Y = v => 10+(k.hi-v)/(k.hi-k.lo)*(H-34);
      U.axes(g,34,H-24,W-10,10,c);
      g.fillStyle = c.wash; g.beginPath();
      for (let i=0;i<=100;i++){ const t = i/100*T; g.lineTo(X(t),Y(k.m(t)+k.s(t))); } for (let i=100;i>=0;i--){ const t = i/100*T; g.lineTo(X(t),Y(k.m(t)-k.s(t))); } g.fill();
      seed.forEach((f,j)=>{ g.strokeStyle = j%2 ? c.stamp : c.soft; g.globalAlpha = .7; g.lineWidth = 1.2; g.beginPath(); for (let i=0;i<=200;i++){ const t = i/200*T; i?g.lineTo(X(t),Y(f(t))):g.moveTo(X(t),Y(f(t))); } g.stroke(); });
      g.globalAlpha = 1; g.strokeStyle = c.pen; g.lineWidth = 3; g.beginPath(); for (let i=0;i<=100;i++){ const t = i/100*T; i?g.lineTo(X(t),Y(k.m(t))):g.moveTo(X(t),Y(k.m(t))); } g.stroke();
      for (let t=0;t<=T;t++) U.text(g,'t='+t,X(t),H-8,{size:10,align:'center',color:c.soft,kind:'mono'});
      out.innerHTML = kind===1 ? 'mₓ(t) = (t + 1)², σₓ(t) растёт как t² — <span class="bad">нестационарна</span>' : kind===0 ? 'mₓ = 0, kₓ(τ) = D·cos τ — <span class="good">стационарна</span> (полоса постоянной ширины)' : 'mₓ = 0, kₓ(τ) ≈ D·e<sup>−α|τ|</sup> — <span class="good">стационарна и эргодична</span>: соседние значения похожи, далёкие независимы';
    }
    gen();
    return draw;
  }
});

/* Дополнительные задачи к новым главам (ответы сверены с разделом «Ответы» Гмурмана) */
const MORE = {
  tv12: [
    P(374,'X: значения 3, 6, 10 с вероятностями 0,2; 0,1; 0,7. Составьте закон распределения Y = 2X + 1 и впишите значение, которое Y принимает с вероятностью 0,7.',21,0,'21 (закон Y: 7, 13, 21 с вероятностями 0,2; 0,1; 0,7)','Подставь каждое xᵢ в 2x + 1.'),
    P(376,'X: значения π/4, π/2, 3π/4 с вероятностями 0,2; 0,7; 0,1. Найдите вероятность того, что Y = sin X примет значение √2/2.',.3,.0005,'0,3 (sin π/4 = sin 3π/4 = √2/2, вероятности складываются)','Два разных x дают одно y.'),
    P('401а','X: 10, 12, 16 с вероятностями 0,4; 0,1; 0,5; Y: 1, 2 с вероятностями 0,2; 0,8; X и Y независимы. Найдите P(X + Y = 12).',.32,.0005,'0,32','12 = 10 + 2 — единственная пара; P = 0,4·0,8.')],
  tv13: [
    P('409а','Двумерная (X, Y): X ∈ {26, 30, 41, 50}; строка Y = 2,3: 0,05; 0,12; 0,08; 0,04; строка Y = 2,7: 0,09; 0,30; 0,11; 0,21. Найдите P(X = 30).',.42,.0005,'0,42','Сумма по столбцу X = 30.'),
    P('409б','По той же таблице найдите P(Y = 2,7).',.71,.0005,'0,71','Сумма по строке.'),
    P('422б','По таблице задачи 422 найдите P(Y = 18 | X = 6).',13/28,.003,'13/28 ≈ 0,464','P(X = 6) = 0,10 + 0,05 + 0,13 = 0,28.')],
  tv14: [
    P('524а','По той же выборке (варианты 18,6…20,6, частоты 4, 6, 30, 40, 18, 2) найдите выборочную дисперсию.',.169,.0015,'≈ 0,169','D = h²[M*(u²) − (M*(u))²], h = 0,4.'),
    P('530в','Варианты 12, 14, 16, 18, 20, 22 с частотами 5, 15, 50, 16, 10, 4 (n = 100). Найдите выборочную дисперсию.',4.8684,.006,'≈ 4,87 (x̄ = 16,46)','D = Σnᵢxᵢ²/n − x̄².'),
    P(526,'Выборка разбита на интервалы длины h = 12, выборочная дисперсия середин интервалов D<sub>в</sub> = 52,4. Найдите дисперсию с поправкой Шеппарда.',40.4,.01,'40,4','D′ = D<sub>в</sub> − h²/12.')],
  tv15: [
    P(549,'Два контролёра расположили 10 деталей по качеству. Ранги первого: 1, 2, …, 10; второго: 1, 2, 4, 3, 6, 5, 7, 10, 9, 8. Найдите коэффициент Кендалла.',.7778,.006,'≈ 0,78 — оценки согласуются','R — сумма чисел рангов, больших данного и стоящих правее: 9 + 8 + 6 + 6 + 4 + 4 + 3 + 0 + 0 + 0.'),
    P(550,'Найдите коэффициент Кендалла по условию задачи 542 (ранги испытуемого 6, 3, 4, 2, 1, 10, 7, 8, 9, 5, 11, 13, 12).',.5385,.006,'≈ 0,54','R = 60, τ = 4R/(n(n − 1)) − 1.')],
  tv16: [
    P('575а','σ = 40, n = 64, x̄ = 136,5. Проверяется H₀: a = 130 при H₁: a ≠ 130, α = 0,01. Найдите U<sub>набл</sub>.',1.3,.005,'1,3 &lt; 2,57 — нет оснований отвергнуть H₀','U = (x̄ − a₀)√n/σ.'),
    P(590,'Вероятность заказа по каталогу 0,08. Разослали 1000 каталогов новой формы, получили 100 заказов. Найдите U<sub>набл</sub> для H₀: p = 0,08 при H₁: p &gt; 0,08.',2.331,.01,'≈ 2,33 &gt; 1,645 — новая форма значимо эффективнее','U = (m/n − p₀)√n/√(p₀q₀).')],
  tv17: [
    P('671а','По данным задачи 671 найдите факторную сумму квадратов S<sub>факт</sub>.',104,.01,'104','q·Σ(x̄<sub>гр</sub> − x̄)², общая средняя 28.'),
    P('671б','По данным задачи 671 найдите остаточную дисперсию s²<sub>ост</sub>.',192/9,.02,'≈ 21,3 (S<sub>ост</sub> = 192)','S<sub>ост</sub>/(p(q − 1)) = S<sub>ост</sub>/9.')],
  tv18: [
    P('690а','X равномерна на (4; 14). Разыграйте значение X по случайному числу r = 0,74.',11.4,.005,'11,4','x = a + (b − a)r.'),
    P('690б','То же для r = 0,02.',4.2,.005,'4,2','x = 4 + 10r.'),
    P('696','По формуле задачи 696 (показательный закон, x = −(ln r)/λ) разыграйте значение при λ = 0,1 и r = 0,1.',23.026,.02,'≈ 23,03','ln 0,1 ≈ −2,3026.')],
  tv19: [
    P(759,'X(t) = U·eᵗ, M(U) = 5. Найдите mₓ(1).',5*Math.E,.01,'5e ≈ 13,59','Неслучайный множитель выносится за знак M.'),
    P(835,'X(t) = U sin t + V cos t, U и V некоррелированы, M = 0, D(U) = D(V) = 4. Найдите Dₓ(t).',4,.001,'4 — не зависит от t, функция стационарна','Kₓ(t, t) = D·cos 0.')]
};
for (const L of BOOKS.tv.lessons) if (MORE[L.id]) L.more = MORE[L.id];

/* Истории для новых глав */
const HOOK = {
  tv12:{eye:'Ловушка среднего', title:'Средняя сторона 1, а средняя площадь — нет', html:`<p>Сторона квадрата случайна и равномерно распределена от 0 до 2. Средняя сторона равна 1. Какова средняя площадь? Хочется сказать «1». Но</p><p class="big">M(X²) = 4/3</p><p>Среднее от функции не равно функции от среднего. На этой ошибке «проваливаются» прогнозы спроса, расчёты рисков и даже оценки времени в пути. Эта глава учит считать правильно.</p>`},
  tv13:{eye:'New England Journal of Medicine, 2012', title:'Шоколад и Нобелевские премии', html:`<p>Франц Мессерли сопоставил потребление шоколада в странах с числом нобелевских лауреатов на душу населения и получил коэффициент корреляции</p><p class="big">r ≈ 0,79</p><p>Статья была шуточной: чем богаче страна, тем больше в ней и шоколада, и науки. Корреляция показывает связь, но не причину. Эта глава — о том, что r умеет и чего не умеет.</p>`},
  tv14:{eye:'США, 1936 год', title:'Два миллиона ответов против пятидесяти тысяч', html:`<p>Журнал Literary Digest разослал анкеты и получил около 2,4 миллиона ответов: победит Лэндон. Джордж Гэллап опросил примерно 50 тысяч человек, но подобранных по правилам, и предсказал победу Рузвельта.</p><p class="big">Победил Рузвельт</p><p>Журнал опрашивал своих подписчиков и владельцев телефонов — людей заметно богаче среднего. Важна не величина выборки, а её репрезентативность.</p>`},
  tv15:{eye:'Фрэнсис Гальтон, 1886', title:'Откуда взялось слово «регрессия»', html:`<p>Гальтон сравнил рост родителей и взрослых детей. У очень высоких родителей дети в среднем оказывались ниже них, у очень низких — выше.</p><p class="big">«Регрессия к середине»</p><p>Гальтон назвал это возвратом, по-английски regression. Слово закрепилось за всей теорией: уравнение регрессии — это то, как в среднем меняется Y вслед за X.</p>`},
  tv16:{eye:'Рональд Фишер, 1935', title:'Леди, пробующая чай', html:`<p>Одна дама утверждала, что по вкусу отличает, что налили в чашку первым — чай или молоко. Фишер предложил опыт: 8 чашек, в 4 сначала молоко, в 4 — чай, порядок случайный. Угадать всё случайно можно с вероятностью</p><p class="big">1/C₈⁴ = 1/70</p><p>Из этого спора выросли проверка гипотез и уровень значимости. Говорят, дама угадала все чашки.</p>`},
  tv17:{eye:'Опытная станция Ротамстед, 1920-е', title:'Удобрения, на которых вырос дисперсионный анализ', html:`<p>Фишер работал в Ротамстеде и разбирал данные многолетних опытов с удобрениями. Урожай менялся и от удобрения, и от погоды, и от участка поля. Как отделить влияние удобрения от случайного разброса?</p><p class="big">S<sub>общ</sub> = S<sub>факт</sub> + S<sub>ост</sub></p><p>Фишер разложил общий разброс на части. Так появился дисперсионный анализ, а F-критерий назван в его честь.</p>`},
  tv18:{eye:'Станислав Улам, 1946', title:'Пасьянс, из которого вырос метод Монте-Карло', html:`<p>Математик Улам выздоравливал после болезни и раскладывал пасьянс. Посчитать шанс его сойтись формулами оказалось почти невозможно. Тогда он подумал: проще разложить сто раз и посчитать, сколько раз сошлось.</p><p class="big">Моделирование вместо формул</p><p>Вместе с фон Нейманом Улам применил идею к расчётам для атомного проекта. Метод назвали в честь казино в Монако, где правит случай.</p>`},
  tv19:{eye:'Александр Хинчин, 1934', title:'Как связаны шум и спектр', html:`<p>Советский математик Хинчин доказал: у стационарного процесса корреляционная функция и спектральная плотность — пара преобразований Фурье. Норберт Винер пришёл к похожему результату раньше для отдельных функций.</p><p class="big">теорема Винера — Хинчина</p><p>На ней стоят радиосвязь, обработка звука и фильтры шума. Корреляционная функция говорит, «как долго процесс помнит себя», спектр — «на каких частотах он шумит».</p>`}
};
for (const L of BOOKS.tv.lessons) if (HOOK[L.id]) L.hook = HOOK[L.id];

/* Итоги глав и вопросы к экзамену */
const SUM = {
  tv1:['P(A) = m/n — только для конечного числа <b>равновозможных</b> несовместных исходов, образующих полную группу.','Относительная частота W = m/n меняется от серии к серии, но при больших n устойчиво держится около P(A).','Событие достоверное: P = 1, невозможное: P = 0, случайное: 0 &lt; P &lt; 1.','Порядок важен — размещения Aₙᵐ, не важен — сочетания Cₙᵐ, все элементы переставляются — Pₙ = n!.','Главная ошибка — считать равновозможными неравновозможные исходы (задача 4).'],
  tv2:['P = mes g / mes G: длина, площадь или объём благоприятной области к всей.','Точку «бросают наудачу»: вероятность попасть в область пропорциональна её мере и не зависит от формы.','Задача о встрече: P = 1 − (1 − t/T)².','Задачи с двумя моментами времени сводятся к точке в квадрате, с тремя — в кубе.'],
  tv3:['Несовместные: P(A + B) = P(A) + P(B); совместные: минус P(AB).','P(AB) = P(A)·P<sub>A</sub>(B); для независимых P(AB) = P(A)·P(B).','Хотя бы одно из n: 1 − q₁q₂…qₙ; при равных p: 1 − qⁿ.','Сколько опытов, чтобы P ≥ γ: n ≥ ln(1 − γ)/ln q.','Ровно одно — сумма вариантов вида p₁q₂q₃.'],
  tv4:['Гипотезы B₁…Bₙ образуют полную группу: ΣP(Bᵢ) = 1.','Полная вероятность: P(A) = Σ P(Bᵢ)·P<sub>Bᵢ</sub>(A).','Бейес: P<sub>A</sub>(Bᵢ) = P(Bᵢ)P<sub>Bᵢ</sub>(A)/P(A) — переоценка гипотез после опыта.','Редкая гипотеза остаётся маловероятной даже после «точного» теста.'],
  tv5:['Pₙ(k) = Cₙᵏpᵏqⁿ⁻ᵏ — n независимых испытаний с постоянной p.','Наивероятнейшее число: np − q ≤ k₀ ≤ np + p; если границы целые, k₀ два.','M = np, D = npq для числа появлений.','Не менее k раз — сумма от k до n или 1 минус сумма от 0 до k − 1.'],
  tv6:['Локальная теорема Лапласа: Pₙ(k) ≈ φ(x)/√(npq), x = (k − np)/√(npq).','Интегральная: Pₙ(k₁, k₂) ≈ Φ(x″) − Φ(x′); Φ нечётна, Φ(x) ≈ 0,5 при x &gt; 5.','Пуассон для редких событий: Pₙ(k) ≈ λᵏe⁻ᵏ/k!, λ = np.','Отклонение частоты: P(|m/n − p| ≤ ε) ≈ 2Φ(ε√(n/(pq))).','Простейший (пуассоновский) поток: Pₜ(k) = (λt)ᵏe<sup>−λt</sup>/k!, λ — интенсивность.'],
  tv7:['M(X) = Σxᵢpᵢ, D(X) = M(X²) − M²(X), σ = √D.','M(CX) = CM(X), D(CX) = C²D(X), D(C) = 0.','Для независимых: M(XY) = M(X)M(Y), D(X ± Y) = D(X) + D(Y).','Биномиальный: np и npq; Пуассона: λ и λ; геометрический: 1/p и q/p².','Начальные моменты νₖ = M(Xᵏ), центральные μₖ = M[(X − M(X))ᵏ]; μ₂ = D.'],
  tv8:['F(x) = P(X &lt; x): неубывающая, от 0 до 1; f(x) = F′(x) ≥ 0, ∫f = 1.','P(α &lt; X &lt; β) = F(β) − F(α) = ∫f; для непрерывной P(X = a) = 0.','Равномерный: (a + b)/2 и (b − a)²/12; показательный: 1/λ и 1/λ²; нормальный: a и σ².','P(|X − a| &lt; δ) = 2Φ(δ/σ); правило трёх сигм: 0,9973.','Функция надёжности R(t) = e<sup>−λt</sup> — вероятность проработать без отказа время t.','Мода — точка максимума f, медиана — точка, где F = 1/2.'],
  tv9:['Чебышев: P(|X − M| &lt; ε) ≥ 1 − D/ε² — для любого закона, оценка снизу.','Теорема Чебышева: среднее арифметическое сходится по вероятности к среднему мат. ожиданий.','Теорема Бернулли: m/n → p по вероятности.','Для среднего n независимых: D(X̄) = D/n.'],
  tv10:['Точечные оценки: x̄ для a, D<sub>в</sub> (смещённая) и s² = nD<sub>в</sub>/(n − 1) (несмещённая) для σ².','Свойства оценок: несмещённость, состоятельность, эффективность.','Метод моментов: приравнять теоретические моменты эмпирическим; МНП: максимизировать функцию правдоподобия.','Интервал для a при известном σ: x̄ ± tσ/√n, 2Φ(t) = γ.','При неизвестном σ: x̄ ± t<sub>γ</sub>s/√n, t<sub>γ</sub> по таблице Стьюдента (k = n − 1).','Интервал шире при большей γ и меньшем n.'],
  tv11:['H₀ — проверяемая гипотеза, H₁ — конкурирующая; α — вероятность ошибки первого рода.','Ошибка I рода — отвергнуть верную H₀; II рода — принять неверную.','Пирсон: χ² = Σ(nᵢ − nᵢ′)²/nᵢ′, k = s − 1 − r.','χ²<sub>набл</sub> &lt; χ²<sub>кр</sub> — нет оснований отвергнуть H₀.','Для нормального закона r = 2, для Пуассона и показательного r = 1.'],
  tv12:['Дискретная Y = φ(X): yᵢ = φ(xᵢ) с теми же pᵢ, совпадающие значения складывают.','Монотонная φ: g(y) = f(ψ(y))|ψ′(y)|.','M[φ(X)] = Σφ(xᵢ)pᵢ = ∫φ(x)f(x)dx; в общем случае ≠ φ(M(X)).','Сумма независимых — композиция (свёртка) законов.'],
  tv13:['Законы составляющих — суммы таблицы по строкам и столбцам.','Условный закон: P(xᵢ | yⱼ) = pᵢⱼ/P(yⱼ).','Независимость: pᵢⱼ = P(xᵢ)P(yⱼ) для всех клеток.','μₓᵧ = M(XY) − M(X)M(Y), r = μₓᵧ/(σₓσᵧ), |r| ≤ 1.','Независимые ⇒ некоррелированы; обратное верно для нормальной системы.'],
  tv14:['Выборка должна быть репрезентативной.','F*(x) = nₓ/n — ступенчатая, оценивает F(x).','Полигон — ломаная (xᵢ, nᵢ); гистограмма — столбики nᵢ/h площадью n.','Метод произведений: uᵢ = (xᵢ − C)/h, x̄ = hM*(u) + C, D = h²(M*(u²) − M*²(u)).','Асимметрия aₛ = m₃/σ³, эксцесс eₖ = m₄/σ⁴ − 3; поправка Шеппарда D − h²/12.'],
  tv15:['МНК: k = (nΣxy − ΣxΣy)/(nΣx² − (Σx)²), b = (Σy − kΣx)/n.','ȳₓ − ȳ = r<sub>в</sub>(σᵧ/σₓ)(x − x̄).','Значимость r: T = r√(n − 2)/√(1 − r²), k = n − 2.','Спирмен: ρ = 1 − 6Σd²/(n(n² − 1)); Кендалл: τ = 4R/(n(n − 1)) − 1.'],
  tv16:['Две дисперсии: F = s²<sub>б</sub>/s²<sub>м</sub>.','Две средние при известных D: Z = (x̄ − ȳ)/√(Dₓ/n + Dᵧ/m).','Малые выборки: T с k = n + m − 2.','Средняя и a₀: U = (x̄ − a₀)√n/σ или T = (x̄ − a₀)√n/s.','Двусторонняя область: Φ(u) = (1 − α)/2; односторонняя: Φ(u) = (1 − 2α)/2.'],
  tv17:['S<sub>общ</sub> = S<sub>факт</sub> + S<sub>ост</sub>.','s²<sub>факт</sub> = S<sub>факт</sub>/(p − 1), s²<sub>ост</sub> = S<sub>ост</sub>/(p(q − 1)).','F = s²<sub>факт</sub>/s²<sub>ост</sub> сравнивают с F<sub>кр</sub>(α; p − 1; p(q − 1)).','Вычитание константы C из всех данных суммы квадратов не меняет.'],
  tv18:['Дискретная: [0; 1) делят на части длиной pᵢ.','Непрерывная: x = F⁻¹(r); показательная: x = −(ln r)/λ.','Нормальная: σ(Σ₁¹²rᵢ − 6) + a.','Интеграл: (b − a)·среднее φ(xᵢ); погрешность ∼ 1/√n.'],
  tv19:['mₓ(t), Dₓ(t), Kₓ(t₁, t₂); Kₓ(t, t) = Dₓ(t).','Неслучайное слагаемое не меняет K; множитель φ(t) даёт φ(t₁)φ(t₂)K.','Стационарность: m = const, K = k(τ); k(0) = D, k чётная.','Эргодичность — характеристики по одной реализации.','sₓ(ω) и kₓ(τ) — пара Фурье (Винер — Хинчин); D = ∫sₓ(ω)dω.']
};
const QS = {
  tv1:[['Сформулируйте классическое определение вероятности и его условия.','P(A) = m/n, где m — число благоприятных исходов, n — всех. Исходы должны быть несовместны, равновозможны и образовывать полную группу.'],['Чем статистическое определение отличается от классического?','Статистическое берёт за вероятность относительную частоту в длинной серии опытов; оно не требует равновозможности, но даёт лишь приближённое значение.'],['Что такое полная группа событий?','Набор событий, из которых в результате опыта обязательно наступит хотя бы одно; если они ещё и попарно несовместны — наступит ровно одно.']],
  tv2:[['Дайте определение геометрической вероятности.','P = mes g/mes G — отношение меры (длины, площади, объёма) благоприятной области к мере всей области; точка бросается наудачу.'],['Как решается задача о встрече?','Моменты прихода — точка (x, y) в квадрате T×T; встреча при |x − y| ≤ t; P = 1 − (1 − t/T)².']],
  tv3:[['Сформулируйте теорему сложения для совместных событий.','P(A + B) = P(A) + P(B) − P(AB).'],['Что такое условная вероятность?','P<sub>A</sub>(B) = P(AB)/P(A) — вероятность B, вычисленная в предположении, что A уже наступило.'],['Как найти вероятность хотя бы одного из n независимых событий?','P = 1 − q₁q₂…qₙ, где qᵢ = 1 − pᵢ.']],
  tv4:[['Запишите формулу полной вероятности.','P(A) = Σ P(Bᵢ)·P<sub>Bᵢ</sub>(A), где Bᵢ — полная группа несовместных гипотез.'],['Когда применяют формулу Бейеса?','Когда опыт уже произведён и событие A наступило: она пересчитывает вероятности гипотез, P<sub>A</sub>(Bᵢ) = P(Bᵢ)P<sub>Bᵢ</sub>(A)/P(A).']],
  tv5:[['Запишите формулу Бернулли и условия её применения.','Pₙ(k) = Cₙᵏpᵏqⁿ⁻ᵏ; n независимых испытаний, в каждом событие наступает с одной и той же вероятностью p.'],['Как найти наивероятнейшее число появлений?','Из неравенства np − q ≤ k₀ ≤ np + p.']],
  tv6:[['Когда используют теоремы Лапласа, а когда формулу Пуассона?','Лапласа — при большом n и npq не слишком малом (практически &gt; 9); Пуассона — при большом n и малом p (λ = np ≤ 10).'],['Перечислите свойства функции Лапласа Φ(x).','Нечётная: Φ(−x) = −Φ(x); Φ(0) = 0; возрастает; Φ(x) → 0,5 при x → ∞ (практически Φ(x) = 0,5 при x &gt; 5).'],['Что такое простейший поток событий?','Стационарный, без последействия и ординарный поток; число событий за время t распределено по Пуассону с параметром λt.']],
  tv7:[['Дайте определение и перечислите свойства математического ожидания.','M(X) = Σxᵢpᵢ. M(C) = C, M(CX) = CM(X), M(X + Y) = M(X) + M(Y), для независимых M(XY) = M(X)M(Y).'],['Как вычислить дисперсию и что она характеризует?','D(X) = M(X²) − M²(X); характеризует рассеяние значений вокруг M(X).'],['Чему равны M и D биномиального закона?','M = np, D = npq.']],
  tv8:[['Перечислите свойства функции распределения.','0 ≤ F ≤ 1; неубывающая; F(−∞) = 0, F(+∞) = 1; P(a ≤ X &lt; b) = F(b) − F(a); для непрерывной X непрерывна.'],['Сформулируйте правило трёх сигм.','Для нормального закона практически достоверно, что |X − a| &lt; 3σ: вероятность 0,9973.'],['Чем характерен показательный закон?','f = λe<sup>−λx</sup> при x ≥ 0, M = σ = 1/λ; описывает время безотказной работы; R(t) = e<sup>−λt</sup>.']],
  tv9:[['Сформулируйте неравенство Чебышева.','P(|X − M(X)| &lt; ε) ≥ 1 − D(X)/ε² для любого ε &gt; 0.'],['В чём смысл закона больших чисел?','Среднее большого числа случайных величин теряет случайность и почти не отличается от среднего их мат. ожиданий (теоремы Чебышева и Бернулли).']],
  tv10:[['Какие требования предъявляют к статистическим оценкам?','Несмещённость (M оценки равно параметру), состоятельность (сходится к параметру при n → ∞), эффективность (наименьшая дисперсия).'],['Почему вводят исправленную дисперсию?','D<sub>в</sub> — смещённая оценка; s² = nD<sub>в</sub>/(n − 1) несмещённая.'],['Что означает надёжность γ доверительного интервала?','Доля таких интервалов (при многократном повторении выборок), которые накрывают истинный параметр.']],
  tv11:[['Что такое уровень значимости?','Вероятность ошибки первого рода — отвергнуть верную нулевую гипотезу; обычно 0,05 или 0,01.'],['Как вычислить число степеней свободы в критерии Пирсона?','k = s − 1 − r: s — число групп, r — число параметров, оценённых по выборке.']],
  tv12:[['Как найти закон распределения функции дискретной случайной величины?','Вычислить yᵢ = φ(xᵢ), сохранить вероятности pᵢ, одинаковые значения y объединить, сложив их вероятности.'],['Как найти плотность Y = φ(X) для монотонной φ?','g(y) = f(ψ(y))·|ψ′(y)|, где ψ — обратная к φ функция.']],
  tv13:[['Как найти законы распределения составляющих по таблице двумерной величины?','Сложить вероятности по столбцам (для X) и по строкам (для Y).'],['Что показывает коэффициент корреляции?','Тесноту линейной связи: |r| ≤ 1; |r| = 1 — строгая линейная зависимость; r = 0 — линейной связи нет.'],['Следует ли из некоррелированности независимость?','В общем случае нет; для нормально распределённой системы — да.']],
  tv14:[['Что такое эмпирическая функция распределения?','F*(x) = nₓ/n, где nₓ — число вариант, меньших x; оценка теоретической F(x).'],['Чем полигон отличается от гистограммы?','Полигон — ломаная по точкам (xᵢ, nᵢ) для дискретного ряда; гистограмма — ступенчатая фигура из прямоугольников высотой nᵢ/h для интервального ряда.'],['В чём суть метода произведений?','Переход к условным вариантам uᵢ = (xᵢ − C)/h упрощает вычисления: x̄ = hM*(u) + C, D = h²(M*(u²) − M*²(u)).']],
  tv15:[['В чём суть метода наименьших квадратов?','Параметры прямой подбирают так, чтобы сумма квадратов отклонений наблюдаемых y от прямой была минимальной.'],['Запишите выборочное уравнение прямой регрессии Y на X.','ȳₓ − ȳ = r<sub>в</sub>(σᵧ/σₓ)(x − x̄).'],['Когда используют ранговую корреляцию?','Когда признаки не измерить числом, а можно только упорядочить объекты (качество, вкус, оценки экспертов).']],
  tv16:[['Как выбрать вид критической области?','По конкурирующей гипотезе: H₁: a ≠ a₀ — двусторонняя, a &gt; a₀ — правосторонняя, a &lt; a₀ — левосторонняя.'],['Каким критерием сравнивают две дисперсии нормальных совокупностей?','Критерием Фишера — Снедекора F = s²<sub>б</sub>/s²<sub>м</sub> с k₁ = n₁ − 1, k₂ = n₂ − 1.']],
  tv17:[['На какие части раскладывается общая сумма квадратов в дисперсионном анализе?','S<sub>общ</sub> = S<sub>факт</sub> (между группами) + S<sub>ост</sub> (внутри групп).'],['Как делается вывод о влиянии фактора?','F = s²<sub>факт</sub>/s²<sub>ост</sub>; если F &gt; F<sub>кр</sub>(α; p − 1; p(q − 1)), групповые средние различаются значимо — фактор влияет.']],
  tv18:[['Как разыграть непрерывную случайную величину?','Методом обратных функций: решить F(x) = r относительно x.'],['От чего зависит точность метода Монте-Карло?','Погрешность пропорциональна σ/√n: убывает обратно корню из числа испытаний.']],
  tv19:[['Что такое корреляционная функция случайной функции?','Kₓ(t₁, t₂) = M[(X(t₁) − mₓ(t₁))(X(t₂) − mₓ(t₂))] — корреляционный момент двух сечений.'],['Какая случайная функция называется стационарной?','Если её мат. ожидание постоянно, а корреляционная функция зависит только от разности аргументов τ = t₂ − t₁.'],['Что такое спектральная плотность?','sₓ(ω) — распределение дисперсии стационарного процесса по частотам; с kₓ(τ) связана преобразованием Фурье.']]
};
for (const L of BOOKS.tv.lessons){ if (SUM[L.id]) L.sum = SUM[L.id]; if (QS[L.id]) L.qs = QS[L.id]; }

/* Дополнения к теории первых глав (чтобы ничего из программы не потерялось) */
const L1 = BOOKS.tv.lessons.find(L=>L.id==='tv1');
L1.theory = `<p><b>Событие</b> — результат испытания. <b>Достоверное</b> наступает всегда (P = 1), <b>невозможное</b> — никогда (P = 0). События <b>несовместны</b>, если не могут наступить вместе; <b>противоположные</b> A и Ā — несовместны и образуют полную группу.</p>
  <p><b>Сумма</b> A + B — наступило хотя бы одно из них; <b>произведение</b> AB — наступили оба.</p>` + L1.theory.replace('<p><b>Испытание</b>', '<p>Само <b>испытание</b>');
const L6 = BOOKS.tv.lessons.find(L=>L.id==='tv6');
L6.theory += `<h3>Простейший поток событий</h3><p>Поток событий (вызовы, отказы, заявки) называют <b>простейшим</b>, если он стационарен, без последействия и ординарен. Число событий за время t распределено по Пуассону:</p>
  <div class="f">Pₜ(k) = ${fr('(λt)ᵏ e<sup>−λt</sup>','k!')}<small>λ — интенсивность потока, среднее число событий за единицу времени</small></div>`;
const L7 = BOOKS.tv.lessons.find(L=>L.id==='tv7');
L7.theory += `<h3>Моменты</h3><div class="f">νₖ = M(Xᵏ), &nbsp; μₖ = M[(X − M(X))ᵏ], &nbsp; μ₂ = D(X), &nbsp; μ₃ = ν₃ − 3ν₁ν₂ + 2ν₁³<small>начальные и центральные теоретические моменты; асимметрия μ₃/σ³, эксцесс μ₄/σ⁴ − 3</small></div>`;
const L10 = BOOKS.tv.lessons.find(L=>L.id==='tv10');
L10.theory += `<h3>Как получают оценки</h3><p><b>Метод моментов:</b> теоретические моменты приравнивают эмпирическим и решают относительно параметров (для показательного закона λ* = 1/x̄). <b>Метод наибольшего правдоподобия:</b> выбирают параметр, при котором вероятность получить наблюдённую выборку максимальна; решают уравнение d ln L/dθ = 0.</p>
  <div class="f">${fr('(n − 1)s²','χ²<sub>2</sub>')} &lt; σ² &lt; ${fr('(n − 1)s²','χ²<sub>1</sub>')} &nbsp;или&nbsp; s(1 − q) &lt; σ &lt; s(1 + q)<small>доверительный интервал для σ нормального закона; q = q(γ, n) — по таблице</small></div>`;

/* Части книги */
BOOKS.tv.parts = [
  {t:'Случайные события', ids:['tv1','tv2','tv3','tv4','tv5','tv6']},
  {t:'Случайные величины', ids:['tv7','tv8','tv12','tv13','tv9']},
  {t:'Математическая статистика', ids:['tv14','tv10','tv15','tv11','tv16','tv17']},
  {t:'Моделирование и случайные процессы', ids:['tv18','tv19']}
];
})();
