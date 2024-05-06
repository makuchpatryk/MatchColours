export interface IUseSignSupabase {
  provider: "github" | "google";
  options: {
    redirectTo: string;
  };
}

export default function useSignSupabase({
  provider,
  options,
}: IUseSignSupabase) {
  const supabase = useSupabaseClient();
  const loading = ref(false);
  const error = ref<string>("");

  const onSubmit = async () => {
    try {
      loading.value = true;
      const { error: errorSupabase } = await supabase.auth.signInWithOAuth({
        provider,
        options,
      });
      if (errorSupabase) throw errorSupabase;
    } catch (errorSupabase) {
      if (errorSupabase instanceof Error) {
        error.value = errorSupabase.message;
      }
    } finally {
      loading.value = false;
    }
  };
  return { loading, error, onSubmit };
}
