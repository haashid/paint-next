"use client";

import React, { useState } from "react";
import { CheckCircle2, RotateCcw, Send, Sparkles } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  propertyType: string;
  timeline: string;
  details: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  serviceType?: string;
  details?: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  serviceType: "Interior Painting",
  propertyType: "Single Family Home",
  timeline: "Within 1-2 months",
  details: "",
};

export default function QuoteSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.serviceType) {
      errs.serviceType = "Please select a service type.";
    }

    if (!formData.details.trim() || formData.details.trim().length < 10) {
      errs.details =
        "Please provide at least a brief sentence about your rooms or surfaces (min 10 characters).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="quote"
      className="relative w-full bg-[#20231F] text-[#FAF8F5] py-28 sm:py-36 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Editorial Narrative */}
          <Reveal delay={0} direction="left" className="lg:col-span-5">
            <SectionHeading
              label="CONSULTATION & ESTIMATES"
              title={
                <>
                  Let&apos;s Bring
                  <br />
                  Your Vision to Life.
                </>
              }
              subtitle="Tell us a little about your project. We'll help you take the next step with an architectural consultation and meticulous finish plan."
              theme="dark"
            />

            <div className="mt-10 space-y-6 text-sm text-[#D8D1C5] font-light">
              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[#28302A] border border-[#C65F43]/40 flex items-center justify-center text-[#C65F43] shrink-0 font-mono text-xs">
                  01
                </span>
                <div>
                  <h4 className="font-medium text-white text-sm mb-1">
                    On-Site Surface Assessment
                  </h4>
                  <p className="text-xs text-[#A49A8B] leading-relaxed">
                    We examine substrate integrity, lighting angles, and trim details to recommend proper coatings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[#28302A] border border-[#C65F43]/40 flex items-center justify-center text-[#C65F43] shrink-0 font-mono text-xs">
                  02
                </span>
                <div>
                  <h4 className="font-medium text-white text-sm mb-1">
                    Transparent Scope of Work
                  </h4>
                  <p className="text-xs text-[#A49A8B] leading-relaxed">
                    Clear breakdown of prep protocols, coatings, sheen schedules, and dust containment procedures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[#28302A] border border-[#C65F43]/40 flex items-center justify-center text-[#C65F43] shrink-0 font-mono text-xs">
                  03
                </span>
                <div>
                  <h4 className="font-medium text-white text-sm mb-1">
                    Color Consultation & Sampling
                  </h4>
                  <p className="text-xs text-[#A49A8B] leading-relaxed">
                    Large-format architectural swatch testing under your room’s actual morning and evening light.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[#28302A] border border-white/10 rounded-sm">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C65F43] block mb-1">
                Studio Note
              </span>
              <p className="text-xs text-[#D8D1C5] leading-relaxed">
                This form demonstrates local client-side validation. No data is stored externally or sent to third parties.
              </p>
            </div>
          </Reveal>

          {/* Right Form Card */}
          <Reveal delay={150} direction="right" className="lg:col-span-7">
            <div className="bg-[#28302A] border border-white/10 rounded-sm p-8 sm:p-12 shadow-2xl">
              {isSubmitted ? (
                /* Polished Local Success State */
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#C65F43]/20 border border-[#C65F43] text-[#C65F43] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#C65F43]">
                      Inquiry Verified Locally
                    </span>
                    <h3 className="font-serif text-3xl text-white font-normal">
                      Thank You, {formData.fullName.split(" ")[0]}
                    </h3>
                    <p className="text-sm text-[#D8D1C5] max-w-md mx-auto leading-relaxed">
                      Your project details for{" "}
                      <strong className="text-white font-medium">
                        {formData.serviceType}
                      </strong>{" "}
                      have been validated client-side for demonstration purposes.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#20231F] p-6 rounded-xs text-left border border-white/10 max-w-md mx-auto text-xs space-y-2">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-[#A49A8B]">Contact:</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-[#A49A8B]">Property:</span>
                      <span className="text-white">{formData.propertyType}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-[#A49A8B]">Target Timing:</span>
                      <span className="text-white">{formData.timeline}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-[#A49A8B] block mb-1">
                        Project Scope:
                      </span>
                      <p className="text-white italic line-clamp-3">
                        &ldquo;{formData.details}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#FAF8F5] hover:text-[#C65F43] bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-xs border border-white/20 transition-all cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      <span>Submit Another Demonstration Request</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Quote Request Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="full-name"
                        className="block text-xs font-medium uppercase tracking-wider text-[#D8D1C5] mb-2"
                      >
                        Full Name <span className="text-[#C65F43]">*</span>
                      </label>
                      <input
                        id="full-name"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Julian Hayes"
                        className={`w-full bg-[#20231F] border rounded-xs px-4 py-3 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C65F43] transition-colors ${
                          errors.fullName
                            ? "border-[#C65F43]"
                            : "border-white/15 hover:border-white/30"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-[#C65F43]">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email-address"
                        className="block text-xs font-medium uppercase tracking-wider text-[#D8D1C5] mb-2"
                      >
                        Email Address <span className="text-[#C65F43]">*</span>
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        inputMode="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="julian@example.com"
                        className={`w-full bg-[#20231F] border rounded-xs px-4 py-3 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C65F43] transition-colors ${
                          errors.email
                            ? "border-[#C65F43]"
                            : "border-white/15 hover:border-white/30"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-[#C65F43]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone (Optional) */}
                    <div>
                      <label
                        htmlFor="phone-number"
                        className="block text-xs font-medium uppercase tracking-wider text-[#D8D1C5] mb-2"
                      >
                        Phone Number{" "}
                        <span className="text-white/40 text-[10px] lowercase">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="phone-number"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full bg-[#20231F] border border-white/15 hover:border-white/30 rounded-xs px-4 py-3 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C65F43] transition-colors"
                      />
                    </div>

                    {/* Service Type */}
                    <div>
                      <label
                        htmlFor="service-type"
                        className="block text-xs font-medium uppercase tracking-wider text-[#D8D1C5] mb-2"
                      >
                        Service Required <span className="text-[#C65F43]">*</span>
                      </label>
                      <select
                        id="service-type"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full bg-[#20231F] border border-white/15 hover:border-white/30 rounded-xs px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#C65F43] transition-colors cursor-pointer"
                      >
                        <option value="Interior Painting">
                          Interior Painting (Walls, Ceilings, Millwork)
                        </option>
                        <option value="Exterior Painting">
                          Exterior Painting (Stucco, Siding, Trim)
                        </option>
                        <option value="Commercial Painting">
                          Commercial Painting (Offices, Retail, Studios)
                        </option>
                        <option value="Full House Transformation">
                          Full House Transformation (Interior & Exterior)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Property Type */}
                    <div>
                      <label
                        htmlFor="property-type"
                        className="block text-xs font-medium uppercase tracking-wider text-[#D8D1C5] mb-2"
                      >
                        Property Type
                      </label>
                      <select
                        id="property-type"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full bg-[#20231F] border border-white/15 hover:border-white/30 rounded-xs px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#C65F43] transition-colors cursor-pointer"
                      >
                        <option value="Single Family Home">
                          Single Family Home
                        </option>
                        <option value="Contemporary Villa / Residence">
                          Contemporary Villa / Residence
                        </option>
                        <option value="Townhome / Loft">Townhome / Loft</option>
                        <option value="Commercial Office / Creative Space">
                          Commercial Office / Creative Space
                        </option>
                      </select>
                    </div>

                    {/* Desired Timeline */}
                    <div>
                      <label
                        htmlFor="timeline"
                        className="block text-xs font-medium uppercase tracking-wider text-[#D8D1C5] mb-2"
                      >
                        Target Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full bg-[#20231F] border border-white/15 hover:border-white/30 rounded-xs px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#C65F43] transition-colors cursor-pointer"
                      >
                        <option value="Immediate (Within 2-3 weeks)">
                          Immediate (Within 2-3 weeks)
                        </option>
                        <option value="Within 1-2 months">Within 1-2 months</option>
                        <option value="Planning ahead (3+ months)">
                          Planning ahead (3+ months)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="project-details"
                      className="block text-xs font-medium uppercase tracking-wider text-[#D8D1C5] mb-2"
                    >
                      Project Details & Scope{" "}
                      <span className="text-[#C65F43]">*</span>
                    </label>
                    <textarea
                      id="project-details"
                      name="details"
                      rows={4}
                      required
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Describe the rooms, current surface conditions, preferred colors or sheens, and approximate dimensions..."
                      className={`w-full bg-[#20231F] border rounded-xs px-4 py-3 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C65F43] transition-colors ${
                        errors.details
                          ? "border-[#C65F43]"
                          : "border-white/15 hover:border-white/30"
                      }`}
                    />
                    {errors.details && (
                      <p className="mt-1.5 text-xs text-[#C65F43]">
                        {errors.details}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-[#A49A8B]">
                      Strict confidentiality · No automated spam calls
                    </p>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      showArrow
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Validating Scope..." : "Submit Quote Request"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
