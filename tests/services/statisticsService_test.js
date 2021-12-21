import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as statisticsService from "../../services/statisticsService.js"

//ignore duplicate
//test requires that the user with most answers has id 1
Deno.test("SQL statement works", async () => {
    assertEquals((await statisticsService.mostAnswers())[0].user_id, 1)
})

Deno.test("SQL statement works", async () => {
    assertEquals((await statisticsService.mostAnswers())[0].user_id, 1)
})