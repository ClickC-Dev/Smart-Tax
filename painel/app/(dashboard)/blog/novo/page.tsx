import { PageHeader } from '@/components/ui';
import { PostForm } from '../PostForm';

export default function NewPostPage() {
  return (
    <div>
      <PageHeader title="Novo artigo" />
      <PostForm />
    </div>
  );
}
