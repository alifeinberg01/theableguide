"use client";

import { useState } from "react";
import { Plus, Trash2, Printer, GripVertical } from "lucide-react";
import Button from "@/components/ui/Button";
import type { ScheduleBlock } from "@/types";

const DEFAULT_COLORS = [
  "#1E3A5C", "#0891B2", "#C8603A", "#4A7C59",
  "#F59E0B", "#8B5CF6", "#EC4899", "#64748B",
];

const ICONS = ["🌅", "🥞", "✈️", "🚗", "🏰", "🎢", "🍔", "🌮", "🍦", "🎠", "🛌", "🛁", "📱", "📚", "🎉"];

function genId() {
  return Math.random().toString(36).slice(2);
}

export default function ScheduleBuilderClient() {
  const [title, setTitle] = useState("Our Disney World Day!");
  const [blocks, setBlocks] = useState<ScheduleBlock[]>([
    { id: genId(), time: "8:00 AM", activity: "Breakfast at the hotel", duration: 45, notes: "Bring headphones", color: "#0891B2", icon: "🥞" },
    { id: genId(), time: "9:00 AM", activity: "Arrive at Magic Kingdom", duration: 30, notes: "Rope drop!", color: "#C8603A", icon: "🏰" },
    { id: genId(), time: "9:30 AM", activity: "Seven Dwarfs Mine Train (DAS)", duration: 60, notes: "", color: "#4A7C59", icon: "🎢" },
  ]);

  const addBlock = () => {
    setBlocks((b) => [
      ...b,
      {
        id: genId(),
        time: "",
        activity: "",
        duration: 30,
        notes: "",
        color: DEFAULT_COLORS[b.length % DEFAULT_COLORS.length],
        icon: "🎉",
      },
    ]);
  };

  const updateBlock = (id: string, field: keyof ScheduleBlock, value: string | number) => {
    setBlocks((b) => b.map((bl) => (bl.id === id ? { ...bl, [field]: value } : bl)));
  };

  const removeBlock = (id: string) => {
    setBlocks((b) => b.filter((bl) => bl.id !== id));
  };

  const handlePrint = () => window.print();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Controls */}
      <div className="card-base p-6 mb-8 no-print">
        <h2 className="font-display font-semibold text-navy text-xl mb-4">Schedule Settings</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-navy mb-1.5">Schedule Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-navy/20 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </div>
          <div className="flex items-end gap-3">
            <Button onClick={addBlock} variant="secondary">
              <Plus className="w-4 h-4" /> Add Block
            </Button>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="w-4 h-4" /> Print
            </Button>
          </div>
        </div>
      </div>

      {/* Printable schedule */}
      <div className="card-base p-8" id="printable-schedule">
        <h1 className="font-display font-bold text-navy text-3xl mb-2 text-center">{title}</h1>
        <p className="text-center text-charcoal-muted text-sm mb-8">Made with The Able Guide · theableguide.com</p>

        <div className="space-y-4">
          {blocks.map((block, i) => (
            <div key={block.id} className="group relative">
              {/* Edit mode (no-print) */}
              <div className="no-print card-base p-4 border-l-4 flex gap-4 items-start" style={{ borderColor: block.color }}>
                <div className="text-2xl cursor-grab mt-1">{block.icon}</div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-charcoal-muted mb-1">Time</label>
                    <input
                      type="text"
                      placeholder="9:00 AM"
                      value={block.time}
                      onChange={(e) => updateBlock(block.id, "time", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-navy/15 text-sm focus:outline-none focus:ring-1 focus:ring-teal/40"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-charcoal-muted mb-1">Activity</label>
                    <input
                      type="text"
                      placeholder="Activity name"
                      value={block.activity}
                      onChange={(e) => updateBlock(block.id, "activity", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-navy/15 text-sm focus:outline-none focus:ring-1 focus:ring-teal/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal-muted mb-1">Duration (min)</label>
                    <input
                      type="number"
                      min={5}
                      step={5}
                      value={block.duration}
                      onChange={(e) => updateBlock(block.id, "duration", Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-navy/15 text-sm focus:outline-none focus:ring-1 focus:ring-teal/40"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs text-charcoal-muted mb-1">Notes (optional)</label>
                    <input
                      type="text"
                      placeholder="Any notes for this block..."
                      value={block.notes || ""}
                      onChange={(e) => updateBlock(block.id, "notes", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-navy/15 text-sm focus:outline-none focus:ring-1 focus:ring-teal/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal-muted mb-1">Color</label>
                    <div className="flex gap-1 flex-wrap">
                      {DEFAULT_COLORS.slice(0, 6).map((c) => (
                        <button
                          key={c}
                          onClick={() => updateBlock(block.id, "color", c)}
                          className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                          style={{ background: c, borderColor: block.color === c ? "#000" : "transparent" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeBlock(block.id)}
                  className="text-charcoal-muted hover:text-red-500 transition-colors mt-1 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Print view */}
              <div className="hidden print:flex items-center gap-4 p-4 rounded-2xl border-l-4" style={{ borderColor: block.color, background: `${block.color}10` }}>
                <div className="text-3xl">{block.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-navy">{block.time}</span>
                    <span className="font-display font-bold text-navy text-lg">{block.activity}</span>
                    <span className="text-sm text-charcoal-muted">({block.duration} min)</span>
                  </div>
                  {block.notes && <p className="text-sm text-charcoal-muted mt-0.5">{block.notes}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {blocks.length === 0 && (
          <div className="text-center py-16 text-charcoal-muted">
            <p className="text-5xl mb-4">📅</p>
            <p className="text-lg">Add your first schedule block above.</p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="card-base p-6 mt-8 bg-teal/5 border border-teal/20">
        <h3 className="font-semibold text-teal-700 mb-3">Schedule Builder Tips</h3>
        <ul className="space-y-2 text-sm text-charcoal-muted">
          <li>→ Review the schedule with your child the night before using the printed copy.</li>
          <li>→ Laminate it so it survives the park day (sunscreen + water + excitement).</li>
          <li>→ Include sensory break blocks — they&apos;re not optional, they&apos;re strategy.</li>
          <li>→ Use color-coding your child already understands from home or school.</li>
          <li>→ Build in buffer time between activities — rushing is a sensory trigger.</li>
        </ul>
      </div>
    </div>
  );
}
