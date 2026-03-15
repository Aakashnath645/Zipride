import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LogoIcon } from '@/components/icons';
import { useUserStore } from '@/stores/userStore';

/* ------------------------------------------------------------------ */
/*  Zod Schemas                                                        */
/* ------------------------------------------------------------------ */

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be under 50 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
});

type SignUpForm = z.infer<typeof signUpSchema>;

/* ------------------------------------------------------------------ */
/*  OTP Input Component                                                */
/* ------------------------------------------------------------------ */

function OtpInputGroup({
  onComplete,
}: {
  onComplete: (otp: string) => void;
}) {
  const [values, setValues] = useState<string[]>(['', '', '', '']);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    refs[0].current?.focus();
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...values];
    next[index] = value;
    setValues(next);

    if (value && index < 3) {
      refs[index + 1].current?.focus();
    }

    if (next.every((v) => v !== '')) {
      onComplete(next.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasted.length === 0) return;

    const next = [...values];
    for (let i = 0; i < 4; i++) {
      next[i] = pasted[i] || '';
    }
    setValues(next);

    const focusIndex = Math.min(pasted.length, 3);
    refs[focusIndex].current?.focus();

    if (next.every((v) => v !== '')) {
      onComplete(next.join(''));
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {values.map((val, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          aria-label={`OTP digit ${i + 1}`}
          placeholder="-"
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          className="h-14 w-14 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-center text-2xl font-semibold text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shimmer Loader                                                     */
/* ------------------------------------------------------------------ */

function ShimmerLoader() {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div
        className="h-10 w-48 rounded-lg"
        style={{
          background:
            'linear-gradient(90deg, var(--surface-raised) 25%, var(--border) 50%, var(--surface-raised) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
        }}
      />
      <p className="text-sm text-[var(--text-muted)]">Verifying OTP...</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Login Tab                                                          */
/* ------------------------------------------------------------------ */

function LoginTab() {
  const navigate = useNavigate();
  const login = useUserStore((s) => s.login);

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendOtp = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Enter a valid 10-digit mobile number');
      return;
    }
    setPhoneError('');
    setOtpSent(true);
    setResendTimer(30);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
  };

  const handleOtpComplete = useCallback(
    (_otp: string) => {
      setVerifying(true);
      setTimeout(() => {
        login({
          phone: `+91-${phone}`,
        });
        navigate('/app/home', { replace: true });
      }, 1800);
    },
    [login, navigate, phone]
  );

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait">
        {!otpSent ? (
          <motion.div
            key="phone-entry"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Phone Number
            </label>
            <div className="flex items-center gap-2">
              <div className="flex h-10 items-center rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 text-sm font-medium text-[var(--text-secondary)]">
                +91
              </div>
              <Input
                type="tel"
                inputMode="numeric"
                placeholder="Enter 10-digit number"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ''));
                  if (phoneError) setPhoneError('');
                }}
                className="flex-1"
              />
            </div>
            {phoneError && (
              <p className="text-xs text-[var(--error)]">{phoneError}</p>
            )}
            <Button onClick={handleSendOtp} className="w-full">
              Send OTP
            </Button>
          </motion.div>
        ) : verifying ? (
          <motion.div
            key="verifying"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <ShimmerLoader />
          </motion.div>
        ) : (
          <motion.div
            key="otp-entry"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <p className="text-center text-sm text-[var(--text-secondary)]">
              Enter the 4-digit code sent to{' '}
              <span className="font-semibold text-[var(--text-primary)]">
                +91-{phone}
              </span>
            </p>

            <OtpInputGroup onComplete={handleOtpComplete} />

            <div className="flex justify-center">
              {resendTimer > 0 ? (
                <p className="text-xs text-[var(--text-muted)]">
                  Resend OTP in{' '}
                  <span className="font-semibold text-[var(--text-primary)]">
                    {resendTimer}s
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-xs font-medium text-[var(--accent)] hover:underline py-2 px-3"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setVerifying(false);
              }}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:underline py-2 px-3"
            >
              Change phone number
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sign Up Tab                                                        */
/* ------------------------------------------------------------------ */

function SignUpTab() {
  const navigate = useNavigate();
  const login = useUserStore((s) => s.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    // Simulate a brief network call
    await new Promise((resolve) => setTimeout(resolve, 600));
    login({
      name: data.name,
      email: data.email,
      phone: `+91-${data.phone}`,
    });
    navigate('/app/home', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          Full Name
        </label>
        <Input
          placeholder="Aakash Kumar"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-[var(--error)]">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          Email
        </label>
        <Input
          type="email"
          placeholder="you@example.com"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-[var(--error)]">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          Phone Number
        </label>
        <div className="flex items-center gap-2">
          <div className="flex h-10 items-center rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 text-sm font-medium text-[var(--text-secondary)]">
            +91
          </div>
          <Input
            type="tel"
            inputMode="numeric"
            placeholder="9876543210"
            maxLength={10}
            className="flex-1"
            {...register('phone')}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-[var(--error)]">{errors.phone.message}</p>
        )}
      </div>

      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Login Page                                                         */
/* ------------------------------------------------------------------ */

function Login() {
  return (
    <div className="flex h-full w-full flex-col bg-[var(--background)]">
      <div className="flex flex-1 flex-col items-center overflow-y-auto px-6 py-8">
        {/* Logo header */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <LogoIcon size={48} color="var(--primary)" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Welcome to ZipRide
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Sign in to start riding
          </p>
        </div>

        {/* Tabs */}
        <div className="w-full max-w-sm">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <LoginTab />
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <SignUpTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer text */}
        <p className="mt-8 max-w-xs text-center text-xs leading-relaxed text-[var(--text-muted)]">
          By continuing, you agree to ZipRide&apos;s{' '}
          <Link to="/app/terms" className="text-[var(--accent)] hover:underline">Terms of Service</Link> and{' '}
          <Link to="/app/privacy" className="text-[var(--accent)] hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

export default Login;
