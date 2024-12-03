const getResetPasswordTemplate = (resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        /* Railway Theme Styles */
        body {
          background-color: #f0f4f8;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #1e3a8a; /* Railway Blue */
        }
        .button {
          display: inline-block;
          padding: 14px 28px;
          background-color: #1e3a8a; /* Railway Blue */
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #3b82f6; /* Railway Hover Blue */
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          font-size: 14px;
          color: #6b7280;
          text-align: center;
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
