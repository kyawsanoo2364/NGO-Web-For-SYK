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

export const handleCopyLink = (currentUrl) => {
  navigator.clipboard.writeText(currentUrl);
  toast.success("Copied Link!");
};

class SocialMedia {
  constructor(url, title) {
    this.url = url;
    this.title = title;
  }
  handleTwitterShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      this.title
    )}&url=${encodeURIComponent(this.url)}`;
    window.open(twitterShareUrl, "_blank", "noopener,noreferrer");
  };
  handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      this.url
    )}`;
    window.open(facebookShareUrl, "_blank", "noopener,noreferrer");
  };
  handleLinkedInShare = () => {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      this.url
    )}`;
    window.open(linkedInShareUrl, "_blank", "noopener,noreferrer");
  };
}

export const formatTime = (time = "") => {
  const timeString = time;
  const [hours, minutes] = timeString.split(":");

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  return formattedTime;
};

export { SocialMedia };

export const handlePromise = (promise) => {
  return promise.then((data) => [null, data]).catch((err) => [err, null]);
};
