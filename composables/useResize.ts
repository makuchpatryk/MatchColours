export default function useResize(callback) {
  if (!callback) {
    throw new Error("A callback has to be provided.");
  }

  const listener = (event) => {
    if (typeof callback === "function") {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener("resize", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", listener);
  });
}
