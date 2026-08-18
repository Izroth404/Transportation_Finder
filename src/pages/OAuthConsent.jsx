import React from "react";
import AuthLayout from "@/components/AuthLayout";
import { ShieldCheck } from "lucide-react";

export default function OAuthConsent() {
  return (
    <AuthLayout icon={ShieldCheck} title="OAuth Consent">
      <p>This page is a placeholder for OAuth consent.</p>
    </AuthLayout>
  );
}
