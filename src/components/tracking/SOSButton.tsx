import { useState } from 'react';
import { AlertTriangle, Share2, Phone } from 'lucide-react';
import { IconSOS } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from '@/components/ui/alert-dialog';
import toast from 'react-hot-toast';

export default function SOSButton() {
  const [open, setOpen] = useState(false);

  const handleShareLocation = () => {
    const coords = '22.5726, 88.3639';
    navigator.clipboard.writeText(coords);
    toast.success('Location copied to clipboard!');
    setOpen(false);
  };

  return (
    <>
      <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full shadow-lg" onClick={() => setOpen(true)}>
        <IconSOS size={20} />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[var(--error)]" />
              Emergency SOS
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you in an emergency? Choose an action below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start gap-3" onClick={handleShareLocation}>
              <Share2 className="h-4 w-4" />
              Share my location
            </Button>
            <Button variant="destructive" className="justify-start gap-3" asChild>
              <a href="tel:112">
                <Phone className="h-4 w-4" />
                Call 112 (Emergency)
              </a>
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
