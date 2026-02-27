export type Critique = {
  id: string;
  submission_id: string;
  reviewer_id: string;
  what_works: string;
  what_to_improve: string;
  next_focus: string;
  created_at: string;
  reviewer?: {
    username: string;
    avatar_url: string | null;
  } | null;
};
