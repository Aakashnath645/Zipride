import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  LogOut,
  Save,
  Bell,
  MapPin,
  Moon,
  Shield,
  FileText,
  ChevronRight,
  Crown,
} from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/toast';
import { useUserStore } from '@/stores/userStore';
import { useBookingStore } from '@/stores/bookingStore';
import { useRideStore } from '@/stores/rideStore';
import { useWalletStore } from '@/stores/walletStore';
import { useTheme } from '@/hooks/useTheme';

interface ProfileFormValues {
  name: string;
  email: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
  return name.charAt(0).toUpperCase();
}

function Profile() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const logout = useUserStore((s) => s.logout);
  const resetBooking = useBookingStore((s) => s.resetBooking);

  const { isDark, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile({ name: data.name, email: data.email });
    toast.success('Profile updated successfully');
  };

  const handleLogout = () => {
    logout();
    resetBooking();
    useRideStore.getState().setCurrentRide(null);
    useWalletStore.setState({ balance: 250, transactions: [] });
    navigate('/login');
  };

  const memberSinceFormatted = format(new Date(user.memberSince), 'MMMM yyyy');
  const initials = getInitials(user.name);

  return (
    <PageTransition>
      <div className="h-full flex flex-col">
        <ScrollArea className="flex-1">
          <div className="mx-auto max-w-lg px-4 py-6 space-y-6 md:max-w-2xl">
            {/* Avatar and user info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              <Avatar className="h-24 w-24 text-2xl">
                <AvatarFallback className="bg-[var(--primary)] text-[var(--primary-text)] text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <h1 className="text-xl font-bold text-[var(--text-primary)]">{user.name}</h1>
                <p className="text-sm text-[var(--text-muted)]">{user.phone}</p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="warning" className="gap-1">
                  <Crown className="h-3 w-3" />
                  ZipRide Gold
                </Badge>
              </div>

              <p className="text-xs text-[var(--text-muted)]">
                Member since {memberSinceFormatted}
              </p>
            </motion.div>

            {/* Edit Profile Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                    Edit Profile
                  </h2>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[var(--text-muted)]">
                      Full Name
                    </label>
                    <Input
                      {...register('name', {
                        required: 'Name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' },
                      })}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="text-xs text-[var(--error)]">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[var(--text-muted)]">
                      Email
                    </label>
                    <Input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email',
                        },
                      })}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-xs text-[var(--error)]">{errors.email.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={!isDirty}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card>
                <div className="p-4 space-y-1">
                  <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                    Preferences
                  </h2>

                  {/* Notifications */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-raised)]">
                        <Bell className="h-4 w-4 text-[var(--text-secondary)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          Notifications
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          Ride updates and promotions
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>

                  <Separator />

                  {/* Location Access */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-raised)]">
                        <MapPin className="h-4 w-4 text-[var(--text-secondary)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          Location Access
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          Allow GPS for pickup detection
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={locationAccess}
                      onCheckedChange={setLocationAccess}
                    />
                  </div>

                  <Separator />

                  {/* Dark Mode */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-raised)]">
                        <Moon className="h-4 w-4 text-[var(--text-secondary)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          Dark Mode
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          Switch between light and dark theme
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* App info and links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card>
                <div className="p-4 space-y-1">
                  <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                    About
                  </h2>

                  {/* App Version */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-raised)]">
                        <Shield className="h-4 w-4 text-[var(--text-secondary)]" />
                      </div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        App Version
                      </p>
                    </div>
                    <span className="text-sm text-[var(--text-muted)]">v1.0.0</span>
                  </div>

                  <Separator />

                  {/* Terms of Service */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3 text-left transition-colors hover:bg-[var(--surface-raised)] rounded-md px-1 -mx-1"
                    onClick={() => navigate('/app/terms')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-raised)]">
                        <FileText className="h-4 w-4 text-[var(--text-secondary)]" />
                      </div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        Terms of Service
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[var(--text-muted)]" />
                  </button>

                  <Separator />

                  {/* Privacy Policy */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3 text-left transition-colors hover:bg-[var(--surface-raised)] rounded-md px-1 -mx-1"
                    onClick={() => navigate('/app/privacy')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-raised)]">
                        <Shield className="h-4 w-4 text-[var(--text-secondary)]" />
                      </div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        Privacy Policy
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[var(--text-muted)]" />
                  </button>
                </div>
              </Card>
            </motion.div>

            {/* Logout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="pb-6"
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be logged out of your ZipRide account. All local data will be cleared and you will need to sign in again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          </div>
        </ScrollArea>
      </div>
    </PageTransition>
  );
}

export default Profile;
