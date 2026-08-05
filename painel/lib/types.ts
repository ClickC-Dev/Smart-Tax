export type Department = 'admin' | 'conteudo' | 'marketing' | 'analytics' | 'sem_departamento';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  department: Department;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  status: 'draft' | 'published';
  author_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Setting {
  key: string;
  value: { id?: string } & Record<string, unknown>;
  updated_by: string | null;
  updated_at: string;
}

export const DEPARTMENT_LABELS: Record<Department, string> = {
  admin: 'Administrador',
  conteudo: 'Conteúdo',
  marketing: 'Marketing',
  analytics: 'Analytics',
  sem_departamento: 'Sem departamento',
};
