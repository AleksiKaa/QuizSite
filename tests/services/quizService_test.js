import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as quizService from "../../services/quizService.js"

const isANumber = () => {
    const number = quizService.getRandomInt(100000)

    return number === Number(number)
}

Deno.test("getRandomInt returns a number", () => {
    assertEquals(isANumber(), true);
})