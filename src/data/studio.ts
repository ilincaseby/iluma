/**
 * ============================================================================
 *  PROCESS & PRINCIPLES — how the studio works + the "5 greșeli" carousel
 *  turned into principles, + the "Designer vs. DIY" comparison.
 * ============================================================================
 */

export const process = [
  { n: '01', title: 'Discuția inițială', text: 'Ne cunoaștem, vedem spațiul și aflăm cum trăiești, ce îți place și ce bugete avem.' },
  { n: '02', title: 'Paleta & conceptul', text: 'Construim direcția: paletă de culori, materiale, texturi și atmosfera pe care vrei să o creezi.' },
  { n: '03', title: 'Planul', text: 'Dimensiuni, circulație și proporții. Nu cumpărăm mobilier înainte să avem planul.' },
  { n: '04', title: 'Detaliile', text: 'Iluminat, textile, perdele, mobilier custom și soluții pentru elementele tehnice.' },
  { n: '05', title: 'Spațiul tău', text: 'Un interior echilibrat, coerent și personal. Un spațiu care se simte ca acasă.' },
];

/** From the carousel "5 greșeli pe care să le eviți" (orange slides) */
export const principles = [
  { title: 'Nu cumpăra mobilier înainte să ai planul', text: 'Dimensiunile și circulația din cameră contează mai mult decât o piesă frumoasă văzută online.' },
  { title: 'Nu începe cu decorațiunile', text: 'Alege mai întâi baza: pardoseală, pereți, mobilier, iluminat și materiale.' },
  { title: 'Măsoară înainte să cumperi', text: 'Canapeaua perfectă poate deveni prea mare. Covorul prea mic poate dezechilibra întreaga cameră.' },
  { title: 'Nu încerca să urmezi toate trendurile', text: 'Alege un stil care îți place astăzi, dar în care te vei simți bine și peste câțiva ani.' },
  { title: 'Lasă loc pentru personalitate', text: 'O casă nu trebuie să arate ca un showroom. Trebuie să se simtă ca acasă.' },
];

/** "Designer sau DIY?" carousel */
export const designerVsDiy = {
  designer: {
    title: 'Designer',
    lead: 'Un designer te poate ajuta când:',
    points: [
      'ai nevoie de o viziune coerentă',
      'nu știi de unde să începi',
      'vrei să eviți greșelile costisitoare',
      'ai nevoie de planificare, funcționalitate și detalii personalizate',
    ],
  },
  diy: {
    title: 'DIY',
    lead: 'Poate fi alegerea potrivită când:',
    points: ['ai un spațiu simplu', 'știi deja ce stil îți place', 'ai timp să cauți și să compari', 'vrei să iei deciziile pas cu pas'],
  },
  conclusion: 'Nu este Designer vs. DIY. Este despre ce funcționează pentru tine, spațiul tău și bugetul tău.',
  quote: 'Uneori, cel mai bun design începe cu o idee bună. Alteori, cu un plan bine făcut.',
};
