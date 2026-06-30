export type ChatbotCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
};

export type ChatbotSubcategory = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
};

export type ChatbotQuestion = {
  id: string;
  subcategory_id: string;
  question: string;
  answer: string;
  display_order: number;
};

export type ChatbotContactInfo = {
  id: string;
  label: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  display_order: number;
};
