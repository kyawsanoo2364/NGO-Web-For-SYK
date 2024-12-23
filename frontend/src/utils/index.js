import { toast } from "react-toastify";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { languages } from "../Languages.json";

import axios from "axios";

export const getDomain = () => {
  const { protocol, hostname, port } = window.location;

  const domain = port
    ? `${protocol}//${hostname}:${port}`
    : `${protocol}//${hostname}`;

  return domain;
};

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

export const detectedLanguage = () => {
  try {
    if (JSON.parse(localStorage.getItem("language")) === "Myanmar") {
      return languages.my;
    } else {
      return languages.en;
    }
  } catch (error) {
    console.log(error);
  }
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const pushNotifacation = (icon, title, url, body) => {
  Notification.requestPermission()
    .then((perm) => {
      if (perm === "granted") {
        if ("serviceWorker" in navigator) {
          send({ icon, title, body, url }).catch((err) => console.log(err));
        }
      }
    })
    .catch((err) => console.log(err));
};

const webPushPublicKey =
  "BKNDxOqsBMQR48bFqu7tb74cCdiJKXB7co2hQY_nt0Qswhmlqiszb-lj83Ph_uz28DBwTsI6qpfo85E1cxg8oKQ";

async function send(payload) {
  try {
    const applicationServerKey = urlBase64ToUint8Array(webPushPublicKey);

    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.ready;
    console.log("Service Worker registered:", register);

    // Ensure Service Worker is active
    if (!register.active) {
      console.log("Waiting for Service Worker to activate...");
      await new Promise((resolve) =>
        register.addEventListener("statechange", () => {
          if (register.active) {
            resolve();
          }
        })
      );
      console.log("Service Worker is now active");
    }
    console.log("Registered worker...");
    console.log("Registering push....");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    });
    console.log("Registered push....");
    console.log("Sending Notification.....");
    await axios.post(
      `${BACKEND_URL}/api/subscribe`,
      {
        subscription: subscription,
        payload: payload,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Notification sent...");
  } catch (error) {
    throw error;
  }
}
