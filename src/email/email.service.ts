import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service provider
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password',
      },
    });
  }

  async sendLowStockAlert(productName: string, quantity: number, threshold: number) {
    await this.transporter.sendMail({
      from: 'your-email@gmail.com',
      to: 'alert-recipient@example.com',
      subject: `Low Stock Alert: ${productName}`,
      text: `Product "${productName}" is low on stock.\nQuantity: ${quantity}\nThreshold: ${threshold}`,
    });
  }
}
