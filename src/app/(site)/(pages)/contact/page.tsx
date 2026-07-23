import React from "react";
import Contact from "@/components/Contact";
import { siteConfig } from "@/lib/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description: siteConfig.description,
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
