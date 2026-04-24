"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import type { BookingFormData, EventType } from "@/types/booking";

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  "intimate-dinner": "Intimate Dinner Party",
  "birthday-celebration": "Birthday Celebration",
  "corporate-event": "Corporate Event",
  wedding: "Wedding",
  "yacht-service": "Yacht Service",
  "weekly-meal-prep": "Weekly Meal Prep at Home",
  other: "Other",
};

const schema = z.object({
  firstName: z.string().min(2, "Please enter your first name"),
  lastName: z.string().min(2, "Please enter your last name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  eventType: z.enum([
    "intimate-dinner",
    "birthday-celebration",
    "corporate-event",
    "wedding",
    "yacht-service",
    "weekly-meal-prep",
    "other",
  ] as [EventType, ...EventType[]]),
  eventDate: z.string().min(1, "Please select a date"),
  guestCount: z.coerce.number().min(1, "Please enter the number of guests"),
  dietaryRequirements: z.string(),
  location: z.string().min(2, "Please enter your location / suburb"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
  });

  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  const onSubmit = async (data: FormData) => {
    if (!FORMSPREE_ID) {
      setError("Booking form is not configured yet. Please contact us directly.");
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `Private Chef Enquiry — ${data.firstName} ${data.lastName}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 text-olive-900 text-sm focus:outline-none focus:border-olive-500 transition-colors placeholder:text-olive-400";
  const errorClass = "text-red-500 text-xs mt-1";
  const labelClass = "block text-sm font-medium text-olive-700 mb-1.5";

  if (submitted) {
    return (
      <div className="bg-olive-100 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-olive-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-olive-900 mb-2">Request Received!</h3>
        <p className="text-olive-600">
          Thank you for your enquiry. Chef Michele will personally review your request and be in touch within 24 hours to discuss your event.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>First Name *</label>
          <input {...register("firstName")} className={inputClass} placeholder="Michele" />
          {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Last Name *</label>
          <input {...register("lastName")} className={inputClass} placeholder="Laiso" />
          {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Email Address *</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="you@example.com" />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Phone Number *</label>
          <input {...register("phone")} type="tel" className={inputClass} placeholder="04xx xxx xxx" />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Type of Event *</label>
        <select {...register("eventType")} className={inputClass}>
          <option value="">Select event type...</option>
          {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.eventType && <p className={errorClass}>{errors.eventType.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Preferred Date *</label>
          <input
            {...register("eventDate")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className={inputClass}
          />
          {errors.eventDate && <p className={errorClass}>{errors.eventDate.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Number of Guests *</label>
          <input {...register("guestCount")} type="number" min={1} className={inputClass} placeholder="8" />
          {errors.guestCount && <p className={errorClass}>{errors.guestCount.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Location / Suburb *</label>
        <input {...register("location")} className={inputClass} placeholder="e.g. Mosman, Sydney NSW" />
        {errors.location && <p className={errorClass}>{errors.location.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Dietary Requirements or Allergies</label>
        <input {...register("dietaryRequirements")} className={inputClass} placeholder="e.g. 2 guests are gluten-free, 1 vegan" />
      </div>

      <div>
        <label className={labelClass}>Additional Notes</label>
        <textarea
          {...register("additionalNotes")}
          rows={3}
          className={inputClass}
          placeholder="Tell Chef Michele about your occasion, preferences, or any specific requests..."
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isSubmitting}
      >
        Book a Free Discovery Call
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>

      <p className="text-center text-xs text-olive-400">
        No commitment required · Michele will contact you within 24 hours
      </p>
    </form>
  );
}
