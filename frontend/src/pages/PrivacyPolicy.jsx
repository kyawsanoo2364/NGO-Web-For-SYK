import React from "react";
import { ModleView } from "../hoc";
import "../tiptap-tailwind.css";
import { usePrivacyStore } from "../store/PrivacyStore";
import parser from "html-react-parser";

const PrivacyPolicy = () => {
  const { privacyPolicy } = usePrivacyStore();
  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="mt-20">
        <div className=" font-sans leading-normal tracking-normal">
          {/* Header */}
          <header className="py-6">
            <div className="container mx-auto px-6">
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-6 py-10">
            <section className="bg-white rounded-lg shadow-lg p-8 ProseMirror">
              {privacyPolicy && parser(privacyPolicy.content)}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ModleView(PrivacyPolicy);
