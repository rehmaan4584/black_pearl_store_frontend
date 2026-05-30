import { AuthForm } from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <AuthForm mode="login" />
    </div>
  );
}
