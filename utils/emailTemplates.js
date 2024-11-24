const getResetPasswordTemplate = (resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        /* Add custom styles here */
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.5;
          color: #1a202c;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          font-size: 14px;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Pravaah</div>
        </div>
        
        <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px;">
          Reset Your Password
        </h1>
        
        <p>
          You recently requested to reset your password for your Pravaah account. 
          Click the button below to reset it.
        </p>
        
        <a href="${resetUrl}" class="button">
          Reset Password
        </a>
        
        <p style="margin-top: 24px;">
          If you did not request a password reset, please ignore this email or contact support if you have concerns.
        </p>
        
        <p>
          This password reset link is only valid for the next 60 minutes.
        </p>
        
        <div class="footer">
          <p>
            Pravaah - Smart India Hackathon 2024<br>
            This is an automated email, please do not reply.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  getResetPasswordTemplate
};
