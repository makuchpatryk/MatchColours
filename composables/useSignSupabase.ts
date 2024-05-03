export interface IUseSignSupabase {
  provider: "github" | "google";
}

export default function useSignSupabase({ provider }: IUseSignSupabase) {
  const supabase = useSupabaseClient();
  const loading = ref(false);
  const error = ref<string>("");

  const onSubmit = async () => {
    try {
      loading.value = true;
      const { error: errorSupabase } = await supabase.auth.signInWithOAuth({
        provider,
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
