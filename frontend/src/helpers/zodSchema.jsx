import { z } from "zod";

// Noe hjelp fra ChatGPT med å sette opp et schema som passet overens med skjemafeltene mine. Også lagt til min en bokstav, og en melding. Var usikker på hvordan løse det med boolean verdi og radioknappene.
export const projectSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  tech: z
    .array(z.string())
    .min(1, { message: "At least one technology is required" }),
  status: z.enum(["draft", "published"], {
    required_error: "Status is required",
  }),
  public: z.boolean().optional(),
});
