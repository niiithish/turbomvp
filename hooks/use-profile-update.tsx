import { Info } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "../auth/auth-client";

type UseProfileUpdateProps<T> = {
  initialData: T;
  onUpdate?: (data: T) => void;
};

// biome-ignore lint/suspicious/noExplicitAny: Generic constraint requires any
export function useProfileUpdate<T extends Record<string, any>>({
  initialData,
  onUpdate,
}: UseProfileUpdateProps<T>) {
  const [data, setData] = useState<T>(initialData);
  const [savedData, setSavedData] = useState<T>(initialData);
  const dataRef = useRef(data);
  const [isDirty, setIsDirty] = useState(false);
  const toastIdRef = useRef<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Keep ref in sync for toast callbacks
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Cleanup toast on unmount
  useEffect(
    () => () => {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    },
    []
  );

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    const currentData = dataRef.current;

    // Optimistically dismiss toast
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }

    try {
      await authClient.updateUser(currentData);

      toast.success("Changes saved successfully");
      setSavedData(currentData);
      setIsDirty(false);
    } catch (_error) {
      toast.error("Failed to save changes");
      setIsDirty(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCancel = useCallback(() => {
    setData(savedData);
    onUpdate?.(savedData);
    setIsDirty(false);
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  }, [savedData, onUpdate]);

  const showUnsavedToast = useCallback(() => {
    if (toastIdRef.current) {
      return;
    }

    toastIdRef.current = toast.custom(
      (_t) => (
        <div className="mx-auto flex w-fit min-w-[350px] items-center justify-between gap-3 rounded-md border bg-background p-2 px-4 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
          <div className="flex items-center gap-3">
            <Info className="size-4 text-muted-foreground" />
            <p className="whitespace-nowrap font-medium text-foreground text-sm">
              Your changes haven&apos;t been saved
            </p>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Button
              className="h-8 px-3"
              onClick={() => handleCancel()}
              size="sm"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button className="h-8 px-3" onClick={() => handleSave()} size="sm">
              Save changes
            </Button>
          </div>
        </div>
      ),
      {
        duration: Number.POSITIVE_INFINITY,
      }
    );
  }, [handleCancel, handleSave]);

  // biome-ignore lint/suspicious/noExplicitAny: Dynamic value update
  const updateField = (field: keyof T, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate?.(newData);

    if (!isDirty) {
      setIsDirty(true);
      showUnsavedToast();
    }
  };

  // Watch for external dirty state reset
  useEffect(() => {
    if (!isDirty && toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  }, [isDirty]);

  return {
    data,
    setData,
    updateField,
    isLoading,
    isDirty,
  };
}
