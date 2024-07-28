import { createTransport, SendMailOptions, Transporter } from 'nodemailer';

export class Mailer {
  private static instance: Transporter;

  static getMailer(): Transporter {
    if (!this.instance) {
      this.instance = createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_KEY,
        }
      });
    }

    return this.instance;
  }

  static sendMessage(mailOptions: SendMailOptions): void {
    const instance = this.getMailer();
    const options = {
      ...mailOptions,
      from: 'tickerapp@gmail.com'
    };
    instance.sendMail(options, (error: Error | null, info: { response: string }) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
}
