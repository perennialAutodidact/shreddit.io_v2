import { isNote } from "ts/musicTheory";
const teoria = require("teoria")

describe("isNote()", ()=>{
    it("should be false if the value is not a string", ()=>{
        const note = teoria.note("c4")

        expect(isNote(note)).toBe(false)
    })

    it("should be false if the note string is too short", ()=>{
        const note = "c";

        expect(isNote(note)).toBe(false)
    })

    it("should be false if the note string is note of type Note", ()=>{
        let note = "c##5";
        expect(isNote(note)).toBe(false)
    
        note = "c#"
        expect(isNote(note)).toBe(false)
    })

    it("should be true if the note is valid", ()=>{
        let note = "c#4";
        expect(isNote(note)).toBe(true)

        note = "gx5"
        expect(isNote(note)).toBe(true)

    })
})