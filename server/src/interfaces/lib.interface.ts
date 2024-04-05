export interface SendMailHandler {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}
