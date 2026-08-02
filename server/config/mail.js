const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"ATS Analyzer" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Password Reset OTP",
    html: `
      <div style="font-family:sans-serif;max-width:400px;margin:auto;padding:24px;border:1px solid #eee;border-radius:8px">
        <h2 style="color:#6366f1">ATS Analyzer</h2>
        <p>Your OTP for password reset:</p>
        <h1 style="letter-spacing:8px;color:#1e293b">${otp}</h1>
        <p style="color:#64748b">This OTP expires in <strong>10 minutes</strong>.</p>
        <p style="color:#64748b">If you did not request this, ignore this email.</p>
      </div>
    `,
  });
  console.log(`📧 OTP email sent to ${to}`);
};

module.exports = { sendOTPEmail };