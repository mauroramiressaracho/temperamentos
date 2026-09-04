(() => {
  const originalRenderReport = window.renderReport;
  if (typeof originalRenderReport !== 'function') return;

  const clamp = v => Math.max(0, Math.min(100, Number(v) || 0));

  function temperamentBars(r){
    return r.ranking.map(([name,value],i)=>`
      <div class="dash-bar-row ${i===0?'primary':''}">
        <span class="dash-bar-label">${name}</span>
        <div class="dash-bar-track"><div class="dash-bar-fill" style="width:${clamp(value)}%"></div></div>
        <span class="dash-bar-value">${value}</span>
      </div>`).join('');
  }

  function radarSvg(r){
    const labels=[
      ['Extroversão',r.E],
      ['Emoção',r.N],
      ['Ruminação',r.R],
      ['Assertividade',r.A],
      ['Autorregulação',r.S],
      ['Adaptação',r.D]
    ];
    const cx=200, cy=180, radius=118, n=labels.length;
    const point=(index,percent,extra=0)=>{
      const angle=(-Math.PI/2)+(Math.PI*2*index/n);
      const rad=(radius+extra)*(percent/100);
      return [cx+Math.cos(angle)*rad, cy+Math.sin(angle)*rad];
    };
    const rings=[20,40,60,80,100].map(p=>{
      const pts=labels.map((_,i)=>point(i,p)).map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
      return `<polygon class="radar-grid" points="${pts}"/>`;
    }).join('');
    const axes=labels.map((_,i)=>{
      const [x,y]=point(i,100);
      return `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`;
    }).join('');
    const shape=labels.map(([,v],i)=>point(i,clamp(v))).map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
    const dots=labels.map(([,v],i)=>{
      const [x,y]=point(i,clamp(v));
      return `<circle class="radar-dot" cx="${x}" cy="${y}" r="5"/>`;
    }).join('');
    const text=labels.map(([label,v],i)=>{
      const angle=(-Math.PI/2)+(Math.PI*2*i/n);
      const x=cx+Math.cos(angle)*(radius+34);
      const y=cy+Math.sin(angle)*(radius+34);
      const anchor=Math.abs(Math.cos(angle))<.2?'middle':Math.cos(angle)>0?'start':'end';
      return `<text class="radar-label" x="${x}" y="${y}" text-anchor="${anchor}">${label}</text><text class="radar-score" x="${x}" y="${y+14}" text-anchor="${anchor}">${v}/100</text>`;
    }).join('');
    return `<svg class="radar-svg" viewBox="0 0 400 360" role="img" aria-label="Radar do perfil pessoal">${rings}${axes}<polygon class="radar-shape" points="${shape}"/>${dots}${text}</svg>`;
  }

  function pairGroup(title,expressed,wanted){
    const gap=wanted-expressed;
    const gapText=gap===0?'0':`${gap>0?'+':''}${gap}`;
    return `<div class="pair-group">
      <div class="pair-title"><strong>${title}</strong><span class="pair-gap">Diferença ${gapText}</span></div>
      <div class="pair-line"><span>Expressado</span><div class="pair-track"><div class="pair-fill expressed" style="width:${clamp(expressed)}%"></div></div><span class="pair-value">${expressed}</span></div>
      <div class="pair-line"><span>Desejado</span><div class="pair-track"><div class="pair-fill wanted" style="width:${clamp(wanted)}%"></div></div><span class="pair-value">${wanted}</span></div>
    </div>`;
  }

  function gapCard(title,expressed,wanted){
    const gap=wanted-expressed;
    let reading='equilíbrio próximo';
    if(gap>=20) reading='você deseja mais do que costuma demonstrar';
    else if(gap<=-20) reading='você demonstra mais do que sente necessidade de receber';
    return `<div class="gap-card"><small>${title}</small><strong>${gap>0?'+':''}${gap}</strong><span>${reading}</span></div>`;
  }

  function buildDashboard(r){
    const section=document.createElement('section');
    section.className='dashboard-page pdf-page-break';
    section.innerHTML=`
      <div class="dashboard-card full">
        <span class="eyebrow">PAINEL VISUAL</span>
        <h2>Seu perfil em gráficos</h2>
        <p class="dashboard-sub">Uma visão rápida dos quatro temperamentos, das principais facetas pessoais e da diferença entre o que você demonstra e o que gostaria de receber nas relações.</p>
      </div>

      <div class="dashboard-card">
        <h3>Afinidades temperamentais</h3>
        <p class="dashboard-sub">Quanto cada quadrante apareceu no conjunto das suas respostas.</p>
        <div class="dash-bars">${temperamentBars(r)}</div>
      </div>

      <div class="dashboard-card">
        <h3>Mapa do perfil pessoal</h3>
        <p class="dashboard-sub">Quanto cada característica apareceu em uma escala de 0 a 100.</p>
        <div class="radar-wrap">${radarSvg(r)}</div>
      </div>

      <div class="dashboard-card full">
        <h3>Relacionamentos: Expressado × Desejado</h3>
        <p class="dashboard-sub">Compare aquilo que você costuma demonstrar com aquilo que tende a desejar receber dos outros.</p>
        <div class="pair-chart">
          ${pairGroup('Inclusão',r.IE,r.IW)}
          ${pairGroup('Controle',r.CE,r.CW)}
          ${pairGroup('Afeição',r.AE,r.AW)}
        </div>
        <div class="pair-legend"><span><i class="legend-dot expressed"></i>Expressado</span><span><i class="legend-dot wanted"></i>Desejado</span></div>
        <div class="gap-cards">
          ${gapCard('Inclusão',r.IE,r.IW)}
          ${gapCard('Controle',r.CE,r.CW)}
          ${gapCard('Afeição',r.AE,r.AW)}
        </div>
      </div>`;
    return section;
  }

  window.renderReport = function(r){
    originalRenderReport(r);
    const report=document.getElementById('report');
    if(!report) return;
    const dashboard=buildDashboard(r);
    const cover=report.querySelector('.report-cover');
    if(cover?.nextSibling) report.insertBefore(dashboard,cover.nextSibling);
    else report.appendChild(dashboard);
  };
})();
