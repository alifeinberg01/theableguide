"use client";

import { useState } from "react";
import { Printer, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

interface CardData {
  childName: string;
  dob: string;
  diagnosis: string;
  communication: string;
  calmsDown: string;
  makesWorse: string;
  medications: string;
  allergies: string;
  parent1Name: string;
  parent1Phone: string;
  parent2Name: string;
  parent2Phone: string;
  doctorName: string;
  doctorPhone: string;
}

const empty: CardData = {
  childName: "", dob: "", diagnosis: "", communication: "",
  calmsDown: "", makesWorse: "", medications: "", allergies: "",
  parent1Name: "", parent1Phone: "", parent2Name: "", parent2Phone: "",
  doctorName: "", doctorPhone: "",
};

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

function Field({ label, value, onChange, placeholder, multiline }: FieldProps) {
  const cls = "w-full px-3 py-2 rounded-lg border border-navy/20 text-sm text-charcoal placeholder-charcoal-muted focus:outline-none focus:ring-2 focus:ring-teal/30";
  return (
    <div>
      <label className="block text-xs font-semibold text-navy mb-1">{label}</label>
      {multiline ? (
        <textarea
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}

export default function EmergencyCardClient() {
  const [card, setCard] = useState<CardData>(empty);
  const set = (k: keyof CardData, v: string) => setCard((c) => ({ ...c, [k]: v }));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form */}
        <div className="space-y-6 no-print">
          <div className="card-base p-6">
            <h3 className="font-display font-semibold text-navy text-lg mb-4">Child Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Child's Full Name *" value={card.childName} onChange={(v) => set("childName", v)} placeholder="First Last" />
                <Field label="Date of Birth" value={card.dob} onChange={(v) => set("dob", v)} placeholder="MM/DD/YYYY" />
              </div>
              <Field label="Diagnosis / Condition" value={card.diagnosis} onChange={(v) => set("diagnosis", v)} placeholder="e.g. Autism Spectrum Disorder, Level 2" />
              <Field label="Communication Style" value={card.communication} onChange={(v) => set("communication", v)} placeholder="e.g. Minimally verbal, uses AAC device" multiline />
              <Field label="What Helps Them Calm Down" value={card.calmsDown} onChange={(v) => set("calmsDown", v)} placeholder="e.g. Quiet space, weighted blanket, familiar music" multiline />
              <Field label="What Makes Things Worse" value={card.makesWorse} onChange={(v) => set("makesWorse", v)} placeholder="e.g. Loud voices, touch from strangers, bright lights" multiline />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Medications" value={card.medications} onChange={(v) => set("medications", v)} placeholder="Name & dose or 'None'" />
                <Field label="Allergies" value={card.allergies} onChange={(v) => set("allergies", v)} placeholder="e.g. Peanuts, penicillin" />
              </div>
            </div>
          </div>

          <div className="card-base p-6">
            <h3 className="font-display font-semibold text-navy text-lg mb-4">Emergency Contacts</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Parent/Guardian 1 Name" value={card.parent1Name} onChange={(v) => set("parent1Name", v)} placeholder="Name" />
                <Field label="Phone" value={card.parent1Phone} onChange={(v) => set("parent1Phone", v)} placeholder="(555) 555-5555" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Parent/Guardian 2 Name" value={card.parent2Name} onChange={(v) => set("parent2Name", v)} placeholder="Name (optional)" />
                <Field label="Phone" value={card.parent2Phone} onChange={(v) => set("parent2Phone", v)} placeholder="(555) 555-5555" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Pediatrician / Doctor" value={card.doctorName} onChange={(v) => set("doctorName", v)} placeholder="Dr. Name" />
                <Field label="Doctor Phone" value={card.doctorPhone} onChange={(v) => set("doctorPhone", v)} placeholder="(555) 555-5555" />
              </div>
            </div>
          </div>

          <Button onClick={() => window.print()} className="w-full justify-center py-4 text-base" variant="primary">
            <Printer className="w-4 h-4" /> Print Emergency Card
          </Button>
        </div>

        {/* Card Preview */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-charcoal-muted uppercase tracking-wider no-print">Card Preview</p>

          {/* Front */}
          <div className="bg-navy text-white rounded-2xl p-6 shadow-card-hover aspect-[3.5/2] flex flex-col justify-between print:shadow-none">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-0.5">Emergency Information</p>
                <h2 className="font-display font-bold text-2xl">{card.childName || "Child's Name"}</h2>
                {card.dob && <p className="text-white/60 text-sm">DOB: {card.dob}</p>}
              </div>
              <div className="bg-terra rounded-xl p-2">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
            </div>

            {card.diagnosis && (
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-0.5">Diagnosis</p>
                <p className="text-sm font-medium">{card.diagnosis}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {card.communication && (
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-0.5">Communication</p>
                  <p className="text-xs">{card.communication}</p>
                </div>
              )}
              {card.allergies && (
                <div>
                  <p className="text-amber text-xs uppercase tracking-widest font-bold mb-0.5">⚠ Allergies</p>
                  <p className="text-xs">{card.allergies}</p>
                </div>
              )}
            </div>
          </div>

          {/* Back */}
          <div className="bg-white border-2 border-navy rounded-2xl p-6 shadow-card aspect-[3.5/2] flex flex-col justify-between print:shadow-none">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {card.calmsDown && (
                <div>
                  <p className="text-sage font-bold text-xs uppercase tracking-widest mb-0.5">✓ Helps</p>
                  <p className="text-xs text-charcoal">{card.calmsDown}</p>
                </div>
              )}
              {card.makesWorse && (
                <div>
                  <p className="text-terra font-bold text-xs uppercase tracking-widest mb-0.5">✗ Avoid</p>
                  <p className="text-xs text-charcoal">{card.makesWorse}</p>
                </div>
              )}
              {card.medications && (
                <div>
                  <p className="text-navy font-bold text-xs uppercase tracking-widest mb-0.5">Medications</p>
                  <p className="text-xs text-charcoal">{card.medications}</p>
                </div>
              )}
            </div>

            <div className="border-t border-navy/10 pt-3 grid grid-cols-2 gap-3">
              {card.parent1Name && (
                <div>
                  <p className="text-xs font-semibold text-navy">{card.parent1Name}</p>
                  <p className="text-xs text-charcoal-muted">{card.parent1Phone}</p>
                </div>
              )}
              {card.parent2Name && (
                <div>
                  <p className="text-xs font-semibold text-navy">{card.parent2Name}</p>
                  <p className="text-xs text-charcoal-muted">{card.parent2Phone}</p>
                </div>
              )}
              {card.doctorName && (
                <div>
                  <p className="text-xs font-semibold text-navy">{card.doctorName}</p>
                  <p className="text-xs text-charcoal-muted">{card.doctorPhone}</p>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-charcoal-muted text-center no-print">
            Print and cut to wallet size. Laminate for durability.
          </p>
        </div>
      </div>
    </div>
  );
}
