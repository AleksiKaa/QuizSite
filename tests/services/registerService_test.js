import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as registerService from "../../services/registerService.js"

//ignore the duplicate test
//tests require a user with email test@test.fi
Deno.test("Returns true when email = test@test.fi", async () => {
  assertEquals(await registerService.emailExists('test@test.fi'), true)
})

Deno.test("Returns true when email = test@test.fi", async () => {
  assertEquals(await registerService.emailExists('test@test.fi'), true)
})

Deno.test("Returns false when email = 123", async () => {
  assertEquals(await registerService.emailExists('123'), false)
})