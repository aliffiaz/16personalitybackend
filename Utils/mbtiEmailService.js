import nodemailer from 'nodemailer';

// Create a transporter using environment variables or fallback to a standard config
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'mail.finlytyx.com',
    port: 465,
    secure: 'true',
    auth: {
      user: process.env.EMAIL_USER || 'no-reply@openmcq.com',
      pass: process.env.EMAIL_PASS || 'U}EP^xT)[#H4d;D(',
    },
  });
};


/**
 * Helper to send email with exponential backoff retries.
 * @param {Object} mailOptions 
 * @param {Number} retries 
 */
const sendMailWithRetry = async (transporter, mailOptions, retries = 3) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully: ${info.messageId}`);
      return info;
    } catch (error) {
      attempt++;
      console.error(`Email attempt ${attempt} failed:`, error);
      if (attempt >= retries) throw error;
      // Exponential backoff: 1s, 2s, 4s...
      await new Promise(res => setTimeout(res, Math.pow(2, attempt - 1) * 1000));
    }
  }
};

/**
 * Sends the MBTI PDF Report via email.
 * 
 * @param {String} toEmail - Recipient email address
 * @param {Object} reportData - Object containing { mbtiType, typeName, userName, dimensions }
 * @param {Buffer} pdfBuffer - The generated PDF file as a buffer
 * @param {Boolean} isParent - Indicates if the email is for a parent
 */
export const sendMBTIReportEmail = async (toEmail, reportData, pdfBuffer, isParent = false) => {
  if (!toEmail) return;

  const transporter = createTransporter();
  const { mbtiType, typeName, userName, dimensions } = reportData;

  const subject = isParent
    ? `Psychometric & Career Report for ${userName}`
    : `Your personality type: ${typeName} (${mbtiType})`;

  // Trait Details Helper
  const getTraitDisplay = (dim) => {
    if (!dim) return { name: 'Unknown', percent: 50 };
    const name = dim.dominant === 'E' ? 'Extraverted' :
                 dim.dominant === 'I' ? 'Introverted' :
                 dim.dominant === 'N' ? 'Intuitive' :
                 dim.dominant === 'S' ? 'Observant' :
                 dim.dominant === 'T' ? 'Thinking' :
                 dim.dominant === 'F' ? 'Feeling' :
                 dim.dominant === 'J' ? 'Judging' :
                 dim.dominant === 'P' ? 'Prospecting' : 'Unknown';
    const percent = dim.dominant === 'I' || dim.dominant === 'N' || dim.dominant === 'T' || dim.dominant === 'J' 
                    ? dim.pole1Percent : dim.pole2Percent;
    return { name, percent };
  };

  const mind = getTraitDisplay(dimensions?.mind);
  const energy = getTraitDisplay(dimensions?.energy);
  const nature = getTraitDisplay(dimensions?.nature);
  const tactics = getTraitDisplay(dimensions?.tactics);
  // Identity is hardcoded to "Assertive - 50%" for now as requested
  const identity = { name: 'Assertive', percent: 50 };

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #33363b; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 40px 20px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 10px 0 0 0; color: #e0e7ff; font-size: 18px; }
        .content { padding: 40px; text-align: center; }
        h2 { font-size: 24px; color: #1e293b; margin-bottom: 20px; font-weight: 700; }
        p { color: #475569; font-size: 16px; margin-bottom: 24px; line-height: 1.8; }
        .result-box { background: #f8fafc; border-radius: 12px; padding: 28px; margin: 32px 0; text-align: left; border: 1px solid #e2e8f0; box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02); }
        .result-title { font-weight: 700; color: #4f46e5; margin-bottom: 16px; display: block; font-size: 15px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px; }
        .trait-list { width: 100%; border-collapse: collapse; margin: 0; padding: 0; }
        .trait-item { padding: 12px 0; border-bottom: 1px dashed #cbd5e1; font-size: 16px; vertical-align: middle; }
        .trait-name { font-weight: 600; color: #334155; }
        .trait-val { color: #ffffff; background-color: #4f46e5; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 14px; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2); }
        .highlight-box { background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin-top: 32px; border-radius: 0 12px 12px 0; text-align: left; }
        .highlight-box p { margin: 0; color: #065f46; font-size: 15px; }
        .footer { padding: 30px; background: #f1f5f9; text-align: center; font-size: 14px; color: #64748b; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Results Are In!</h1>
          <p>Discover your unique personality profile.</p>
        </div>
        <div class="content">
          <p>Hi <b>${userName || 'there'}</b>,</p>
          <p>Your Psychometric Analysis is complete. Based on your responses, your personality archetype is:</p>
          
          <h2>${typeName} (${mbtiType})</h2>
          
          <div class="result-box">
            <span class="result-title">Your Trait Breakdown</span>
            <table class="trait-list" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="trait-item"><span class="trait-name">${mind.name}</span></td>
                <td class="trait-item" align="right"><span class="trait-val">${mind.percent}%</span></td>
              </tr>
              <tr>
                <td class="trait-item"><span class="trait-name">${energy.name}</span></td>
                <td class="trait-item" align="right"><span class="trait-val">${energy.percent}%</span></td>
              </tr>
              <tr>
                <td class="trait-item"><span class="trait-name">${nature.name}</span></td>
                <td class="trait-item" align="right"><span class="trait-val">${nature.percent}%</span></td>
              </tr>
              <tr>
                <td class="trait-item"><span class="trait-name">${tactics.name}</span></td>
                <td class="trait-item" align="right"><span class="trait-val">${tactics.percent}%</span></td>
              </tr>
              <tr>
                <td class="trait-item" style="border-bottom: none; padding-bottom: 0;"><span class="trait-name">${identity.name}</span></td>
                <td class="trait-item" align="right" style="border-bottom: none; padding-bottom: 0;"><span class="trait-val">${identity.percent}%</span></td>
              </tr>
            </table>
          </div>
          
          <div class="highlight-box">
            <p>🎯 <b>Included in your email:</b> We have attached your comprehensive 10-page <b>Success Blueprint</b> PDF report. It contains your personalized career roadmaps, academic stream analysis, and strategic growth plans.</p>
          </div>
          
          <p style="margin-top: 32px;">Please download the attached PDF to explore your full career potential and relationship insights.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} OPEN16 Career Guidance. All rights reserved.<br>
          <small>Empowering students to find their true path.</small>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"OPEN16 MBTI Test Result" <${process.env.EMAIL_USER || 'no-reply@openmcq.com'}>`,
    to: toEmail,
    subject,
    text: `Hi ${userName},\n\nYour Psychometric Analysis is complete! You are an ${mbtiType} (${typeName}).\n\nTraits:\n- ${mind.name}: ${mind.percent}%\n- ${energy.name}: ${energy.percent}%\n- ${nature.name}: ${nature.percent}%\n- ${tactics.name}: ${tactics.percent}%\n- ${identity.name}: ${identity.percent}%\n\nWe've attached your full personalized "Success Blueprint" report.\n\nKeep exploring,\nOPENMCQ Team`,
    html: htmlBody,
    attachments: [
      {
        filename: `${userName || 'User'}_MBTI_Report.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  await sendMailWithRetry(transporter, mailOptions);
};
