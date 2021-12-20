import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const startsWith = (path) => {
    const paths = ["/questions", "/quiz", "/statistics"]

    let i = 0
    while (i < 3) {
        if (path.startsWith(paths[i])) return true
        i++
    }
    return false
}

Deno.test("Returns true when path is one of the specified strings", () => {
    assertEquals(startsWith("/statistics"), true);
  });

  Deno.test("Returns false when path is not one of the specified strings", () => {
    assertEquals(startsWith("/auth/login"), false);
});