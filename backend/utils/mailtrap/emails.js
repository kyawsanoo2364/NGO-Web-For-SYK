import {
  resetPasswordEmailTemplate,
  verificationEmailTemplate,
} from "./emailTemplate.js";
import { transporter } from "./mailer.js";
import { mailTrapClient } from "./mailtrap.js";

export const verificationEmail = async (
  sender = { name: "Show Your Kindness", email: "" },
  recipient,
  verifyCode
) => {
  try {
    await transporter.sendMail({
      from: {
        name: sender.name,
        address: sender.email,
      },
      to: recipient,
      subject: "Verify Your Email",
      html: verificationEmailTemplate.replace("{verifyCode}", verifyCode),
      category: "Email Verification",
    });
    // await mailTrapClient.send({
    //   from: sender,
    //   to: recipient,
    //   subject: "Verify Your Email",
    //   html: verificationEmailTemplate.replace("{verifyCode}", verifyCode),
    //   category: "Email Verification",
    // });
    console.log("Send verify email code");
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordEmail = async (
  sender = { name: "Show Your Kindness", email: "" },
  recipient,
  username,
  resetLink
) => {
  try {
    let formatEmailTemplate = resetPasswordEmailTemplate.replaceAll(
      "[Company Name]",
      "Show Your Kindness"
    );
    formatEmailTemplate = formatEmailTemplate.replaceAll("[User]", username);
    formatEmailTemplate = formatEmailTemplate
      .replaceAll("[RESET_LINK]", resetLink)
      .replace(
        "[CompanyLogo]",
        "https://cdn5.cdn-telegram.org/file/LLtKYXPnhadhzzPo_ERXO8XRhAu94NA82D5aGrFjTzRFDWGZ52RcOVQF1vjkacYq1L-vhqTP5nUEf2mbg0F2Fp4Fz1ZgVuUDqpZfDMI2A19aPkAuXpiwCdXZr7v_jru8G5SD6gs7GzXUgJywE5QVXDduBQjsuXA-nx7EKIS6pdN1fwmZqsvmAw4BYLg2ivwco-711gBeYun6P4XMOqpkYu9HibLz5FzTgZtQ42BBN0jZ3BTMcZR31UeYziJcpovGj4BJ4QSb2MEogZByF4joDjAuQtvI7Vm2RToRPuxZ3-ljAF2EMW8B8grK2Rutasugtn-QL3VK5zb7HMhmNUZuwQ.jpg"
      );

    await transporter.sendMail({
      from: {
        name: sender.name,
        address: sender.email,
      },
      to: recipient,
      subject: "Reset Password",
      html: formatEmailTemplate,
      category: "Reset Password",
    });

    console.log("Send reset link to email");
  } catch (error) {
    console.log(error);
  }
};
