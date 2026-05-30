import { AuthForm } from '@/components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <AuthForm mode="register" />
    </div>
  );
}
