import { toast } from "react-toastify";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
export const BACKEND_URL = "http://localhost:5000";

export const PasswordChecker = {
  isValid: (password) => {
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[!@#$%^&*(),.?":{}|<>]/;
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{6,}$/;
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    } else if (!upper.test(password)) {
      toast.error("At least contains 1 uppercase character");
      return false;
    } else if (!lower.test(password)) {
      toast.error("At least contains 1 lowercase character");
      return false;
    } else if (!number.test(password)) {
      toast.error("At least contains 1 number");
      return false;
    } else if (!special.test(password)) {
      toast.error("At least contains 1 special character");
      return false;
    } else if (!regex.test(password)) {
      toast.error("Please strong your password. This is too weak!");
      return false;
    }
    return true;
  },
};

export const ContactUs = {
  sendEmail: async (templateParams) => {
    try {
      const res = await emailjs.send(
        "service_7m0pkub",
        "template_mwcb4qj",
        templateParams,
        {
          publicKey: "-ERodhFnTV0vVbpVh",
        }
      );
      if (res) {
        toast.success(
          "We've received your message and as soon as possible replie to you."
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
