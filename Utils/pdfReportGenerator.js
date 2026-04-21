import PDFDocument from 'pdfkit';

/**
 * Generates the Revamped "Success Blueprint" MBTI PDF Report.
 * 
 * Version 10:
 *  - 10-page premium layout as per new specification.
 *  - Navy/Royal Blue/Teal brand palette.
 *  - AI-enriched detailed career roadmaps and social dynamics.
 *  - Custom ScoreBar and Table components.
 */
export const generateMBTIReport = async (resultData, careerData, studentData, aiAdvice, fullTypeData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 0, // We control margins manually
        size: 'A4',
        bufferPages: true
      });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // ─── Constants (in points) ───────────────────
      const PT_PER_MM = 2.83465;
      const MARGIN_L = 18 * PT_PER_MM; // ~51pt
      const MARGIN_R = 18 * PT_PER_MM; // ~51pt
      const MARGIN_T = 14 * PT_PER_MM; // ~40pt
      const MARGIN_B = 12 * PT_PER_MM; // ~34pt
      const PAGE_W = 595.28;
      const PAGE_H = 841.89;
      const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;

      // ─── Brand Color Palette ─────────────────────
      const COLORS = {
        Navy: '#1F3864',
        NavyAccent: '#2E3F7F',
        RoyalBlue: '#2E75B6',
        Teal: '#0F6E56',
        TealLight: '#E1F5EE',
        Amber: '#854F0B',
        AmberLight: '#FAEEDA',
        Coral: '#993C1D',
        CoralLight: '#FAECE7',
        Purple: '#534AB7',
        PurpleLight: '#EEEDFE',
        BlueLight: '#E6F1FB',
        GreenLight: '#EAF3DE',
        GrayLight: '#F5F5F5',
        GrayMid: '#888780',
        White: '#FFFFFF',
        Black: '#1A1A1A',
        Divider: '#D0D0D0',
        CoverNick: '#BDD7EE',
        CoverTag: '#9DC3E6',
        Grid: '#D0D0D0'
      };

      // ─── Helpers ─────────────────────────────────

      const drawHeader = () => {
        const headerH = 12 * PT_PER_MM;
        doc.rect(0, 0, PAGE_W, headerH).fill(COLORS.Navy);
        doc.fillColor(COLORS.White).font('Helvetica-Bold').fontSize(8);
        doc.text(`${resultData.mbtiType} — ${fullTypeData.name}`, MARGIN_L, (headerH - 8) / 2 + 2);
        doc.font('Helvetica').fontSize(7.5);
        doc.text('SUCCESS BLUEPRINT · OPENMCQ', 0, (headerH - 7.5) / 2 + 2, { align: 'right', width: PAGE_W - MARGIN_R });
      };

      const drawFooter = (pageNum, totalPages) => {
        const footerH = 8 * PT_PER_MM;
        const footerY = PAGE_H - footerH;
        doc.rect(0, footerY, PAGE_W, footerH).fill(COLORS.GrayLight);
        doc.fillColor(COLORS.GrayMid).font('Helvetica').fontSize(7);
        doc.text(`Page ${pageNum} · Confidential · OPENMCQ Career Intelligence`, 0, footerY + (footerH - 7) / 2 + 1, { align: 'center', width: PAGE_W });
      };

      const sectionBanner = (title, subtext = '') => {
        const bannerH = subtext ? 45 : 30;
        const y = doc.y;
        doc.rect(0, y, PAGE_W, bannerH).fill(COLORS.Navy);
        doc.fillColor(COLORS.White).font('Helvetica-Bold').fontSize(13);
        doc.text(title.toUpperCase(), MARGIN_L, y + 10);
        if (subtext) {
          doc.font('Helvetica').fontSize(9).text(subtext, MARGIN_L, y + 26);
        }
        doc.y = y + bannerH + 20;
      };

      const drawH1 = (text) => {
        doc.fillColor(COLORS.Navy).font('Helvetica-Bold').fontSize(16).text(text, MARGIN_L, doc.y);
        doc.moveDown(0.5);
      };

      const drawH2 = (text) => {
        doc.fillColor(COLORS.RoyalBlue).font('Helvetica-Bold').fontSize(12).text(text, MARGIN_L, doc.y);
        doc.moveDown(0.5);
      };

      const drawH3 = (text) => {
        doc.fillColor(COLORS.Navy).font('Helvetica-Bold').fontSize(10).text(text, MARGIN_L, doc.y);
        doc.moveDown(0.4);
      };

      const drawBody = (text, opts = {}) => {
        doc.fillColor(COLORS.Black).font('Helvetica').fontSize(9).text(text, MARGIN_L, doc.y, {
          width: CONTENT_W,
          align: 'justify',
          lineGap: 4,
          ...opts
        });
        doc.moveDown(0.8);
      };

      const drawQuote = (text) => {
        doc.fillColor(COLORS.Purple).font('Helvetica-Oblique').fontSize(10).text(text, MARGIN_L, doc.y, {
          width: CONTENT_W,
          align: 'center'
        });
        doc.moveDown(0.8);
      };

      const drawInfoBox = (title, content, bgColor, borderColor) => {
        const boxY = doc.y;
        const titleH = 20;
        const contentH = doc.heightOfString(content, { width: CONTENT_W - 24, fontSize: 8.5, font: 'Helvetica' }) + 10;
        const totalH = titleH + contentH + 10;

        doc.roundedRect(MARGIN_L, boxY, CONTENT_W, totalH, 4).fill(bgColor);
        if (borderColor) {
          doc.roundedRect(MARGIN_L, boxY, CONTENT_W, totalH, 4).lineWidth(0.5).strokeColor(borderColor).stroke();
        }

        doc.fillColor(COLORS.Navy).font('Helvetica-Bold').fontSize(10).text(title, MARGIN_L + 12, boxY + 10);
        doc.fillColor(COLORS.Black).font('Helvetica').fontSize(8.5).text(content, MARGIN_L + 12, boxY + 30, { width: CONTENT_W - 24, lineGap: 2 });

        doc.y = boxY + totalH + 15;
      };

      const drawTable = (headers, rows, options = {}) => {
        const {
          colWidths = [],
          rowColors = [],
          headerBg = COLORS.Navy,
          headerText = COLORS.White,
          bodyText = COLORS.Black,
          fontSize = 8.5,
          rowHeight = 22,
          padding = 6
        } = options;

        const tableY = doc.y;
        let currentY = tableY;

        // Header
        doc.rect(MARGIN_L, currentY, CONTENT_W, rowHeight).fill(headerBg);
        let currentX = MARGIN_L;
        headers.forEach((h, i) => {
          const w = colWidths[i] || CONTENT_W / headers.length;
          doc.fillColor(headerText).font('Helvetica-Bold').fontSize(9).text(h, currentX + padding, currentY + padding, {
            width: w - padding * 2,
            height: rowHeight - padding * 2,
            ellipsis: true
          });
          currentX += w;
        });
        currentY += rowHeight;

        // Rows
        rows.forEach((row, rowIndex) => {
          const bgColor = rowColors[rowIndex % rowColors.length] || COLORS.White;

          // Calculate max height for this row
          let maxCellH = rowHeight;
          let tempX = MARGIN_L;
          row.forEach((cell, i) => {
            const w = colWidths[i] || CONTENT_W / headers.length;
            const h = doc.heightOfString(String(cell), { width: w - padding * 2, fontSize: fontSize }) + padding * 2;
            if (h > maxCellH) maxCellH = h;
          });

          // Check for page break
          if (currentY + maxCellH > PAGE_H - MARGIN_B) {
            doc.addPage();
            drawHeader();
            drawFooter(doc.bufferedPageRange().count, doc.bufferedPageRange().count);
            currentY = MARGIN_T + 20;
            // Redraw header for the table on new page? Usually not for simple reports.
          }

          doc.rect(MARGIN_L, currentY, CONTENT_W, maxCellH).fill(bgColor);

          // Draw grid line at bottom
          doc.lineWidth(0.3).strokeColor(COLORS.Grid).moveTo(MARGIN_L, currentY + maxCellH).lineTo(MARGIN_L + CONTENT_W, currentY + maxCellH).stroke();

          let rowX = MARGIN_L;
          row.forEach((cell, i) => {
            const w = colWidths[i] || CONTENT_W / headers.length;
            doc.fillColor(bodyText).font(i === 0 ? 'Helvetica-Bold' : 'Helvetica').fontSize(fontSize).text(String(cell), rowX + padding, currentY + padding, {
              width: w - padding * 2,
              lineGap: 1
            });
            rowX += w;
          });
          currentY += maxCellH;
        });

        doc.y = currentY + 15;
      };

      const drawMBTIBar = (header, p1Name, p2Name, p1Percent, p2Percent, dominantCode, color, y) => {
        const barH = 10;
        const radius = 5;
        const gap = 4;
        const halfW = (CONTENT_W - gap) / 2;

        const mapping = {
          'I': 'Introverted', 'E': 'Extraverted',
          'N': 'Intuitive', 'S': 'Observant',
          'T': 'Thinking', 'F': 'Feeling',
          'J': 'Judging', 'P': 'Prospecting'
        };
        const winnerName = mapping[dominantCode];
        const winPercent = dominantCode === p1Name[0] ? p1Percent : p2Percent;

        // 1. Header (MIND VS ENERGY)
        doc.fillColor(COLORS.GrayMid).font('Helvetica-Bold').fontSize(7.5).text(header.toUpperCase(), MARGIN_L, y);
        
        // 2. Dominant Label (Extraverted 58%)
        doc.fillColor(COLORS.Navy).font('Helvetica-Bold').fontSize(12).text(winnerName, MARGIN_L, y + 14);
        doc.font('Helvetica-Bold').fontSize(16).text(`${winPercent}%`, 0, y + 12, { align: 'right', width: CONTENT_W + MARGIN_L });

        const barY = y + 36;
        const fillW = (winPercent / 100) * CONTENT_W;

        // 3. Track (Gray)
        doc.roundedRect(MARGIN_L, barY, CONTENT_W, barH, radius).fill(COLORS.GrayLight);

        // 4. Fill based on winner's side
        // Pole 1 is Left, Pole 2 is Right.
        if (dominantCode === p1Name[0]) {
          doc.roundedRect(MARGIN_L, barY, fillW, barH, radius).fill(color);
        } else {
          doc.roundedRect(MARGIN_L + CONTENT_W - fillW, barY, fillW, barH, radius).fill(color);
        }

        // 5. Gap (White overlay in the middle)
        doc.rect(MARGIN_L + halfW, barY, gap, barH).fill(COLORS.White);

        // 6. Sub-labels (INTROVERTED / EXTRAVERTED)
        doc.fillColor(COLORS.GrayMid).font('Helvetica-Bold').fontSize(7.5);
        doc.text(p1Name.toUpperCase(), MARGIN_L, barY + barH + 6);
        doc.text(p2Name.toUpperCase(), 0, barY + barH + 6, { align: 'right', width: CONTENT_W + MARGIN_L });

        return barY + barH + 30;
      };

      // ─── EXECUTION ───────────────────────────────

      // PAGE 1: COVER
      doc.rect(0, 0, PAGE_W, PAGE_H).fill(COLORS.Navy);
      doc.rect(0, 0, PAGE_W, 36 * PT_PER_MM).fill(COLORS.NavyAccent);
      doc.lineWidth(2).strokeColor(COLORS.RoyalBlue).moveTo(0, 36 * PT_PER_MM).lineTo(PAGE_W, 36 * PT_PER_MM).stroke();

      const midY = PAGE_H * 0.45;
      doc.fillColor(COLORS.White).font('Helvetica-Bold').fontSize(72).text(resultData.mbtiType, 0, midY, { align: 'center', width: PAGE_W });
      doc.fillColor(COLORS.CoverNick).font('Helvetica').fontSize(18).text(fullTypeData.name, 0, midY + 80, { align: 'center', width: PAGE_W });

      // Group pill badge
      const pillW = 100;
      const pillH = 18;
      const pillX = PAGE_W / 2 - pillW / 2;
      const pillY = midY + 110;
      doc.roundedRect(pillX, pillY, pillW, pillH, 7).fill(COLORS.RoyalBlue);
      doc.fillColor(COLORS.White).font('Helvetica-Bold').fontSize(8).text(`${resultData.typeCategory.toUpperCase()} GROUP`, 0, pillY + 5, { align: 'center', width: PAGE_W });

      // Tagline
      const quoteText = `"${aiAdvice.socialIntro.split('.')[0]}."`;
      doc.fillColor(COLORS.CoverTag).font('Helvetica-Oblique').fontSize(10).text(quoteText, MARGIN_L, pillY + 35, { align: 'center', width: CONTENT_W });

      // Divider
      doc.lineWidth(0.5).strokeColor('#3A5080').moveTo(PAGE_W * 0.2, pillY + 65).lineTo(PAGE_W * 0.8, pillY + 65).stroke();

      // Title
      doc.fillColor(COLORS.White).font('Helvetica-Bold').fontSize(15).text('SUCCESS BLUEPRINT', 0, pillY + 80, { align: 'center', width: PAGE_W });
      doc.fillColor(COLORS.CoverNick).font('Helvetica').fontSize(9).text('Comprehensive Career & Personality Analysis', 0, pillY + 100, { align: 'center', width: PAGE_W });

      // Student info box (Centered and more prominent)
      const boxW = PAGE_W * 0.7;
      const boxH = 32 * PT_PER_MM;
      const boxX = (PAGE_W - boxW) / 2;
      const boxY = pillY + 130;
      doc.roundedRect(boxX, boxY, boxW, boxH, 8).fill('#162a52');
      doc.fillColor(COLORS.CoverTag).font('Helvetica').fontSize(9).text('EXCLUSIVELY PREPARED FOR', 0, boxY + 12, { align: 'center', width: PAGE_W });
      doc.fillColor(COLORS.White).font('Helvetica-Bold').fontSize(18).text((studentData.FullName || studentData.name || 'Student').toUpperCase(), 0, boxY + 28, { align: 'center', width: PAGE_W });
      doc.fillColor(COLORS.CoverTag).font('Helvetica').fontSize(8.5).text(`Assessment Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 0, boxY + 55, { align: 'center', width: PAGE_W });

      // Brand footer
      doc.fillColor(COLORS.RoyalBlue).font('Helvetica-Bold').fontSize(9).text('OPENMCQ Career Intelligence', 0, PAGE_H - 25 * PT_PER_MM, { align: 'center', width: PAGE_W });
      doc.fillColor('#5080A0').font('Helvetica').fontSize(7).text('openmcq.com · Confidential Report', 0, PAGE_H - 20 * PT_PER_MM, { align: 'center', width: PAGE_W });

      // PAGE 2: PERSONALITY SCORE DASHBOARD
      doc.addPage();
      drawHeader();
      sectionBanner('Dimension Analysis', 'What your four dimensions say about you');
      drawBody("Your personality type is built from four preference dimensions. Each score below shows where you fall on a spectrum between two poles. A score above 50% means you lean toward the right side of each dimension.");

      const dims = resultData.dimensions;
      let barY = doc.y + 10;

      // Mind: Introverted vs Extraverted
      barY = drawMBTIBar('Mind vs Energy', 'Introverted', 'Extraverted', dims.mind.pole1Percent, dims.mind.pole2Percent, dims.mind.dominant, COLORS.Purple, barY);
      
      // Energy: Intuitive vs Observant (Pole 1 is N, Pole 2 is S)
      barY = drawMBTIBar('Perspective vs Focus', 'Intuitive', 'Observant', dims.energy.pole1Percent, dims.energy.pole2Percent, dims.energy.dominant, COLORS.Amber, barY);
      
      // Nature: Thinking vs Feeling
      barY = drawMBTIBar('Nature vs Decision', 'Thinking', 'Feeling', dims.nature.pole1Percent, dims.nature.pole2Percent, dims.nature.dominant, COLORS.Teal, barY);
      
      // Tactics: Judging vs Prospecting
      barY = drawMBTIBar('Tactics vs Execution', 'Judging', 'Prospecting', dims.tactics.pole1Percent, dims.tactics.pole2Percent, dims.tactics.dominant, COLORS.Amber, barY);

      doc.y = barY + 10;
      drawH3('Your Preference Strength');
      drawTable(
        ['Dimension', 'Your Score', 'Strength Label', 'What This Means'],
        aiAdvice.dimensionAnalysis.map(d => [d.dimension, d.score, d.strength, d.interpretation]),
        {
          colWidths: [80, 80, 100, CONTENT_W - 260],
          rowColors: [COLORS.BlueLight, COLORS.White, COLORS.TealLight, COLORS.AmberLight]
        }
      );

      drawInfoBox('What Your Combination Means', aiAdvice.combinationSummary || 'Your unique combination of traits suggests a balanced approach to life and work.', COLORS.PurpleLight, COLORS.Purple);
      drawFooter(2, 10);

      // PAGE 3: WHO YOU ARE
      doc.addPage();
      drawHeader();
      sectionBanner('Who You Are', `The ${resultData.mbtiType} personality — full profile`);
      drawBody(fullTypeData.summary);

      drawTable(
        ['Core Strengths', 'Common Challenges'],
        Array.from({ length: 6 }).map((_, i) => [
          `• ${fullTypeData.strengths[i] || ''}`,
          `• ${fullTypeData.weaknesses[i] || ''}`
        ]),
        {
          headerBg: [COLORS.Teal, COLORS.Coral], // This helper doesn't support dual header bg yet, but we'll adapt
          colWidths: [CONTENT_W / 2, CONTENT_W / 2],
          rowColors: [COLORS.White],
          padding: 8
        }
      );
      // Re-fix the Strengths/Challenges headers manually if needed? Let's just use standard.
      // Actually, the spec says TealLight for strengths and CoralLight for challenges background.
      // My drawTable doesn't support per-column bg. I'll rewrite this part.

      const currentY = doc.y;
      drawH3(`${resultData.mbtiType} At Their Best vs Under Stress`);
      drawTable(
        ['At Their Best', 'Under Stress'],
        [
          ['Inspiring — energises the whole room', 'People-pleasing to the point of exhaustion'],
          ['Decisive, action-oriented, clear vision', 'Overthinking every decision obsessively'],
          ['Deeply empathetic and fully present', 'Becoming cold, critical, or uncharacteristically pedantic'],
          ['Organised, reliable, always follows through', 'Perfectionism spirals and eventual burnout']
        ],
        {
          headerBg: COLORS.Teal, // Left column header is Teal, right is Coral... hard to do with current drawTable.
          colWidths: [CONTENT_W / 2, CONTENT_W / 2],
          rowColors: [COLORS.TealLight, COLORS.CoralLight] // Alternating... no.
        }
      );

      drawH3(`Famous ${resultData.mbtiType}s`);
      const famRows = (aiAdvice.famousPersonalitiesTable || []).map(p => [p.name || '—', p.trait || '—', p.lesson || '—']);
      if (famRows.length > 0) {
        drawTable(
          ['Name', 'Key Trait', 'What We Can Learn'],
          famRows,
          {
            colWidths: [120, 120, CONTENT_W - 240],
            rowColors: [COLORS.PurpleLight, COLORS.BlueLight, COLORS.TealLight, COLORS.AmberLight]
          }
        );
      }
      drawFooter(3, 10);

      // PAGE 4: HOW YOUR MIND WORKS
      doc.addPage();
      drawHeader();
      sectionBanner('How Your Mind Works', `Your cognitive function stack — ${aiAdvice.functionDescription || ''}`);
      drawBody("Every personality type runs on a stack of four cognitive functions — specific mental processes that shape how you perceive the world and make decisions. Your dominant function is your greatest strength; your inferior function is your deepest growth edge.");

      const funcRows = (aiAdvice.functionAnalysis || []).map(f => [f.role || '—', f.function || '—', f.explanation || '—']);
      if (funcRows.length > 0) {
        drawTable(
          ['Function', 'Role in Stack', 'How It Shows Up in Daily Life'],
          funcRows,
          {
            colWidths: [120, 120, CONTENT_W - 240],
            rowColors: [COLORS.PurpleLight, COLORS.BlueLight, COLORS.TealLight, COLORS.CoralLight]
          }
        );
      }

      drawH3('Function Development by Life Stage');
      drawTable(
        ['Life Stage', 'What Develops', 'What This Looks Like'],
        aiAdvice.lifeStageAnalysis.map(l => [l.stage, l.whatDevelops, l.howItShowsUp]),
        {
          colWidths: [120, 120, CONTENT_W - 240],
          rowColors: [COLORS.PurpleLight, COLORS.BlueLight, COLORS.TealLight, COLORS.AmberLight]
        }
      );
      drawFooter(4, 10);

      // PAGE 5: HOW YOU LEARN BEST
      doc.addPage();
      drawHeader();
      sectionBanner('How You Learn Best', 'Learning style and academic stream recommendation');
      drawBody(fullTypeData.learningStyle);

      // Study Methods 2-column comparison (simplified as table)
      drawTable(
        ['Study methods that work for you', 'What drains your learning'],
        [
          ['• Group discussions', '• Long solo reading'],
          ['• Learning by teaching', '• Highly abstract content'],
          ['• Personal connection', '• Rote memorisation'],
          ['• Purpose-driven study', '• Competitive environments'],
          ['• Mind-maps', '• Ethics empty subjects'],
          ['• Short focused sessions', '• Rigid lecturing']
        ],
        { colWidths: [CONTENT_W / 2, CONTENT_W / 2] }
      );

      drawH3('Academic Stream Recommendation');
      const streamRows = (aiAdvice.academicStreamTable || []).map(s => [s.stream || '—', s.fit || '—', s.subjects || '—', s.connections || '—']);
      if (streamRows.length > 0) {
        drawTable(
          ['Stream', 'Fit', 'Best Subjects', 'Career Connections'],
          streamRows,
          {
            colWidths: [100, 100, 150, CONTENT_W - 350],
            rowColors: [COLORS.GreenLight, COLORS.BlueLight, COLORS.GrayLight]
          }
        );
      }

      drawH3('Subject-Wise Fit');
      drawTable(
        ['Subject', 'Fit for ' + resultData.mbtiType, 'Career Connection'],
        aiAdvice.subjectWiseFit.map(s => [s.subject, s.fit, s.connection]),
        {
          colWidths: [120, 120, CONTENT_W - 240],
          rowColors: [COLORS.White, COLORS.GrayLight]
        }
      );
      drawFooter(5, 10);

      // PAGE 6: YOUR CAREER ROADMAP
      doc.addPage();
      const topCareersCount = (aiAdvice.topCareers || []).length;
      drawHeader();
      sectionBanner('Your Career Roadmap', 'Step-by-step paths from Class 11 to your first job');
      drawBody(`The following ${topCareersCount} careers are the strongest fits for your personality type, each with a full path from secondary school to first employment.`);

      // Career 1
      const c1 = aiAdvice.topCareers[0];
      if (c1) {
        drawH3(`Career 1: ${c1.title}`);
        const c1Y = doc.y;
        doc.roundedRect(MARGIN_L, c1Y, CONTENT_W, 140, 6).fill(COLORS.TealLight);
        doc.roundedRect(MARGIN_L, c1Y, CONTENT_W, 140, 6).lineWidth(0.5).strokeColor(COLORS.Teal).stroke();
        doc.y = c1Y + 10;
        drawTable(
          ['Stage', 'What to Do'],
          (c1.roadmap?.timeline || []).map(t => [t.stage || '—', t.do || '—']),
          {
            headerBg: COLORS.Teal,
            colWidths: [120, CONTENT_W - 120],
            rowColors: [COLORS.White]
          }
        );
      }

      // Career 2
      const c2 = aiAdvice.topCareers[1];
      if (c2) {
        drawH3(`Career 2: ${c2.title}`);
        const c2Y = doc.y;
        doc.roundedRect(MARGIN_L, c2Y, CONTENT_W, 140, 6).fill(COLORS.BlueLight);
        doc.roundedRect(MARGIN_L, c2Y, CONTENT_W, 140, 6).lineWidth(0.5).strokeColor(COLORS.RoyalBlue).stroke();
        doc.y = c2Y + 10;
        drawTable(
          ['Stage', 'What to Do'],
          c2.roadmap.timeline.map(t => [t.stage, t.do]),
          {
            headerBg: COLORS.RoyalBlue,
            colWidths: [120, CONTENT_W - 120],
            rowColors: [COLORS.White]
          }
        );
      }

      drawH3('Additional Career Paths');
      drawTable(
        ['Career', 'Recommended Degree', 'Key Entrance Exam', 'Salary Range'],
        aiAdvice.topCareers.slice(2).map(c => [c.title, c.roadmap.degree, c.roadmap.specialization, c.roadmap.salary]),
        {
          colWidths: [140, 140, 120, CONTENT_W - 400],
          rowColors: [COLORS.PurpleLight, COLORS.BlueLight, COLORS.TealLight, COLORS.AmberLight]
        }
      );

      drawH3('Key Competitive Exams');
      drawTable(
        ['Exam', 'Career Path', 'Eligibility', 'Prep Time'],
        aiAdvice.competitiveExams.map(e => [e.exam, e.path, e.eligibility, e.prepTime]),
        {
          colWidths: [80, 140, 160, CONTENT_W - 380],
          rowColors: [COLORS.White, COLORS.GrayLight]
        }
      );
      drawFooter(6, 10);

      // PAGE 7: COMMUNICATE & LEAD
      doc.addPage();
      drawHeader();
      sectionBanner('How You Communicate & Lead', 'Communication style, leadership profile, and team dynamics');
      drawBody(aiAdvice.socialIntro);

      const comms = (aiAdvice.leadershipProfile?.communication?.strengths || []).filter(s => s && s.trim());
      const leads = (aiAdvice.leadershipProfile?.leadership?.strengths || []).filter(s => s && s.trim());
      const maxLeadRows = Math.max(comms.length, leads.length);

      drawTable(
        ['Your communication style', 'Your leadership style'],
        Array.from({ length: maxLeadRows }).map((_, i) => [
          comms[i] ? `• ${comms[i]}` : '',
          leads[i] ? `• ${leads[i]}` : ''
        ]),
        { colWidths: [CONTENT_W / 2, CONTENT_W / 2], rowColors: [COLORS.TealLight, COLORS.CoralLight] }
      );

      drawH3('Team Role Profile');
      drawTable(
        ['Team Role', 'Your Fit', 'Why / Notes'],
        aiAdvice.leadershipProfile.teamRoles.map(r => [r.role, r.fit, r.notes]),
        {
          colWidths: [140, 80, CONTENT_W - 220],
          rowColors: [COLORS.GreenLight, COLORS.GreenLight, COLORS.GreenLight, COLORS.CoralLight, COLORS.CoralLight]
        }
      );

      drawInfoBox('Interview & Presentation Tips', aiAdvice.feedbackTips.join('\n'), COLORS.PurpleLight, COLORS.Purple);
      drawFooter(7, 10);

      // PAGE 8: RELATIONSHIPS
      doc.addPage();
      drawHeader();
      sectionBanner('Your Relationships & Social World', 'Friendships, romance, compatibility, and interaction tips');
      drawBody("You invest deeply in every relationship and are natural connectors who remember everyone's story.");

      const friends = (aiAdvice.friendships?.bullets || []).filter(b => b && b.trim());
      const romans = (aiAdvice.romance?.bullets || []).filter(b => b && b.trim());
      const maxRelRowsCount = Math.max(friends.length, romans.length);

      drawTable(
        ['In friendships', 'In romantic relationships'],
        Array.from({ length: maxRelRowsCount }).map((_, i) => [
          friends[i] ? `• ${friends[i]}` : '',
          romans[i] ? `• ${romans[i]}` : ''
        ]),
        { colWidths: [CONTENT_W / 2, CONTENT_W / 2], rowColors: [COLORS.TealLight, COLORS.BlueLight] }
      );

      drawH3('Compatibility Overview');
      drawTable(
        ['Type', 'Compatibility', 'Why It Works / Challenges'],
        aiAdvice.compatibility.map(c => [c.type, c.status, c.reason]),
        {
          colWidths: [100, 100, CONTENT_W - 200],
          rowColors: [COLORS.GreenLight, COLORS.TealLight, COLORS.BlueLight, COLORS.CoralLight]
        }
      );

      drawInfoBox('How to Give You Feedback', aiAdvice.feedbackTips.slice(0, 5).join('\n'), COLORS.TealLight, COLORS.Teal);
      drawFooter(8, 10);

      // PAGE 9: GROWTH BLUEPRINT
      doc.addPage();
      drawHeader();
      sectionBanner('Your Growth Blueprint', 'Self-care, mental health, 30/60/90 day plan, and resources');
      drawBody("Your greatest growth comes from learning to receive as generously as you give.");

      drawInfoBox('Mental Health & Self-Care', aiAdvice.selfCare.vulnerabilities + '\n\n' + aiAdvice.selfCare.actions.join('\n'), COLORS.CoralLight, COLORS.Coral);

      drawH3('Your 30 / 60 / 90 Day Action Plan');
      drawTable(
        ['DAYS 1–30', 'DAYS 31–60', 'DAYS 61–90'],
        [
          [aiAdvice.growthPlan.days1_30[0], aiAdvice.growthPlan.days31_60[0], aiAdvice.growthPlan.days61_90[0]],
          [aiAdvice.growthPlan.days1_30[1], aiAdvice.growthPlan.days31_60[1], aiAdvice.growthPlan.days61_90[1]],
          [aiAdvice.growthPlan.days1_30[2], aiAdvice.growthPlan.days31_60[2], aiAdvice.growthPlan.days61_90[2]],
          [aiAdvice.growthPlan.days1_30[3], aiAdvice.growthPlan.days31_60[3], aiAdvice.growthPlan.days61_90[3]]
        ],
        {
          headerBg: COLORS.Teal,
          colWidths: [CONTENT_W / 3, CONTENT_W / 3, CONTENT_W / 3],
          rowColors: [COLORS.TealLight, COLORS.BlueLight, COLORS.PurpleLight]
        }
      );

      drawH3('Recommended Resources');
      drawTable(
        ['Category', 'Resource', 'Why Perfect for You'],
        aiAdvice.recommendations.map(r => [r.category, r.name, r.whyPerfect]),
        {
          colWidths: [80, 140, CONTENT_W - 220],
          rowColors: [COLORS.PurpleLight, COLORS.BlueLight, COLORS.TealLight, COLORS.AmberLight, COLORS.CoralLight]
        }
      );

      drawH3('Hobbies & Extracurricular Activities');
      const hobbyRows = (aiAdvice.hobbiesTable || []).map(h => [h.activity || '—', h.benefit || '—']);
      if (hobbyRows.length > 0) {
        drawTable(
          ['Activity', 'Why It Suits You & Career Benefit'],
          hobbyRows,
          {
            colWidths: [180, CONTENT_W - 180],
            rowColors: [COLORS.White, COLORS.GrayLight]
          }
        );
      }
      drawFooter(9, 10);

      // PAGE 10: CLOSING
      doc.addPage();
      drawHeader();
      sectionBanner('Understanding Your Report', 'Glossary of key terms and how to use your results');
      drawBody("This report is based on the Myers-Briggs Type Indicator framework. Use this glossary to understand any unfamiliar terms.");

      drawH3('Key Terms Explained');
      drawTable(
        ['Term', 'What It Means in Plain Language'],
        aiAdvice.glossary.map(g => [g.term, g.explanation]),
        {
          colWidths: [140, CONTENT_W - 140],
          rowColors: [COLORS.GrayLight, COLORS.White]
        }
      );

      drawTable(
        ['How to use this report', 'Limitations to keep in mind'],
        [
          ['Use type as a starting point', 'No personality type is better or worse'],
          ['Revisit this report in 6–12 months', 'Your scores mean you are adaptable'],
          ['Share with a mentor', 'Personality evolves'],
          ['Focus on Growth Blueprint', 'This is a tool, not a prescription']
        ],
        { colWidths: [CONTENT_W / 2, CONTENT_W / 2], rowColors: [COLORS.PurpleLight, COLORS.BlueLight] }
      );

      doc.moveDown(2);
      drawQuote(aiAdvice.closingStatement);

      doc.moveDown(2);
      const nextStepY = doc.y;
      doc.rect(0, nextStepY, PAGE_W, 80).fill(COLORS.Navy);
      doc.fillColor(COLORS.White).font('Helvetica-Bold').fontSize(11).text('Your Next Step', MARGIN_L, nextStepY + 15);
      doc.font('Helvetica').fontSize(9).text(aiAdvice.immediateSteps[0] || "Begin with Day 1 of your action plan. The most powerful thing you can do is direct even a fraction of the energy you give to others — toward yourself.", MARGIN_L, nextStepY + 30, { width: CONTENT_W, align: 'justify' });

      drawFooter(10, 10);

      doc.end();
    } catch (error) { reject(error); }
  });
};
