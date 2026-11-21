import { useEffect } from "react";
import { useRouter } from "next/router";

/** Redirect old /login path to the Centers sign-in page. */
export default function LoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/centers");
  }, [router]);
  return null;
}
