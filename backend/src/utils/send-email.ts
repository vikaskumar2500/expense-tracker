import nodeMailer from 'nodemailer';

export const sendEmailViaSMTP = async (email: string, otp: number) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: "vikas.nits8084@gmail.com",
      pass: process.env.NODEMAILER_PASS,
    },
  })

  try {
    const res = await transporter.sendMail(
      {
        from: "vikas.nits8084@gmail.com",
        to: email,
        subject: 'no-reply',
        text: `Your verification code: ${otp} for expense tracker app`,

      }
    );
    return {
      status: 200,
      body: res,
    }
  } catch (e) {
    return {
      status: 500,
      error: e.message,
    }
  }
}

